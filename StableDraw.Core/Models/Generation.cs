using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace StableDraw.Core.Models;

public class Generation : BaseObject
{
    public Guid TaskId { get; set; }
    public Task Task { get; set; } = null!;
    public int Number { get; set; }
    public GenerationType Type { get; set; }
    public Result Result { get; set; }
}

public enum GenerationType
{
    Image,
    Caption,
    Parameter
}