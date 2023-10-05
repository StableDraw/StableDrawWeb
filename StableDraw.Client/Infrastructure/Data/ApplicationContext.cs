using Infrastructure.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace Infrastructure.Data;

public class ApplicationContext: IdentityDbContext<ApplicationUser>
{
    private readonly IConfiguration _configuration;

    public ApplicationContext(DbContextOptions<ApplicationContext> option, IConfiguration configuration) : base(option)
    {
        _configuration = configuration;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite(_configuration.GetConnectionString("DefaultConnection"), o => o.MigrationsHistoryTable(
            tableName: HistoryRepository.DefaultTableName,
            schema: "AppUser"));
    }
}