namespace StableDraw.Contracts.MInIoContracts.Replies;

public record GetObjectsMinIoReply
{
    public Guid OrderId { get; set; }
    public Guid UserId { get; set; }
    public string? ErrorMsg { get; set; }
    public IDictionary<string, byte[]>? DataDictionary { get; set; } 
}

public interface IGetObjectsReply
{
    public Guid OrderId { get; set; }
    public Guid UserId { get; set; }
    public string? ErrorMsg { get; set; }
    public IDictionary<string, byte[]>? DataDictionary { get; set; }
}