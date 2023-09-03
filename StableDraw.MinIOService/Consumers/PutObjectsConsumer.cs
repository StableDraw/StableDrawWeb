using MassTransit;
using StableDraw.Contracts.MInIoContracts.Replies;
using StableDraw.Contracts.MInIoContracts.Requests;
using StableDraw.MinIOService.Services;

namespace StableDraw.MinIOService.Consumers;

public class PutObjectsConsumer : IConsumer<IPutObjectsRequest>
{
    private readonly IMinIoService _minIoService;

    public PutObjectsConsumer(IMinIoService minIoService)
    {
        _minIoService = minIoService;
    }

    public async Task Consume(ConsumeContext<IPutObjectsRequest> context)
    {
        var result = await _minIoService.PutObjects(context.Message);
        await context.RespondAsync<IPutObjectsReply>(new { context.Message.OrderId });
    }
}