namespace StableDraw.Core.Models;

public class DeleteObjectRequestModel
{
    public Guid OrderId { get; set; }
    public Guid ObjectId { get; set; }
}