using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using CLI.Data;
using CLI.Models;

namespace CLI.Pages_AllTasks
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
        ViewData["AllResultsId"] = new SelectList(_context.Set<AllResults>(), "Id", "Id");
        ViewData["UserStatusId"] = new SelectList(_context.UserStatus, "Id", "Id");
        ViewData["UserTasksId"] = new SelectList(_context.UserTasks, "Id", "Id");
            return Page();
        }

        [BindProperty]
        public AllTasks AllTasks { get; set; } = default!;
        

        // To protect from overposting attacks, see https://aka.ms/RazorPagesCRUD
        public async Task<IActionResult> OnPostAsync()
        {
          if (!ModelState.IsValid || _context.AllTasks == null || AllTasks == null)
            {
                return Page();
            }

            _context.AllTasks.Add(AllTasks);
            await _context.SaveChangesAsync();

            return RedirectToPage("./Index");
        }
    }
}
