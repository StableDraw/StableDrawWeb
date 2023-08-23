namespace StableDraw.Contracts;

public interface IGetObjectReply
{
    public Guid ObjectId { get; set; }
    public byte[] Data { get; set; }
    public Guid OrderId { get; set; }
    public string ErrorMsg { get; set; }
}