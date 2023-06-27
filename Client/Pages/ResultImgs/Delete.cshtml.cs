using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using CLI.Data;
using CLI.Models;

namespace CLI.Pages_ResultImgs
{
    public class DeleteModel : PageModel
    {
        private readonly CLI.Data.ApplicationDbContext _context;

        public DeleteModel(CLI.Data.ApplicationDbContext context)
        {
            _context = context;
        }

        [BindProperty]
      public ResultImgs ResultImgs { get; set; } = default!;

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null || _context.ResultImgs == null)
            {
                return NotFound();
            }

            var resultimgs = await _context.ResultImgs.FirstOrDefaultAsync(m => m.Id == id);

            if (resultimgs == null)
            {
                return NotFound();
            }
            else 
            {
                ResultImgs = resultimgs;
            }
            return Page();
        }

        public async Task<IActionResult> OnPostAsync(int? id)
        {
            if (id == null || _context.ResultImgs == null)
            {
                return NotFound();
            }
            var resultimgs = await _context.ResultImgs.FindAsync(id);

            if (resultimgs != null)
            {
                ResultImgs = resultimgs;
                _context.ResultImgs.Remove(ResultImgs);
                await _context.SaveChangesAsync();
            }

            return RedirectToPage("./Index");
        }
    }
}
