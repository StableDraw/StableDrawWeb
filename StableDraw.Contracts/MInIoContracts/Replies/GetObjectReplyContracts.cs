namespace StableDraw.Contracts.MInIoContracts.Replies;

public interface IGetObjectReply
{
    public byte[] Data { get; set; }
    public string ImageName { get; set; }
    public Guid OrderId { get; set; }
    public string ErrorMsg { get; set; }
}

public record GetObjectMinIoReply
{
    public Guid OrderId { get; set; }
    public string? ImageName { get; set; }
    public string? ErrorMsg { get; set; }
    public byte[]? Data { get; set; }
}

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