namespace StableDraw.Contracts;

public record PutObjectMinIoReply
{
    public Guid OrderId { get; set; }
    public string? ErrorMsg { get; set; }
    public Guid ObjectId { get; set; }
    public byte[]? Data { get; set; }
}