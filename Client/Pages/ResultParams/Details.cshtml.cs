using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using CLI.Data;
using CLI.Models;

namespace CLI.Pages_ResultParams
{
    public class DetailsModel : PageModel
    {
        private readonly CLI.Data.ApplicationDbContext _context;

        public DetailsModel(CLI.Data.ApplicationDbContext context)
        {
            _context = context;
        }

      public ResultParams ResultParams { get; set; } = default!; 

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null || _context.ResultParams == null)
            {
                return NotFound();
            }

            var resultparams = await _context.ResultParams.FirstOrDefaultAsync(m => m.ID == id);
            if (resultparams == null)
            {
                return NotFound();
            }
            else 
            {
                ResultParams = resultparams;
            }
            return Page();
        }
    }
}
