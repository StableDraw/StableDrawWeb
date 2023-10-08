namespace StableDraw.Contracts.MInIoContracts.Requests;

public class GetObjectMinIoRequest
{
    public Guid OrderId { get; set; }
    public string? ErrorMsg { get; set; }
    public string? ImageName { get; set; }
    public Guid UserId { get; set; }
}

public interface IGetObjectRequest
{
    public string? ImageName { get; set; }
    public Guid UserId { get; set; }
    public Guid OrderId { get; set; }
    public string ErrorMsg { get; set; }
}

public class GetObjectsMinIoRequest
{
    public Guid OrderId { get; set; }
    public Guid UserId { get; set; }
    public string? ErrorMsg { get; set; }
}

public interface IGetObjectsRequest
{
    public Guid OrderId { get; set; }
    public Guid UserId { get; set; }
    public string? ErrorMsg { get; set; }
}
