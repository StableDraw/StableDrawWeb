using Microsoft.AspNetCore.Identity;

namespace CLI.Models;

public class ApplicationUser : IdentityUser
{
    public bool IsDesignAcces { get; set; }
    public SubscriptionInfo? SubscriptionInfo { get; set; }
    public GenerationInfo? GenerationInfo { get; set; }
}
