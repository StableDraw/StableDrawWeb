using CLI.Data;
using CLI.Repositories;

namespace CLI.Extentions
{
    public static class ServiceCollectionExtention
    {
        public static IServiceCollection AddDatabases(this IServiceCollection services)
        {
            services.AddDbContext<ApplicationDbContext>();
            services.AddDbContext<TaskContext>();
            //services.AddDbContext<UserContext>();
            services.AddScoped<ITasksRepository, TasksRepository>();
            services.AddScoped<IUsersRepository, UsersRepository>();
            services.AddDatabaseDeveloperPageExceptionFilter();

            return services;
        }
    }    
}