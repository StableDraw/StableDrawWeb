namespace StableDraw.Contracts.MInIoContracts.Replies;

public record DeleteObjectsMinIoReply
{
    public Guid OrderId { get; set; }
    public string ErrorMsg { get; set; }
}

public interface IDeleteObjectsReply
{
    public Guid OrderId { get; set; }
    public string ErrorMsg { get; set; }
}