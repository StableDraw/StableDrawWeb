namespace StableDraw.MinIOService.Models;

public class DeleteObjectResult
{
    public string? ImageName { get; set; }
    public string ErrorMsg { get; set; }
}

public class DeleteObjectsResult
{
    public IEnumerable<string>? ImagesNames { get; set; }
    public string ErrorMsg { get; set; }
}