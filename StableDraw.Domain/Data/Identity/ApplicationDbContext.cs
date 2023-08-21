using System.Net.Mime;
using Duende.IdentityServer.EntityFramework.Extensions;
using Duende.IdentityServer.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using StableDraw.Core.Models;

namespace StableDraw.Domain.Data.Identity;

public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
{
    private readonly IConfiguration _configuration;
    private readonly IOptions<OperationalStoreOptions> _operationalStoreOptions;
    
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, 
        IOptions<OperationalStoreOptions> operationalStoreOptions, 
        IConfiguration configuration) 
        : base(options, operationalStoreOptions)
    {
        _configuration = configuration;
        _operationalStoreOptions = operationalStoreOptions;
        // Database.EnsureDeleted();
        // Database.EnsureCreated();                
    }
    
    public DbSet<Image> Images { get; set; }
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
                    schema: "AppUser"));
                break;
            case "PostgreSQL":
                optionsBuilder.UseNpgsql(_configuration.GetConnectionString("NpgsqlConnection"), o => o.MigrationsHistoryTable(
                    
                    tableName: HistoryRepository.DefaultTableName,
                    schema: "AppUser"));
                break;
            default:
                throw new Exception($"Unsupported provider: {provider}");
        }
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.ConfigurePersistedGrantContext(_operationalStoreOptions.Value);

        //builder.Entity<Image>().ToTable("Images");
        //builder.Entity<Image>()
    }
}
