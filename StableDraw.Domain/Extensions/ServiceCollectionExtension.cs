using Microsoft.Extensions.DependencyInjection;
using StableDraw.Domain.Data;
using StableDraw.Domain.Data.Identity;
using StableDraw.Domain.Repositories;


//using StableDraw.Domain.Repositories;

namespace StableDraw.Domain.Extensions;

public static class ServiceCollectionExtention
{
    public static IServiceCollection AddDatabases(this IServiceCollection services)
    {
        services.AddDbContext<ApplicationDbContext>();
        services.AddScoped<IApplicationRepository, ApplicationRepository>();
        services.AddDatabaseDeveloperPageExceptionFilter();
        
        return services;
    }
}

