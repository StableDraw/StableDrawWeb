using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using CLI.Data;
using CLI.Models;

namespace CLI.Pages_AllImgs
{
    public class DeleteModel : PageModel
    {
        private readonly CLI.Data.ApplicationDbContext _context;

        public DeleteModel(CLI.Data.ApplicationDbContext context)
        {
            _context = context;
        }

        [BindProperty]
      public AllImgs AllImgs { get; set; } = default!;

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null || _context.AllImgs == null)
            {
                return NotFound();
            }

            var allimgs = await _context.AllImgs.FirstOrDefaultAsync(m => m.Id == id);

            if (allimgs == null)
            {
                return NotFound();
            }
            else 
            {
                AllImgs = allimgs;
            }
            return Page();
        }

        public async Task<IActionResult> OnPostAsync(int? id)
        {
            if (id == null || _context.AllImgs == null)
            {
                return NotFound();
            }
            var allimgs = await _context.AllImgs.FindAsync(id);

            if (allimgs != null)
            {
                AllImgs = allimgs;
                _context.AllImgs.Remove(AllImgs);
                await _context.SaveChangesAsync();
            }

            return RedirectToPage("./Index");
        }
    }
}
