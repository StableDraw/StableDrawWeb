namespace CLI.Models;

public class Generation
{
    public Guid TaskId { get; set; }
    public int Number { get; set; }
    public GenerationType Type {get;set;}
    public Result Result { get; set; }
}

public enum GenerationType
{
    Image,
    Caption,
    Parameter
}