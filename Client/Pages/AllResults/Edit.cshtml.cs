using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using CLI.Data;
using CLI.Models;

namespace CLI.Pages_AllResults
{
    public class EditModel : PageModel
    {
        private readonly CLI.Data.ApplicationDbContext _context;

        public EditModel(CLI.Data.ApplicationDbContext context)
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

            var allresults =  await _context.AllResults.FirstOrDefaultAsync(m => m.Id == id);
            if (allresults == null)
            {
                return NotFound();
            }
            AllResults = allresults;
            return Page();
        }

        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see https://aka.ms/RazorPagesCRUD.
        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            _context.Attach(AllResults).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AllResultsExists(AllResults.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return RedirectToPage("./Index");
        }

        private bool AllResultsExists(int id)
        {
          return (_context.AllResults?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
