using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using CLI.Data;
using CLI.Models;

namespace CLI.Pages_ResultParams
{
    public class DeleteModel : PageModel
    {
        private readonly CLI.Data.ApplicationDbContext _context;

        public DeleteModel(CLI.Data.ApplicationDbContext context)
        {
            _context = context;
        }

        [BindProperty]
      public ResultParams ResultParams { get; set; } = default!;

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null || _context.ResultParams == null)
            {
                return NotFound();
            }

            var resultparams = await _context.ResultParams.FirstOrDefaultAsync(m => m.ID == id);

            if (resultparams == null)
            {
                return NotFound();
            }
            else 
            {
                ResultParams = resultparams;
            }
            return Page();
        }

        public async Task<IActionResult> OnPostAsync(int? id)
        {
            if (id == null || _context.ResultParams == null)
            {
                return NotFound();
            }
            var resultparams = await _context.ResultParams.FindAsync(id);

            if (resultparams != null)
            {
                ResultParams = resultparams;
                _context.ResultParams.Remove(ResultParams);
                await _context.SaveChangesAsync();
            }

            return RedirectToPage("./Index");
        }
    }
}
