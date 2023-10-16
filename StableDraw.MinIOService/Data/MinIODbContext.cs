using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations;
using StableDraw.Core.Models;

namespace StableDraw.MinIOService.Data
{
    public class MinIoDbContext : DbContext
    {
        
        public DbSet<Image> Images { get; set; }
        private readonly IConfiguration _configuration;
        public MinIoDbContext(DbContextOptions<MinIoDbContext> options, IConfiguration configuration) : base(options)
        {
            _configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite(_configuration.GetConnectionString("DefaultConnection"), o => o.MigrationsHistoryTable(
                tableName: HistoryRepository.DefaultTableName,
                schema: "AppUser"));
        }
    }

    // public class YourDbContextFactory : IDesignTimeDbContextFactory<MinIODbContext>
    // {
    //     public MinIODbContext CreateDbContext(string[] args)
    //     {
    //         string projectPath = AppDomain.CurrentDomain.BaseDirectory;
    //         IConfigurationRoot configuration = new ConfigurationBuilder()
    //             .SetBasePath(projectPath)
    //             .AddJsonFile("appsettings.json")
    //             .Build();
    //         string connectionString = configuration.GetConnectionString("DefaultConnection");
    //
    //         var optionsBuilder = new DbContextOptionsBuilder<MinIODbContext>();
    //         optionsBuilder.UseSqlite(connectionString);
    //
    //         return new MinIODbContext(optionsBuilder.Options);
    //     }
    // }
}
