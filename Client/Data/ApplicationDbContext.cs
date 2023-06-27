using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Duende.IdentityServer.EntityFramework.Options;
using CLI.Models;

namespace CLI.Data;

public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
{
    public ApplicationDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions)
        : base(options, operationalStoreOptions)
    {

    }
    public DbSet<CLI.Models.UserStatus> UserStatus { get; set; } = default!;
    public DbSet<CLI.Models.UserTasks> UserTasks { get; set; } = default!;
    public DbSet<CLI.Models.AllTasks> AllTasks { get; set; } = default!;
    public DbSet<CLI.Models.ResultCaptions> ResultCaptions { get; set; } = default!;
    public DbSet<CLI.Models.AllResults> AllResults { get; set; } = default!;
    public DbSet<CLI.Models.AllCaptions> AllCaptions { get; set; } = default!;
    public DbSet<CLI.Models.ResultImgs> ResultImgs { get; set; } = default!;
    public DbSet<CLI.Models.AllImgs> AllImgs { get; set; } = default!;
    public DbSet<CLI.Models.ResultParams> ResultParams { get; set; } = default!;
}
