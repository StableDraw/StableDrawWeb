using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using CLI.Data;
using CLI.Models;

namespace CLI.Pages_AllResults
{
    public class DeleteModel : PageModel
    {
        private readonly CLI.Data.ApplicationDbContext _context;

        public DeleteModel(CLI.Data.ApplicationDbContext context)
        {
            _context = context;
        }

        [BindProperty]
      public AllResults AllResults { get; set; } = default!;

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null || _context.AllResults == null)
            {
                return NotFound();
            }

            var allresults = await _context.AllResults.FirstOrDefaultAsync(m => m.Id == id);

            if (allresults == null)
            {
                return NotFound();
            }
            else 
            {
                AllResults = allresults;
            }
            return Page();
        }

        public async Task<IActionResult> OnPostAsync(int? id)
        {
            if (id == null || _context.AllResults == null)
            {
                return NotFound();
            }
            var allresults = await _context.AllResults.FindAsync(id);

            if (allresults != null)
            {
                AllResults = allresults;
                _context.AllResults.Remove(AllResults);
                await _context.SaveChangesAsync();
            }

            return RedirectToPage("./Index");
        }
    }
}
