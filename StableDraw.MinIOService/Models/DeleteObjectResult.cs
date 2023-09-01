namespace StableDraw.MinIOService.Models;

public class DeleteObjectResult
{
    public Guid ObjectId { get; set; }
    public string ErrorMsg { get; set; }
}

public class DeleteObjectsResult
{
    public IEnumerable<Guid> ObjectsId { get; set; }
    public string ErrorMsg { get; set; }
}