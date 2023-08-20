namespace CLI.Contracts;

public record GetObjectRequest : IMinIORequest
{
    public Guid ObjectId { get; set; }
}