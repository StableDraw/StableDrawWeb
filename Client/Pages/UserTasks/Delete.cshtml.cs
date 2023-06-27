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
    public class DeleteModel : PageModel
    {
        private readonly CLI.Data.ApplicationDbContext _context;

        public DeleteModel(CLI.Data.ApplicationDbContext context)
        {
            _context = context;
        }

        [BindProperty]
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

        public async Task<IActionResult> OnPostAsync(int? id)
        {
            if (id == null || _context.UserTasks == null)
            {
                return NotFound();
            }
            var usertasks = await _context.UserTasks.FindAsync(id);

            if (usertasks != null)
            {
                UserTasks = usertasks;
                _context.UserTasks.Remove(UserTasks);
                await _context.SaveChangesAsync();
            }

            return RedirectToPage("./Index");
        }
    }
}
