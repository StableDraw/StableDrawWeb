using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using CLI.Models;
using CLI.Options;

namespace CLI.Data;

public class TaskContext : DbContext
{
    private readonly string _connectionString;
    private readonly string _providerName;

    public TaskContext(IOptions<ConnectionOptions> configuration)
    {
        _connectionString = configuration.Value.ConnectionString;
        _providerName = configuration.Value.ProviderName;
    }

    public DbSet<Models.Task> Tasks { get; set; }
    public DbSet<Generation> Generations { get; set; }
    public DbSet<Result> Results { get; set; }

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
        modelBuilder.Entity<Generation>().HasKey(entity => new { entity.TaskId, entity.Number });
    }
}