namespace StableDraw.Contracts.MInIoContracts.Replies;

public record PutObjectMinIoReply
{
    public Guid OrderId { get; set; }
    public string? ErrorMsg { get; set; }
    public Guid UserId { get; set; }
    public string? ImageName { get; set; }
}

public interface IPutObjectReply
{
    public Guid UserId { get; set; }
    public string ImageName { get; set; }
    public Guid OrderId { get; set; }
    public string ErrorMsg { get; set; }
}

public record PutObjectsMinIoReply
{
    public Guid OrderId { get; set; }
    public Guid UserId { get; set; }
    public IEnumerable<string>? ImagesNames { get; set; }
    public string ErrorMsg { get; set; }
}

public interface IPutObjectsReply
{
    public Guid OrderId { get; set; }
    public Guid UserId { get; set; }
    public IEnumerable<string>? ImagesNames { get; set; }
    public string ErrorMsg { get; set; }
}