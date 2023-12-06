using System.Net;
using Microsoft.AspNetCore.Identity.UI.Services;
using CLI.Services;
using CLI.Extensions;
using MassTransit;
using Microsoft.AspNetCore.Diagnostics;
using Newtonsoft.Json;
using StableDraw.Domain.Extensions;
using Microsoft.AspNetCore.Rewrite;

#region Builder
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDatabases();

builder.Services.AddApplicationUserIdentity();//extensions
builder.Services.AddTransient<IEmailSender, EmailSender>();

builder.Services.AddGoogleAuthentication(builder.Configuration);//extension

builder.Services.AddJwtAuthentication(builder.Environment.IsDevelopment());//extension
builder.Services.AddAuthorization();
builder.Services.ConfigureIdentityOptions();//extension

builder.Services.AddControllersWithViews();
builder.Services.AddControllers();
builder.Services.AddRazorPages();

//builder.Services.Configure<DataProtectionTokenProviderOptions>(options => options.TokenLifespan = TimeSpan.FromHours(5));

builder.Services.AddConfiguredHSTS();//extension
builder.Services.AddHttpsRedirection(options =>
{
    options.RedirectStatusCode = (int)HttpStatusCode.TemporaryRedirect;
    options.HttpsPort = 443;
});

// recaptcha
builder.Services.AddGoogleRecaptcha(builder.Configuration);//extension
builder.Configuration.AddJsonFile("neural.json");
// rabbitMQ
builder.Services.AddMassTransit(cfg =>
{
    cfg.SetKebabCaseEndpointNameFormatter();
    cfg.AddDelayedMessageScheduler();
    cfg.UsingRabbitMq((brc, rbfc) =>
    {
        rbfc.UseInMemoryOutbox();
        rbfc.UseMessageRetry(r =>
        {
            r.Incremental(3, TimeSpan.FromSeconds(1), TimeSpan.FromSeconds(1));
        });
        rbfc.UseDelayedMessageScheduler();
        rbfc.Host("localhost", h =>
        {
            h.Username("rmuser");
            h.Password("rmpassword");
        });
        rbfc.ConfigureEndpoints(brc);
    });
});

// payment
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddHttpClientServices();

builder.Services.AddProblemDetails();

#endregion

#region AppSettings
var app = builder.Build();
//app.UseExceptionHandler();
// Configure the HTTP request pipeline.

var option = new RewriteOptions().AddRedirectToWwwPermanent();

app.UseRewriter(option);

app.UseExceptionHandler(applicationBuilder =>
{
    applicationBuilder.Run(async context =>
    {
        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
        context.Response.ContentType = "application/json";

        var exception = context.Features.Get<IExceptionHandlerFeature>();
        if (exception != null)
        {
            var error = new
            {
                Stacktrace = exception.Error.StackTrace,
                Message = exception.Error.Message
            };
            var errObj = JsonConvert.SerializeObject(error);
            await context.Response.WriteAsync(errObj).ConfigureAwait(false);
        }
    });
});



if (app.Environment.IsDevelopment())
{
    //app.UseDeveloperExceptionPage();
    app.UseMigrationsEndPoint();
    
}
else
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

//app.UseMiddleware<GlobalExceptionMiddleware>();

app.UseAuthentication();
app.UseIdentityServer();
app.UseAuthorization();

app.MapControllerRoute(name: "default", pattern: "{controller}/{action=Index}/{id?}");

app.MapRazorPages();

app.MapFallbackToFile("index.html");

app.Run();
#endregion