using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.Extensions.Configuration;
using StableDraw.Core.Models;

namespace StableDraw.Domain.Data.Task;

public class TaskContext : DbContext
{
    private readonly IConfiguration _configuration;
    

    public TaskContext(DbContextOptions<TaskContext> options, IConfiguration configuration) : base(options)
    {
        _configuration = configuration;
        // Database.EnsureDeleted();   
        // Database.EnsureCreated();
    }

    public DbSet<Core.Models.Task> Tasks { get; set; }
    public DbSet<Generation> Generations { get; set; }
    public DbSet<Result> Results { get; set; }
    public DbSet<ImageResult> ImageResults { get; set; }
    public DbSet<ParamsResult> ParamsResults { get; set; }
    public DbSet<CaptionResult> CaptionResults { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var provider = _configuration.GetValue("Provider", "");
        switch (provider)
        {
            case "InMemory":
                optionsBuilder.UseInMemoryDatabase(_configuration.GetConnectionString("InMemoryConnection"));
                break;
            case "Sqlite":
                optionsBuilder.UseSqlite(_configuration.GetConnectionString("SqliteConnection"),  o => o.MigrationsHistoryTable(
                    tableName: HistoryRepository.DefaultTableName,
                    schema: "Task"));
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
        // modelBuilder.Entity<Core.Models.Task>().Property(t => t.Id).HasColumnType("uuid");
        // modelBuilder.Entity<Core.Models.Task>().Property(t => t.UserId).HasColumnType("uuid");
        // modelBuilder.Entity<Core.Models.Task>().HasKey(t => t.Id);
        //
        // modelBuilder.Entity<Generation>().Property(t => t.Number).HasColumnType("integer").ValueGeneratedOnAdd();
        //modelBuilder.Entity<Generation>().Property(t => t.TaskId).HasColumnType("uuid");
        // modelBuilder.Entity<Generation>().HasKey(entity => new { entity.TaskId, entity.Number });
        //
        // modelBuilder.Entity<Result>().Property(t => t.GenerationId).HasColumnType("uuid");
        // modelBuilder.Entity<Result>().Property(t => t.Id).HasColumnType("uuid");
        // modelBuilder.Entity<Result>().HasKey(t => t.Id);

        //modelBuilder.Entity<Generation>().OwnsOne(x => x.TaskId);
    }
}