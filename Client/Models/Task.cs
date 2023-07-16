namespace CLI.Models;

public class Task
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }

    public TaskType Type { get; set; }
    public IEnumerable<Generation> Generations { get; set; }
}

public enum TaskType
{
    Image,
    NotImage
}