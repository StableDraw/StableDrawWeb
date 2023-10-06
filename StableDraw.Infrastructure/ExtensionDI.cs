using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using StableDraw.Infrastructure.Common;
using StableDraw.Infrastructure.Data;
using StableDraw.Infrastructure.Identity;
using StableDraw.Infrastructure.Services;

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


        services.AddScoped<IIdentityService, IdentityService>();
        
        //services.AddScoped(typeof(IQueryRepository<>), typeof(QueryRepository<>));
        //services.AddTransient<ICustomerQueryRepository, CustomerQueryRepository>();
        //services.AddScoped(typeof(ICommandRepository<>), typeof(CommandRepository<>));
        //services.AddTransient<ICustomerCommandRepository, CustomerCommandRepository>();


        return services;
    }
}