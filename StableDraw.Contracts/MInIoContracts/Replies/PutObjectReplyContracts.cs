namespace StableDraw.Contracts.MInIoContracts.Replies;

public record PutObjectMinIoReply
{
    public Guid OrderId { get; set; }
    public string? ErrorMsg { get; set; }
    public Guid ObjectId { get; set; }
}

public interface IPutObjectReply
{
    public Guid ObjectId { get; set; }
    public Guid OrderId { get; set; }
    public string ErrorMsg { get; set; }
}

public record PutObjectsMinIoReply
{
    public Guid OrderId { get; set; }
    public string ErrorMsg { get; set; }
}

public interface IPutObjectsReply
{
    public Guid OrderId { get; set; }
    public string ErrorMsg { get; set; }
}