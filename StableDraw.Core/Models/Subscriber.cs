using System.ComponentModel.DataAnnotations;

namespace StableDraw.Core.Models;

public class Subscriber : ApplicationUser
{
    public DateTime Expiration { get; set; }
}