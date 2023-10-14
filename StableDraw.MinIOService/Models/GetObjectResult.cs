namespace StableDraw.MinIOService.Models;

public class GetObjectResult
{
    public Guid ObjectId { get; set; }
    public byte[] Data { get; set; }
    public string ErrorMsg { get; set; }
}

public class GetObjectsResult
{
    public string? ErrorMsg { get; set; }
    public IDictionary<dynamic ,byte[]>? DataDictionary { get; set; }
}