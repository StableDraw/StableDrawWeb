using MassTransit;
using StableDraw.Contracts.MInIoContracts.Replies;
using StableDraw.Contracts.MInIoContracts.Requests;
using StableDraw.MinIOService.Services;

namespace StableDraw.MinIOService.Consumers;

public class GetBabylonDataConsumer : IConsumer<IGetBabylonDataRequest>
{
    private readonly IMinIoService _minIoService;
    

    public GetBabylonDataConsumer(IMinIoService minIoService)
    {
        _minIoService = minIoService;
    }

    public async Task Consume(ConsumeContext<IGetBabylonDataRequest> context)
    {
        var result = await _minIoService.GetBabylonData(context.Message);
        await context.RespondAsync(result);
    }
}