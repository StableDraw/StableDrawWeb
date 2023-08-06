namespace StableDraw.MinIOService.Models;

public class DeleteObjectRequest
{
    public string Bucket { get; set; }
    public string ObjectName { get; set; }
}