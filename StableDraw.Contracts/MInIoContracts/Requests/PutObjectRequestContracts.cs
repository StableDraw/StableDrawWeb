namespace StableDraw.Contracts.MInIoContracts.Requests;

public record PutObjectsMinIoRequest
{
    public Guid OrderId { get; set; }
    public string UserId { get; set; }
    public IDictionary<string, byte[]>? DataDictionary { get; set; }
}

public interface IPutObjectsRequest
{
    public Guid OrderId { get; set; }
    public string UserId { get; set; }
    public IDictionary<string, byte[]>? DataDictionary { get; set; }
}
