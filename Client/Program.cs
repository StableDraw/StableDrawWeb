using System.Net;
using Microsoft.AspNetCore.Identity.UI.Services;
using CLI.Services;
using CLI.Extensions;
using GreenPipes;
using MassTransit;
using StableDraw.Domain.Extensions;

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
#endregion

#region AppSettings
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
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

app.UseAuthentication();
app.UseIdentityServer();
app.UseAuthorization();

app.MapControllerRoute(name: "default", pattern: "{controller}/{action=Index}/{id?}");

app.MapRazorPages();

app.MapFallbackToFile("index.html");

app.Run();
#endregion