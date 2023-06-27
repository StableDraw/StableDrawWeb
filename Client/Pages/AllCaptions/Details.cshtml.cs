using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using CLI.Data;
using CLI.Models;

namespace CLI.Pages_AllCaptions
{
    public class DetailsModel : PageModel
    {
        private readonly CLI.Data.ApplicationDbContext _context;

        public DetailsModel(CLI.Data.ApplicationDbContext context)
        {
            _context = context;
        }

      public AllCaptions AllCaptions { get; set; } = default!; 

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null || _context.AllCaptions == null)
            {
                return NotFound();
            }

            var allcaptions = await _context.AllCaptions.FirstOrDefaultAsync(m => m.Id == id);
            if (allcaptions == null)
            {
                return NotFound();
            }
            else 
            {
                AllCaptions = allcaptions;
            }
            return Page();
        }
    }
}
