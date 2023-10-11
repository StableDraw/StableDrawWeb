using MassTransit;
using MassTransit.Mediator;
using StableDraw.Contracts.MInIoContracts.Replies;

namespace StableDraw.Contracts.MInIoContracts.Requests;

public record DeleteObjectMinIoRequest
{
    public Guid OrderId { get; set; }
    public string? ErrorMsg { get; set; }
    public Guid UserId { get; set; }
    public string? ImageName { get; set; }
}

public interface IDeleteObjectRequest
{
    public Guid UserId { get; set; }
    public string ImageName { get; set; }
    public Guid OrderId { get; set; }
}

public record DeleteObjectsMinIoRequest
{
    public Guid OrderId { get; set; }
    public Guid UserId { get; set; }
}

public interface IDeleteObjectsRequest
{
    public Guid OrderId { get; set; }
    public Guid UserId { get; set; }
}