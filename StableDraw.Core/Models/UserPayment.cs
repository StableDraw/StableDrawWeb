namespace StableDraw.Core.Models;

public class UserPayment
{
    public string UserId { get; set; }
    public Guid PaymentId { get; set; }
    public string Status { get; set; }
}