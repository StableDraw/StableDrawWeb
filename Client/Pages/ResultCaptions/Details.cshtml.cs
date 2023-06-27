using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using CLI.Data;
using CLI.Models;

namespace CLI.Pages_ResultCaptions
{
    public class DetailsModel : PageModel
    {
        private readonly CLI.Data.ApplicationDbContext _context;

        public DetailsModel(CLI.Data.ApplicationDbContext context)
        {
            _context = context;
        }

      public ResultCaptions ResultCaptions { get; set; } = default!; 

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null || _context.ResultCaptions == null)
            {
                return NotFound();
            }

            var resultcaptions = await _context.ResultCaptions.FirstOrDefaultAsync(m => m.Id == id);
            if (resultcaptions == null)
            {
                return NotFound();
            }
            else 
            {
                ResultCaptions = resultcaptions;
            }
            return Page();
        }
    }
}
