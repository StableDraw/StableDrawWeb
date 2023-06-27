using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using CLI.Data;
using CLI.Models;

namespace CLI.Pages_UserTasks
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
        ViewData["UserStatusId"] = new SelectList(_context.UserStatus, "Id", "Id");
            return Page();
        }

        [BindProperty]
        public UserTasks UserTasks { get; set; } = default!;
        

        // To protect from overposting attacks, see https://aka.ms/RazorPagesCRUD
        public async Task<IActionResult> OnPostAsync()
        {
          if (!ModelState.IsValid || _context.UserTasks == null || UserTasks == null)
            {
                return Page();
            }

            _context.UserTasks.Add(UserTasks);
            await _context.SaveChangesAsync();

            return RedirectToPage("./Index");
        }
    }
}
