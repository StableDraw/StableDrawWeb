using Microsoft.Extensions.DependencyInjection;
using StableDraw.Domain.Data;
using StableDraw.Domain.Data.Identity;
using StableDraw.Domain.Data.Task;
using StableDraw.Domain.Data.User;
using StableDraw.Domain.Repositories;

//using StableDraw.Domain.Repositories;

namespace StableDraw.Domain.Extensions;

public static class ServiceCollectionExtention
{
    public static IServiceCollection AddDatabases(this IServiceCollection services)
    {
        services.AddDbContext<ApplicationDbContext>();
        services.AddDbContext<TaskContext>();
        services.AddDbContext<UserContext>();
        services.AddScoped<ITasksRepository, TasksRepository>();
        services.AddScoped<IUsersRepository, UsersRepository>();
        services.AddDatabaseDeveloperPageExceptionFilter();

        return services;
    }
}

