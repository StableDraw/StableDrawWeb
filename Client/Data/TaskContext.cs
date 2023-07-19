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
    public DbSet<ImageResult> ImageResults { get; set; }
    public DbSet<ParamsResult> ParamsResults { get; set; }
    public DbSet<CaptionResult> CaptionResults { get; set; }

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
        modelBuilder.Entity<Models.Task>().Property(t => t.Id).HasColumnType("uuid");
        modelBuilder.Entity<Models.Task>().Property(t => t.UserId).HasColumnType("uuid");
        modelBuilder.Entity<Models.Task>().HasKey(t => t.Id);

        modelBuilder.Entity<Generation>().Property(t => t.Number).HasColumnType("integer").ValueGeneratedOnAdd();
        modelBuilder.Entity<Generation>().Property(t => t.TaskId).HasColumnType("uuid");
        modelBuilder.Entity<Generation>().HasKey(entity => new { entity.TaskId, entity.Number });

        modelBuilder.Entity<Result>().Property(t => t.GenerationId).HasColumnType("uuid");
        modelBuilder.Entity<Result>().Property(t => t.Id).HasColumnType("uuid");
        modelBuilder.Entity<Result>().HasKey(t => t.Id);
    }
}