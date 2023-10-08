using Microsoft.Extensions.DependencyInjection;
using StableDraw.Domain.Data.Identity;


//using StableDraw.Domain.Repositories;

namespace StableDraw.Domain.Extensions;

public static class ServiceCollectionExtension
{
    public static IServiceCollection AddDatabases(this IServiceCollection services)
    {
        services.AddDbContext<ApplicationDbContext>();
        services.AddDatabaseDeveloperPageExceptionFilter();
        
        return services;
    }
}

