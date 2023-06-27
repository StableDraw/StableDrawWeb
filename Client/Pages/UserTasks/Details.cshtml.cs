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
    public class DetailsModel : PageModel
    {
        private readonly CLI.Data.ApplicationDbContext _context;

        public DetailsModel(CLI.Data.ApplicationDbContext context)
        {
            _context = context;
        }

      public UserTasks UserTasks { get; set; } = default!; 

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null || _context.UserTasks == null)
            {
                return NotFound();
            }

            var usertasks = await _context.UserTasks.FirstOrDefaultAsync(m => m.Id == id);
            if (usertasks == null)
            {
                return NotFound();
            }
            else 
            {
                UserTasks = usertasks;
            }
            return Page();
        }
    }
}
