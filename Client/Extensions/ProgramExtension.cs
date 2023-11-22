using CLI.Services;
using CLI.Settings;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.AspNetCore.Identity;
using StableDraw.Core.Models;
using StableDraw.Domain.Data.Identity;
using StableDraw.Domain.Repositories;

using System.Security.Claims;


namespace CLI.Extensions;

public static class ProgramExtensions
{
    public static void AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<PaymentSettings>(configuration);
    }

    public static void AddHttpClientServices(this IServiceCollection services)
    {
        services.AddHttpClient<IPaymentService, YookassaService>(client =>
        {
            client.DefaultRequestHeaders.Add("key", "value");
        });
        services.AddScoped<IPaymentRepository, FakePaymentRepository>();
    }

    public static void AddGoogleAuthentication(this IServiceCollection services, IConfiguration configuration)
    {
        Action<GoogleOptions> configureOptions = option =>
        {
            option.ClientId = configuration["Authentication:Google:ClientId"];
            option.ClientSecret = configuration["Authentication:Google:ClientSecret"];
        };

        Action<OAuthOptions> configureVKOptions = option =>
        {
            option.ClientId = configuration["Authentication:VKontakte:ClientId"];
            option.ClientSecret = configuration["Authentication:VKontakte:ClientSecret"];
            option.ClaimsIssuer = "VKontakte";
            option.CallbackPath = new PathString("/signin-vkontakte");
            option.AuthorizationEndpoint = "https://oauth.vk.com/authorize";
            option.TokenEndpoint = "https://oauth.vk.com/access_token";
            option.Scope.Add("email");
            option.ClaimActions.MapJsonKey(ClaimTypes.NameIdentifier, "user_id");
            option.ClaimActions.MapJsonKey(ClaimTypes.Email, "email");
            option.ClaimActions.MapJsonKey(ClaimTypes.GivenName, "first_name");
            option.ClaimActions.MapJsonKey(ClaimTypes.Surname, "last_name");
            option.SaveTokens = true;
            option.Events = new OAuthEvents
            {
                OnCreatingTicket = context =>
                {
                    context.RunClaimActions(context.TokenResponse.Response.RootElement);
                    return Task.CompletedTask;
                },
                OnRemoteFailure = arg =>
                {
                    Console.WriteLine(arg);
                    return Task.CompletedTask;
                }
            };
        };

        services.AddAuthentication().AddGoogle(configureOptions).
            AddOAuth("VK", "VKontakte", configureVKOptions);
    }

    public static void ConfigureIdentityOptions(this IServiceCollection services)
    {
        services.Configure<IdentityOptions>(option =>
        {
            option.Password.RequireDigit = true;
            option.Password.RequireLowercase = false;
            option.Password.RequireNonAlphanumeric = false;
            option.Password.RequireUppercase = false;
            option.Password.RequiredLength = 6;
            option.Password.RequiredUniqueChars = 0;

            option.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
            option.Lockout.MaxFailedAccessAttempts = 5;
            option.Lockout.AllowedForNewUsers = true;

            option.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
            option.User.RequireUniqueEmail = true;

            option.SignIn.RequireConfirmedEmail = true;
        });
    }

    public static void AddGoogleRecaptcha(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<GoogleRecaptchaSettings>(configuration.GetSection("GoogleRecaptcha"));
        services.AddTransient<GoogleRecaptchaService>();
    }

    public static void AddApplicationUserIdentity(this IServiceCollection services)
    {
        services.AddDefaultIdentity<ApplicationUser>(options => options.SignIn.RequireConfirmedAccount = true)
            .AddEntityFrameworkStores<ApplicationDbContext>();
        services.AddIdentityServer().AddApiAuthorization<ApplicationUser, ApplicationDbContext>();
        services.AddScoped<UserManager<ApplicationUser>>();
    }

    public static void AddConfiguredHSTS(this IServiceCollection services)
    {
        services.AddHsts(options =>
        {
            options.Preload = true;
            options.IncludeSubDomains = true;
            options.MaxAge = TimeSpan.FromDays(60);
            options.ExcludedHosts.Add("stabledraw.com");
            options.ExcludedHosts.Add("www.stabledraw.com");
        });
    }

    public static void AddJwtAuthentication(this IServiceCollection services, bool isDevelopment)
    {
        services.AddAuthentication().AddIdentityServerJwt();
        if(isDevelopment)
            services.Configure<JwtBearerOptions>(
                "IdentityServerJwtBearer", 
                o => o.Authority = "https://localhost:44404");
        else
            services.Configure<JwtBearerOptions>(
                "IdentityServerJwtBearer", 
                o => o.Authority = "https://www.stabledraw.com");
    }

    public static void AddTimerHostedService(this IServiceCollection services, bool isDevelopment)
    {
        if(!isDevelopment)
        {
            services.AddHostedService<TimerHostedUpdateDbService>();
        }
    }
}