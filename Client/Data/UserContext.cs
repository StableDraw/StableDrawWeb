using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using CLI.Models;

namespace CLI.Data;

public class UserContext : DbContext
{
    private readonly IConfiguration _configuration;

    public UserContext(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public DbSet<ApplicationUser> Users { get; set; }
    public DbSet<Subscriber> Subscribers { get; set; }
    public DbSet<GenerationFlow> GenerationFlows { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var provider = _configuration.GetValue("Provider", "");
        switch (provider)
        {
            case "InMemory":
                optionsBuilder.UseInMemoryDatabase(_configuration.GetConnectionString("InMemoryConnection"));
                break;
            case "Sqlite":
                optionsBuilder.UseSqlite(_configuration.GetConnectionString("SqliteConnection"));
                break;
            case "PostgreSQL":
                optionsBuilder.UseNpgsql(_configuration.GetConnectionString("NpgsqlConnection"));
                break;
            default:
                throw new Exception($"Unsupported provider: {provider}");
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ApplicationUser>().Property(t => t.Id).HasColumnType("uuid");
        modelBuilder.Entity<ApplicationUser>().HasKey(t => t.Id);

        modelBuilder.Entity<Subscriber>().Property(t => t.Expiration).HasColumnType("datetime2");
                
        modelBuilder.Entity<GenerationFlow>().Property(t => t.Date).HasColumnType("datetime2");
        modelBuilder.Entity<GenerationFlow>().Property(t => t.Flow).HasColumnType("integer");
        modelBuilder.Entity<GenerationFlow>().Property(t => t.UserId).HasColumnType("uuid");
        modelBuilder.Entity<GenerationFlow>().HasKey(t => new { t.UserId, t.Date });
    }
}