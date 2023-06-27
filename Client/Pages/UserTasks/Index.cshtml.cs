using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using CLI.Data;
using CLI.Models;

namespace CLI.Pages_UserTasks
{
    public class IndexModel : PageModel
    {
        private readonly CLI.Data.ApplicationDbContext _context;

        public IndexModel(CLI.Data.ApplicationDbContext context)
        {
            _context = context;
        }

        public IList<UserTasks> UserTasks { get;set; } = default!;

        public async Task OnGetAsync()
        {
            if (_context.UserTasks != null)
            {
                UserTasks = await _context.UserTasks
                .Include(u => u.UserStatus).ToListAsync();
            }
        }
    }
}
