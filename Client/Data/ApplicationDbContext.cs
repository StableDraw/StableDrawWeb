using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Duende.IdentityServer.EntityFramework.Options;
using CLI.Models;
using CLI.Options;

namespace CLI.Data;

public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
{
    private readonly string _connectionString;
    private readonly string _providerName;

    public ApplicationDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions, IOptions<ConnectionOptions> connectionOptions)
        : base(options, operationalStoreOptions)
    {
        _connectionString = connectionOptions.Value.ConnectionString;
        _providerName = connectionOptions.Value.ProviderName;
    }

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
                throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
        }
    }
}
