using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using CLI.Data;
using CLI.Models;

namespace CLI.Pages_UserStatus
{
    public class DeleteModel : PageModel
    {
        private readonly CLI.Data.ApplicationDbContext _context;

        public DeleteModel(CLI.Data.ApplicationDbContext context)
        {
            _context = context;
        }

        [BindProperty]
      public UserStatus UserStatus { get; set; } = default!;

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null || _context.UserStatus == null)
            {
                return NotFound();
            }

            var userstatus = await _context.UserStatus.FirstOrDefaultAsync(m => m.Id == id);

            if (userstatus == null)
            {
                return NotFound();
            }
            else 
            {
                UserStatus = userstatus;
            }
            return Page();
        }

        public async Task<IActionResult> OnPostAsync(int? id)
        {
            if (id == null || _context.UserStatus == null)
            {
                return NotFound();
            }
            var userstatus = await _context.UserStatus.FindAsync(id);

            if (userstatus != null)
            {
                UserStatus = userstatus;
                _context.UserStatus.Remove(UserStatus);
                await _context.SaveChangesAsync();
            }

            return RedirectToPage("./Index");
        }
    }
}
