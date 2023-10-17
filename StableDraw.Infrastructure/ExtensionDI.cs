using MassTransit;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using StableDraw.Application.Common.Abstractions;
using StableDraw.Application.Common.Interfaces;
using StableDraw.Infrastructure.Data;
using StableDraw.Infrastructure.Identity;
using StableDraw.Infrastructure.Mediator;
using StableDraw.Infrastructure.Services;
using StableDraw.Infrastructure.Settings;

namespace StableDraw.Infrastructure;

public static class ExtensionDi
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddDbContext<ApplicationContext>();
        services.AddIdentity<ApplicationUser, IdentityRole>()
            .AddEntityFrameworkStores<ApplicationContext>()
            .AddDefaultTokenProviders();

        services.Configure<IdentityOptions>(options =>
        {
            // Default Lockout settings.
            options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
            options.Lockout.MaxFailedAccessAttempts = 5;
            options.Lockout.AllowedForNewUsers = true;
            // Default Password settings.
            options.Password.RequireDigit = false;
            options.Password.RequireLowercase = true;
            options.Password.RequireNonAlphanumeric = false; // For special character
            options.Password.RequireUppercase = false;
            options.Password.RequiredLength = 6;
            options.Password.RequiredUniqueChars = 1;
            // Default SignIn settings.
            options.SignIn.RequireConfirmedEmail = false;
            options.SignIn.RequireConfirmedPhoneNumber = false;
            options.User.RequireUniqueEmail = true;
        });
        
        services.AddMassTransit(cfg =>
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
            
            cfg.AddMediator(x =>
            {
                x.ConfigureMediator((ctx, mcfg) =>
                {
                    mcfg.UseSendFilter(typeof(AuthorizationFilter<>), ctx);
                });
            });
        });
        
        services
            .AddSingleton<IActionContextAccessor, ActionContextAccessor>()
            .AddScoped<IUrlHelper>(x => x
                .GetRequiredService<IUrlHelperFactory>()
                .GetUrlHelper(x.GetRequiredService<IActionContextAccessor>().ActionContext));
        services.AddTransient<IEmailSender, EmailSender>();
        services.AddScoped<IIdentityService, IdentityService>();
        services.AddTransient<IRequestBus, MassTransitRequestBus>();
        services.AddScoped<IObjectStorageService, ObjectStorageService>();
        services.AddScoped<INeuralService, NeuralService>();
        
        // Add ReCaptchaService
        services.Configure<GoogleRecaptchaSettings>(configuration.GetSection("GoogleRecaptcha"));
        services.AddScoped<IGoogleRecaptchaService, GoogleRecaptchaService>();
        
        return services;
    }
}