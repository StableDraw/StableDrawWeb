using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using StableDraw.Core.Models;

namespace StableDraw.MinIOService.Data
{
    internal class MinIODbContext : DbContext
    {
        public DbSet<Image> Images { get; set; }
        public MinIODbContext(DbContextOptions<MinIODbContext> options) : base(options) 
        { 
            Database.EnsureCreated();
        }

    }
}
