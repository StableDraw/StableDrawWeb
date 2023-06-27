using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using CLI.Data;
using CLI.Models;

namespace CLI.Pages_ResultCaptions
{
    public class DeleteModel : PageModel
    {
        private readonly CLI.Data.ApplicationDbContext _context;

        public DeleteModel(CLI.Data.ApplicationDbContext context)
        {
            _context = context;
        }

        [BindProperty]
      public ResultCaptions ResultCaptions { get; set; } = default!;

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null || _context.ResultCaptions == null)
            {
                return NotFound();
            }

            var resultcaptions = await _context.ResultCaptions.FirstOrDefaultAsync(m => m.Id == id);

            if (resultcaptions == null)
            {
                return NotFound();
            }
            else 
            {
                ResultCaptions = resultcaptions;
            }
            return Page();
        }

        public async Task<IActionResult> OnPostAsync(int? id)
        {
            if (id == null || _context.ResultCaptions == null)
            {
                return NotFound();
            }
            var resultcaptions = await _context.ResultCaptions.FindAsync(id);

            if (resultcaptions != null)
            {
                ResultCaptions = resultcaptions;
                _context.ResultCaptions.Remove(ResultCaptions);
                await _context.SaveChangesAsync();
            }

            return RedirectToPage("./Index");
        }
    }
}
