namespace CLI.Contracts;

public record DeleteObjectRequest : IMinIORequest
{
    public Guid ObjectId { get; set; }
}