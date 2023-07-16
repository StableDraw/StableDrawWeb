using System.Net;
using System.Security.Claims;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using CLI.Data;
using CLI.Extentions;
using CLI.Options;
using CLI.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<ConnectionOptions>(builder.Configuration.GetSection(ConnectionOptions.Context));
builder.Services.AddDatabases();

// Add services to the container.
// var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
// if (builder.Environment.IsDevelopment())
// {
//     builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlite(connectionString));
//     builder.Services.AddDbContext<SLN.Data.TaskContext>(options => options.UseSqlite(connectionString));
//     builder.Services.AddDbContext<SLN.Data.UserContext>(options => options.UseSqlite(connectionString));
// }
// else
// {
//     builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseNpgsql(connectionString));
//     builder.Services.AddDbContext<SLN.Data.TaskContext>(options => options.UseNpgsql(connectionString));
//     builder.Services.AddDbContext<SLN.Data.UserContext>(options => options.UseNpgsql(connectionString));
// }
// builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddDefaultIdentity<CLI.Models.ApplicationUser>(options => options.SignIn.RequireConfirmedAccount = true).AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.AddTransient<IEmailSender, EmailSender>();

builder.Services.AddIdentityServer().AddApiAuthorization<CLI.Models.ApplicationUser, ApplicationDbContext>();

builder.Services.AddAuthentication().AddGoogle(googleOptions =>
{
    googleOptions.ClientId = builder.Configuration["Authentication:Google:ClientId"];
    googleOptions.ClientSecret = builder.Configuration["Authentication:Google:ClientSecret"];
})
.AddOAuth("VK", "VKontakte", vkontakteOptions =>
{
    vkontakteOptions.ClientId = builder.Configuration["Authentication:VKontakte:ClientId"];
    vkontakteOptions.ClientSecret = builder.Configuration["Authentication:VKontakte:ClientSecret"];
    vkontakteOptions.ClaimsIssuer = "VKontakte";
    vkontakteOptions.CallbackPath = new PathString("/signin-vkontakte");
    vkontakteOptions.AuthorizationEndpoint = "https://oauth.vk.com/authorize";
    vkontakteOptions.TokenEndpoint = "https://oauth.vk.com/access_token";
    vkontakteOptions.Scope.Add("email");
    vkontakteOptions.ClaimActions.MapJsonKey(ClaimTypes.NameIdentifier, "user_id");
    vkontakteOptions.ClaimActions.MapJsonKey(ClaimTypes.Email, "email");
    vkontakteOptions.ClaimActions.MapJsonKey(ClaimTypes.GivenName, "first_name");
    vkontakteOptions.ClaimActions.MapJsonKey(ClaimTypes.Surname, "last_name");
    vkontakteOptions.SaveTokens = true;
    vkontakteOptions.Events = new OAuthEvents
    {
        OnCreatingTicket = context =>
        {
            context.RunClaimActions(context.TokenResponse.Response.RootElement);
            return Task.CompletedTask;
        },
        OnRemoteFailure = (RemoteFailureContext arg) =>
        {
            Console.WriteLine(arg);
            return Task.CompletedTask;
        }
    };
});

// Task OnFailure(RemoteFailureContext arg)
// {
//     Console.WriteLine(arg);
//     return Task.CompletedTask;
// }

builder.Services.AddAuthentication().AddIdentityServerJwt();

builder.Services.AddAuthorization();

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddControllersWithViews();

builder.Services.AddRazorPages();

builder.Services.Configure<IdentityOptions>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
    options.Password.RequiredLength = 6;
    options.Password.RequiredUniqueChars = 0;

    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
    options.Lockout.MaxFailedAccessAttempts = 5;
    options.Lockout.AllowedForNewUsers = true;

    options.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
    options.User.RequireUniqueEmail = true;

    options.SignIn.RequireConfirmedEmail = true;
});

builder.Services.Configure<DataProtectionTokenProviderOptions>(options => options.TokenLifespan = TimeSpan.FromHours(5));

builder.Services.AddHsts(options =>
{
    options.Preload = true;
    options.IncludeSubDomains = true;
    options.MaxAge = TimeSpan.FromDays(60);
    options.ExcludedHosts.Add("stabledraw.com");
    options.ExcludedHosts.Add("www.stabledraw.com");
});

builder.Services.AddHttpsRedirection(options =>
{
    options.RedirectStatusCode = (int)HttpStatusCode.TemporaryRedirect;
    options.HttpsPort = 443;
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
}
else
{
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