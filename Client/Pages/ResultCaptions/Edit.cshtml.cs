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

namespace CLI.Pages_ResultCaptions
{
    public class EditModel : PageModel
    {
        private readonly CLI.Data.ApplicationDbContext _context;

        public EditModel(CLI.Data.ApplicationDbContext context)
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

            var resultcaptions =  await _context.ResultCaptions.FirstOrDefaultAsync(m => m.Id == id);
            if (resultcaptions == null)
            {
                return NotFound();
            }
            ResultCaptions = resultcaptions;
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

            _context.Attach(ResultCaptions).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ResultCaptionsExists(ResultCaptions.Id))
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

        private bool ResultCaptionsExists(int id)
        {
          return (_context.ResultCaptions?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
