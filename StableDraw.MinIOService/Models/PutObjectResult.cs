namespace StableDraw.MinIOService.Models;

public class PutObjectResult
{
    public string? ImageName { get; set; }
    public string ErrorMsg { get; set; }
}

public class PutObjectsResult
{
    public string ErrorMsg { get; set; }
}