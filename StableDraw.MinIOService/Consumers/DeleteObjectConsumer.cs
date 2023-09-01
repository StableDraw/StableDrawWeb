using MassTransit;
using StableDraw.Contracts.MInIoContracts.Replies;
using StableDraw.Contracts.MInIoContracts.Requests;
using StableDraw.MinIOService.Services;

namespace StableDraw.MinIOService.Consumers;

public class DeleteObjectConsumer : IConsumer<IDeleteObjectRequest>
{
    private readonly IMinIoService _minIoService;

    public DeleteObjectConsumer(IMinIoService minIoService)
    {
        _minIoService = minIoService;
    }
    
    public async Task Consume(ConsumeContext<IDeleteObjectRequest> context)
    {
        var result = await _minIoService.DelObj(context.Message);
        await context.RespondAsync<IDeleteObjectReply>(new { result.ObjectId, context.Message.OrderId });
    }
}