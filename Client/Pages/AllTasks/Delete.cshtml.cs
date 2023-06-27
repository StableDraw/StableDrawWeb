using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using CLI.Data;
using CLI.Models;

namespace CLI.Pages_AllTasks
{
    public class DeleteModel : PageModel
    {
        private readonly CLI.Data.ApplicationDbContext _context;

        public DeleteModel(CLI.Data.ApplicationDbContext context)
        {
            _context = context;
        }

        [BindProperty]
      public AllTasks AllTasks { get; set; } = default!;

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null || _context.AllTasks == null)
            {
                return NotFound();
            }

            var alltasks = await _context.AllTasks.FirstOrDefaultAsync(m => m.Id == id);

            if (alltasks == null)
            {
                return NotFound();
            }
            else 
            {
                AllTasks = alltasks;
            }
            return Page();
        }

        public async Task<IActionResult> OnPostAsync(int? id)
        {
            if (id == null || _context.AllTasks == null)
            {
                return NotFound();
            }
            var alltasks = await _context.AllTasks.FindAsync(id);

            if (alltasks != null)
            {
                AllTasks = alltasks;
                _context.AllTasks.Remove(AllTasks);
                await _context.SaveChangesAsync();
            }

            return RedirectToPage("./Index");
        }
    }
}
