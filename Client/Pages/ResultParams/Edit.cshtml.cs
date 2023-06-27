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

namespace CLI.Pages_ResultParams
{
    public class EditModel : PageModel
    {
        private readonly CLI.Data.ApplicationDbContext _context;

        public EditModel(CLI.Data.ApplicationDbContext context)
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

            var resultparams =  await _context.ResultParams.FirstOrDefaultAsync(m => m.ID == id);
            if (resultparams == null)
            {
                return NotFound();
            }
            ResultParams = resultparams;
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

            _context.Attach(ResultParams).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ResultParamsExists(ResultParams.ID))
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

        private bool ResultParamsExists(int id)
        {
          return (_context.ResultParams?.Any(e => e.ID == id)).GetValueOrDefault();
        }
    }
}
