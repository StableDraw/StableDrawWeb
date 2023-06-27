using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using CLI.Data;
using CLI.Models;

namespace CLI.Pages_ResultImgs
{
    public class CreateModel : PageModel
    {
        private readonly CLI.Data.ApplicationDbContext _context;

        public CreateModel(CLI.Data.ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult OnGet()
        {
            return Page();
        }

        [BindProperty]
        public ResultImgs ResultImgs { get; set; } = default!;
        

        // To protect from overposting attacks, see https://aka.ms/RazorPagesCRUD
        public async Task<IActionResult> OnPostAsync()
        {
          if (!ModelState.IsValid || _context.ResultImgs == null || ResultImgs == null)
            {
                return Page();
            }

            _context.ResultImgs.Add(ResultImgs);
            await _context.SaveChangesAsync();

            return RedirectToPage("./Index");
        }
    }
}
