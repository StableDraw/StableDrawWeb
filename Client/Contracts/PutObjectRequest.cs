namespace CLI.Contracts;

public record PutObjectRequest : IMinIORequest
{
    public Guid ObjectId { get; set; }
    public byte[] Data { get; set; }
}