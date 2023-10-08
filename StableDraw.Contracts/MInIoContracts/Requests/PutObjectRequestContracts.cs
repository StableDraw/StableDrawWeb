namespace StableDraw.Contracts.MInIoContracts.Requests;

public interface IPutObjectRequest
{
    public Guid UserId { get; set; }
    public string ImageName { get; set; }
    public byte[] Data { get; set; }
    public Guid OrderId { get; set; }
}
public record PutObjectMinIoRequest
{
    public Guid OrderId { get; set; }
    public string? ErrorMsg { get; set; }
    public Guid UserId { get; set; }
    public string ImageName { get; set; }
    public byte[]? Data { get; set; }
}

public record PutObjectsMinIoRequest
{
    public Guid OrderId { get; set; }
    public string? ErrorMsg { get; set; }
    public Guid UserId { get; set; }
    public IDictionary<string, byte[]>? DataDictionary { get; set; }
}

public interface IPutObjectsRequest
{
    public Guid OrderId { get; set; }
    public string? ErrorMsg { get; set; }
    public Guid UserId { get; set; }
    public IDictionary<string, byte[]>? DataDictionary { get; set; }
}
