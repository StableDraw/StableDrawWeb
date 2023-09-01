using MassTransit;
using StableDraw.Contracts;
using StableDraw.Contracts.MInIoContracts.Replies;
using StableDraw.Contracts.MInIoContracts.Requests;
using StableDraw.MinIOService.Services;


namespace StableDraw.MinIOService.Consumers;

public class PutObjectConsumer : IConsumer<IPutObjectRequest>
{
    private readonly IMinIoService _minIoService;

    public PutObjectConsumer(IMinIoService minIoService)
    {
        _minIoService = minIoService;
    }

    public async Task Consume(ConsumeContext<IPutObjectRequest> context)
    {
        var result = await _minIoService.PutObj(context.Message);
        await context.RespondAsync<IPutObjectReply>(new { result.ObjectId, context.Message.OrderId });
    }
}