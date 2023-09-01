namespace StableDraw.Contracts.MInIoContracts.Replies;

public record DeleteObjectMinIoReply
{
    public Guid OrderId { get; set; }
    public string? ErrorMsg { get; set; }
    public Guid ObjectId { get; set; }
}

public interface IDeleteObjectReply
{
    public Guid ObjectId { get; set; }
    public Guid OrderId { get; set; }
    public string ErrorMsg { get; set; }
}

public record DeleteObjectsMinIoReply
{
    public IEnumerable<Guid> ObjectsId { get; set; }
    public Guid OrderId { get; set; }
    public string ErrorMsg { get; set; }
}

public interface IDeleteObjectsReply
{
    public IEnumerable<Guid> ObjectsId { get; set; }
    public Guid OrderId { get; set; }
    public string ErrorMsg { get; set; }
}