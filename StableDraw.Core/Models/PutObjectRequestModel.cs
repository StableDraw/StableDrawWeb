namespace StableDraw.Core.Models;

public class PutObjectRequestModel
{
    public Guid OrderId { get; set; }
    public Guid ObjectId { get; set; }
    public byte[] Data { get; set; }
}