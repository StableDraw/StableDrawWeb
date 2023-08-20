using Microsoft.AspNetCore.Identity;

namespace StableDraw.Core.Models;

public class ApplicationUser : IdentityUser
{
    public DateTime? SubscribeExpiration { get; set; }
    public CompanyEnum? Company { get; set; }
}

public enum CompanyEnum
{
    
}
