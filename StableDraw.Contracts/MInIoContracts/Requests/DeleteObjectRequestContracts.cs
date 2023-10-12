namespace StableDraw.Contracts.MInIoContracts.Requests;

public record DeleteObjectsMinIoRequest
{
    public Guid OrderId { get; set; }
    public string UserId { get; set; }
    public IEnumerable<string>? ObjectNames { get; set; }
}

public interface IDeleteObjectsRequest
{
    public Guid OrderId { get; set; }
    public string UserId { get; set; }
    public IEnumerable<string>? ObjectNames { get; set; }
}