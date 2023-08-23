namespace StableDraw.MinIOService.Models;

public class GetObjectResult
{
    public Guid ObjectId { get; set; }
    public byte[] Data { get; set; }
    public string ErrorMsg { get; set; }
}