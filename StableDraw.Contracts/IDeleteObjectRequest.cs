namespace StableDraw.Contracts;

public interface IDeleteObjectRequest
{
    public Guid ObjectId { get; set; }
    public Guid OrderId { get; set; }
}