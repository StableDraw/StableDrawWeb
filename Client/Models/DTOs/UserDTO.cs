namespace CLI.Models.DTOs;

public class User
{
    public string Id { get; set; }
    public bool IsDesignAcces { get; set; }
    public SubscriptionInfo? SubscriptionInfo { get; set; }
    public GenerationInfo? GenerationInfo { get; set; }
}
