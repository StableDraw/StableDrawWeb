namespace StableDraw.Contracts;

public interface IPutObjectReply
{
    public Guid ObjectId { get; set; }
    public Guid OrderId { get; set; }
    public string ErrorMsg { get; set; }
}