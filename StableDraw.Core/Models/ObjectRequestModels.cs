namespace StableDraw.Core.Models;

public class DeleteObjectRequestModel
{
    public Guid OrderId { get; set; }
    public Guid UserId { get; set; }
    public string? ImageName { get; set; }
}

public class DeleteObjectsRequestModel
{
    public Guid OrderId { get; set; }
    public Guid UserId { get; set; }
}

public class PutObjectRequestModel
{
    public Guid OrderId { get; set; }
    public Guid UserId { get; set; }
    public string? ImageName { get; set; }
    public byte[]? Data { get; set; }
}

public class PutObjectsRequestModel
{
    public Guid OrderId { get; set; }
    public string? ErrorMsg { get; set; }
    public Guid UserId { get; set; }
    public IDictionary<string, byte[]>? DataDictionary { get; set; }
}

public class GetObjectRequestModel
{
    public Guid OrderId { get; set; }
    public string? ImageName { get; set; }
    public Guid UserId { get; set; }
}

public class GetObjectsRequestModel
{
    public Guid OrderId { get; set; }
    public Guid UserId { get; set; }
    public string? ErrorMsg { get; set; }
}