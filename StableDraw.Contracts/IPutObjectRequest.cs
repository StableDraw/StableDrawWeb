namespace StableDraw.Contracts;

public interface IPutObjectRequest
{
    public Guid ObjectId { get; set; }
    public byte[] Data { get; set; }
    public Guid OrderId { get; set; }
}