namespace StableDraw.Core.Models;

public class DeleteObjectRequestModel
{
    public Guid OrderId { get; set; }
    public Guid ObjectId { get; set; }
}

public class DeleteObjectsRequestModel
{
    public Guid OrderId { get; set; }
    public IEnumerable<Guid> ObjectsId { get; set; }
}

public class PutObjectRequestModel
{
    public Guid OrderId { get; set; }
    public Guid ObjectId { get; set; }
    public byte[] Data { get; set; }
}

public class PutObjectsRequestModel
{
    public Guid OrderId { get; set; }
    public string? ErrorMsg { get; set; }
    public IDictionary<Guid, byte[]> DataDictionary { get; set; }
}

public class GetObjectRequestModel
{
    public Guid OrderId { get; set; }
    public Guid ObjectId { get; set; }
}

public class GetObjectsRequestModel
{
    public Guid OrderId { get; set; }
    public IEnumerable<Guid>? ObjectsId { get; set; }
    public string? ErrorMsg { get; set; }
}