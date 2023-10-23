namespace StableDraw.Contracts.MInIoContracts.Requests;

public record GetBabylonDataRequest
{
    public Guid OrderId { get; set; }
}

public record IGetBabylonDataRequest
{
    public Guid OrderId { get; set; }
}