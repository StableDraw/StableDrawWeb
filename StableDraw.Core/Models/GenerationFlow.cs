using StableDraw.Core.Models.DTOs;

namespace StableDraw.Core.Models;

public class GenerationFlow : BaseObject
{
    public Guid UserId { get; set; }
    public User User { get; set; } = null!;
    public DateTime Date { get; set; }
    public int Flow { get; set; }
}