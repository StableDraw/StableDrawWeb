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

namespace CLI.Pages_AllTasks
{
    public class EditModel : PageModel
    {
        private readonly CLI.Data.ApplicationDbContext _context;

        public EditModel(CLI.Data.ApplicationDbContext context)
        {
            _context = context;
        }

        [BindProperty]
        public AllTasks AllTasks { get; set; } = default!;

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null || _context.AllTasks == null)
            {
                return NotFound();
            }

            var alltasks =  await _context.AllTasks.FirstOrDefaultAsync(m => m.Id == id);
            if (alltasks == null)
            {
                return NotFound();
            }
            AllTasks = alltasks;
           ViewData["AllResultsId"] = new SelectList(_context.Set<AllResults>(), "Id", "Id");
           ViewData["UserStatusId"] = new SelectList(_context.UserStatus, "Id", "Id");
           ViewData["UserTasksId"] = new SelectList(_context.UserTasks, "Id", "Id");
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

            _context.Attach(AllTasks).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AllTasksExists(AllTasks.Id))
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

        private bool AllTasksExists(int id)
        {
          return (_context.AllTasks?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
