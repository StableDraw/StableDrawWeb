namespace StableDraw.Contracts.RenderContracts.Replies;

public interface IGetRenderedImageReply
{
    public Guid OrderId { get; set; }
    public byte[] Data { get; set; }
    public string SceneName { get; set; }
    public string ErrorMsg { get; set; }
}

public record GetRenderedImageReply
{
    public Guid OrderId { get; set; }
    public byte[]? Data { get; set; }
    public string? SceneName { get; set; }
    public string? ErrorMsg { get; set; }
}
