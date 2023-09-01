namespace StableDraw.Contracts.MInIoContracts.Requests;

public record DeleteObjectMinIoRequest
{
    public Guid OrderId { get; set; }
    public string? ErrorMsg { get; set; }
    public Guid ObjectId { get; set; }
}

public interface IDeleteObjectRequest
{
    public Guid ObjectId { get; set; }
    public Guid OrderId { get; set; }
}

public record DeleteObjectsMinIoRequest
{
    public Guid OrderId { get; set; }
    public IEnumerable<Guid> ObjectsId { get; set; }
}

public interface IDeleteObjectsRequest
{
    public Guid OrderId { get; set; }
    public IEnumerable<Guid> ObjectsId { get; set; }
}