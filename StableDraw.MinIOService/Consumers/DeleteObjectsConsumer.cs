using MassTransit;
using StableDraw.Contracts.MInIoContracts.Replies;
using StableDraw.Contracts.MInIoContracts.Requests;
using StableDraw.MinIOService.Services;

namespace StableDraw.MinIOService.Consumers;

public class DeleteObjectsConsumer : IConsumer<IDeleteObjectsRequest>
{
    private readonly IMinIoService _minIoService;

    public DeleteObjectsConsumer(IMinIoService minIoService)
    {
        _minIoService = minIoService;
    }

    public async Task Consume(ConsumeContext<IDeleteObjectsRequest> context)
    {
        var result = await _minIoService.DeleteObjects(context.Message);
        await context.RespondAsync<IDeleteObjectsReply>(new { context.Message.OrderId, result.ImagesNames });
    }
}