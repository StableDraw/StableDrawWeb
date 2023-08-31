using System.Net.Mime;
using Duende.IdentityServer.EntityFramework.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using StableDraw.Core.Models;

namespace StableDraw.Domain;

public class PaymentDbContext : DbContext
{
    private readonly IConfiguration _configuration;
    
    public PaymentDbContext(DbContextOptions<PaymentDbContext> options, 
        IConfiguration configuration) 
        : base(options)
    {
        _configuration = configuration;
    }
    
    public DbSet<UserPayment> UserPayments { get; set; }

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

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.Entity<UserPayment>().HasKey(x => new {x.UserId, x.PaymentId});
    }
}
