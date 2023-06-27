using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using CLI.Data;
using CLI.Models;

namespace CLI.Pages_UserStatus
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
        public UserStatus UserStatus { get; set; } = default!;
        

        // To protect from overposting attacks, see https://aka.ms/RazorPagesCRUD
        public async Task<IActionResult> OnPostAsync()
        {
          if (!ModelState.IsValid || _context.UserStatus == null || UserStatus == null)
            {
                return Page();
            }

            _context.UserStatus.Add(UserStatus);
            await _context.SaveChangesAsync();

            return RedirectToPage("./Index");
        }
    }
}
