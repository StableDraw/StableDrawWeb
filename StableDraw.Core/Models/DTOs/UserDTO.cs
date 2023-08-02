namespace StableDraw.Core.Models.DTOs;

public class User : BaseObject
{
    public bool IsDesignAcces { get; set; }
    public SubscriptionInfo? SubscriptionInfo { get; set; }
    public GenerationInfo? GenerationInfo { get; set; }
}