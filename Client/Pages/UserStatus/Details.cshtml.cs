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
    public class DetailsModel : PageModel
    {
        private readonly CLI.Data.ApplicationDbContext _context;

        public DetailsModel(CLI.Data.ApplicationDbContext context)
        {
            _context = context;
        }

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
    }
}
