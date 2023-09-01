namespace StableDraw.Contracts.MInIoContracts.Requests;

public interface IPutObjectRequest
{
    public Guid ObjectId { get; set; }
    public byte[] Data { get; set; }
    public Guid OrderId { get; set; }
}
public record PutObjectMinIoRequest
{
    public Guid OrderId { get; set; }
    public string? ErrorMsg { get; set; }
    public Guid ObjectId { get; set; }
    public byte[]? Data { get; set; }
}

public record PutObjectsMinIoRequest
{
    public Guid OrderId { get; set; }
    public string? ErrorMsg { get; set; }
    public IDictionary<Guid, byte[]> DataDictionary { get; set; }
    // public IEnumerable<Guid> ObjectsId { get; set; }
    // public IEnumerable<byte[]>? Data { get; set; }
}

public interface IPutObjectsRequest
{
    public Guid OrderId { get; set; }
    public string? ErrorMsg { get; set; }
    public IDictionary<Guid, byte[]> DataDictionary { get; set; }
    //public IEnumerable<>? Data { get; set; }
}
