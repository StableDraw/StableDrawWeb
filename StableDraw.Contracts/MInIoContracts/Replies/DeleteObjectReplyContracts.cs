namespace StableDraw.Contracts.MInIoContracts.Replies;

public record DeleteObjectMinIoReply
{
    public Guid OrderId { get; set; }
    public string? ErrorMsg { get; set; }
    public Guid UserId { get; set; }
    public string? ImageName { get; set; }
}

public interface IDeleteObjectReply
{
    public Guid UserId { get; set; }
    public string ImageName { get; set; }
    public Guid OrderId { get; set; }
    public string ErrorMsg { get; set; }
}

public record DeleteObjectsMinIoReply
{
    public Guid OrderId { get; set; }
    public Guid UserId { get; set; }
    public string ErrorMsg { get; set; }
}

public interface IDeleteObjectsReply
{
    public Guid UserId { get; set; }
    public Guid OrderId { get; set; }
    public string ErrorMsg { get; set; }
}