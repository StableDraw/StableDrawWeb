using MassTransit;
using StableDraw.Contracts;
using StableDraw.Contracts.MInIoContracts.Replies;
using StableDraw.Contracts.MInIoContracts.Requests;
using StableDraw.MinIOService.Services;

namespace StableDraw.MinIOService.Consumers;

public class GetObjectConsumer : IConsumer<IGetObjectRequest>
{
    private readonly IMinIoService _minIoService;

    public GetObjectConsumer(IMinIoService minIoService)
    {
        _minIoService = minIoService;
    }
    
    public async Task Consume(ConsumeContext<IGetObjectRequest> context)
    {
        var result = await _minIoService.GetObj(context.Message);
        await context.RespondAsync<IGetObjectReply>(new {result.ObjectId, result.Data, context.Message.OrderId});
    }
}