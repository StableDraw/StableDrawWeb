using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using CLI.Data;
using CLI.Models;

namespace CLI.Pages_AllCaptions
{
    public class DeleteModel : PageModel
    {
        private readonly CLI.Data.ApplicationDbContext _context;

        public DeleteModel(CLI.Data.ApplicationDbContext context)
        {
            _context = context;
        }

        [BindProperty]
      public AllCaptions AllCaptions { get; set; } = default!;

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null || _context.AllCaptions == null)
            {
                return NotFound();
            }

            var allcaptions = await _context.AllCaptions.FirstOrDefaultAsync(m => m.Id == id);

            if (allcaptions == null)
            {
                return NotFound();
            }
            else 
            {
                AllCaptions = allcaptions;
            }
            return Page();
        }

        public async Task<IActionResult> OnPostAsync(int? id)
        {
            if (id == null || _context.AllCaptions == null)
            {
                return NotFound();
            }
            var allcaptions = await _context.AllCaptions.FindAsync(id);

            if (allcaptions != null)
            {
                AllCaptions = allcaptions;
                _context.AllCaptions.Remove(AllCaptions);
                await _context.SaveChangesAsync();
            }

            return RedirectToPage("./Index");
        }
    }
}
