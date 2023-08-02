using System.ComponentModel.DataAnnotations;

namespace StableDraw.Core.Models;

public class SubscriptionInfo : BaseObject
{
    public Subscriber Subscriber { get; set; }
    public DateTime Expiration { get; set; }
}