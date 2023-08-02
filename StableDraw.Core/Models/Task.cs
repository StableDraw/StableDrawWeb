using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StableDraw.Core.Models;

public class Task : BaseObject
{
    public TaskType Type { get; set; }
    public Guid UserId { get; set; }
    public ICollection<Generation> Generations { get; set; } = new List<Generation>();
}

public enum TaskType
{
    Image,
    NotImage
}