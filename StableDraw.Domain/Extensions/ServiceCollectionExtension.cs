using Microsoft.Extensions.DependencyInjection;
using StableDraw.Core.Models;
using StableDraw.Domain.Data;
using StableDraw.Domain.Data.Identity;
using StableDraw.Domain.Repositories;
using StableDraw.Domain.UnitsOfWork;


//using StableDraw.Domain.Repositories;

namespace StableDraw.Domain.Extensions;

public static class ServiceCollectionExtension
{
    public static IServiceCollection AddDatabases(this IServiceCollection services)
    {
        services.AddDbContext<ApplicationDbContext>();
        //services.AddScoped<IBaseRepository<Image>>(sp => sp.GetRequiredService<BaseRepository<Image>>());
        services.AddScoped<IImageRepository, ImageRepository>();
        services.AddScoped<IRepositoryWrapper, RepositoryWrapper>();

        services.AddScoped<IUnitOfWork, UnitOfWork>();

        //services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));
        //services.AddScoped<IApplicationRepository, ApplicationRepository>();
        services.AddDatabaseDeveloperPageExceptionFilter();
        
        return services;
    }
}

