using Microsoft.AspNetCore.Identity;

namespace StableDraw.Infrastructure.Identity;

public class ApplicationUser : IdentityUser
{
    public string? FullName { get; set; }
}