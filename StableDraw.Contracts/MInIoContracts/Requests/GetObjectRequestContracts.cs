namespace StableDraw.Contracts.MInIoContracts.Requests;

public class GetObjectMinIoRequest
{
    public Guid OrderId { get; set; }
    public string? ErrorMsg { get; set; }
    public Guid ObjectId { get; set; }
}

public interface IGetObjectRequest
{
    public Guid ObjectId { get; set; }
    public Guid OrderId { get; set; }
    public string ErrorMsg { get; set; }
}

public class GetObjectsMinIoRequest
{
    public Guid OrderId { get; set; }
    public IEnumerable<Guid>? ObjectsId { get; set; }
    public string? ErrorMsg { get; set; }
}

public interface IGetObjectsRequest
{
    public Guid OrderId { get; set; }
    public IEnumerable<Guid>? ObjectsId { get; set; }
    public string? ErrorMsg { get; set; }
}
