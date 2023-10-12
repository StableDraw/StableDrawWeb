namespace StableDraw.Contracts.MInIoContracts.Requests;

public class GetObjectsMinIoRequest
{
    public Guid OrderId { get; set; }
    public string UserId { get; set; }
    public IEnumerable<string>? ObjectNames { get; set; }
}

public interface IGetObjectsRequest
{
    public Guid OrderId { get; set; }
    public string UserId { get; set; }
    public IEnumerable<string>? ImageNames { get; set; }
}
