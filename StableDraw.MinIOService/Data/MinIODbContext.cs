using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using StableDraw.Core.Models;

namespace StableDraw.MinIOService.Data
{
    public class MinIODbContext : DbContext
    {
        public DbSet<Image> Images { get; set; }
        public MinIODbContext(DbContextOptions<MinIODbContext> options) : base(options) 
        {}
    }

    public class YourDbContextFactory : IDesignTimeDbContextFactory<MinIODbContext>
    {
        public MinIODbContext CreateDbContext(string[] args)
        {
            string projectPath = AppDomain.CurrentDomain.BaseDirectory;
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(projectPath)
                .AddJsonFile("appsettings.json")
                .Build();
            string connectionString = configuration.GetConnectionString("DefaultConnection");

            var optionsBuilder = new DbContextOptionsBuilder<MinIODbContext>();
            optionsBuilder.UseSqlite(connectionString);

            return new MinIODbContext(optionsBuilder.Options);
        }
    }
}
