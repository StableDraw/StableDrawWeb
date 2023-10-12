namespace StableDraw.Contracts.MInIoContracts.Replies;

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