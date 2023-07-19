using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using CLI.Models;
using CLI.Options;

namespace CLI.Data;

public class UserContext : DbContext
{
    private readonly string _connectionString;
    private readonly string _providerName;

    public UserContext(IOptions<ConnectionOptions> configuration)
    {
        _connectionString = configuration.Value.ConnectionString;
        _providerName = configuration.Value.ProviderName;
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Subscriber> Subscribers { get; set; }
    public DbSet<GenerationFlow> GenerationFlows { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        switch (_providerName)
        {
            case "SQLLite":
                optionsBuilder.UseSqlite(_connectionString);
                break;

            case "PostgreSQL":
                optionsBuilder.UseNpgsql(_connectionString);
                break;

            default:
                throw new NotImplementedException();
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>().Property(t => t.Id).HasColumnType("uuid");
        modelBuilder.Entity<User>().HasKey(t => t.Id);

        modelBuilder.Entity<Subscriber>().Property(t => t.Expiration).HasColumnType("datetime2");
                
        modelBuilder.Entity<GenerationFlow>().Property(t => t.Date).HasColumnType("datetime2");
        modelBuilder.Entity<GenerationFlow>().Property(t => t.Flow).HasColumnType("integer");
        modelBuilder.Entity<GenerationFlow>().Property(t => t.UserId).HasColumnType("uuid");
        modelBuilder.Entity<GenerationFlow>().HasKey(t => new { t.UserId, t.Date });
    }
}