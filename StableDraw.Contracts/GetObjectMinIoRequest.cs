namespace StableDraw.Contracts;

public record GetObjectMinIoRequest
{
    public Guid OrderId { get; set; }
    public string? ErrorMsg { get; set; }
    public Guid ObjectId { get; set; }
}