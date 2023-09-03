using MassTransit;
using StableDraw.Contracts.MInIoContracts.Replies;
using StableDraw.Contracts.MInIoContracts.Requests;
using StableDraw.MinIOService.Services;

namespace StableDraw.MinIOService.Consumers;

public class GetObjectsConsumer : IConsumer<IGetObjectsRequest>
{
    private readonly IMinIoService _minIoService;

    public GetObjectsConsumer(IMinIoService minIoService)
    {
        _minIoService = minIoService;
    }

    public async Task Consume(ConsumeContext<IGetObjectsRequest> context)
    {
        var result = await _minIoService.GetObjects(context.Message);
        await context.RespondAsync<IGetObjectsReply>(new {context.Message.OrderId, result.DataDictionary});
    }
}