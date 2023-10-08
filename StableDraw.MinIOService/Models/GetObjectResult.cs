namespace StableDraw.MinIOService.Models;

public class GetObjectResult
{
    public string? ImageName { get; set; }
    public byte[] Data { get; set; }
    public string ErrorMsg { get; set; }
}

public class GetObjectsResult
{
    public string? ErrorMsg { get; set; }
    public IDictionary<string ,byte[]>? DataDictionary { get; set; }
}