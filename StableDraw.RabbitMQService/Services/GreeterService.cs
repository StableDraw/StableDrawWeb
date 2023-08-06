using Grpc.Core;
using StableDraw.RabbitMQService;

namespace StableDraw.RabbitMQService.Services;

public class GreeterService : Greeter.GreeterBase
{
    private readonly ILogger<GreeterService> _logger;
    private readonly IRabbitMQService _mqService;
    public GreeterService(ILogger<GreeterService> logger, IRabbitMQService rabbitMqService)
    {
        _logger = logger;
        _mqService = rabbitMqService;
    }

    public override Task<HelloReply> SayHello(HelloRequest request, ServerCallContext context)
    {
        _mqService.SendMessage(request);
        return Task.FromResult(new HelloReply
        {
            Message = "Hello " + request.Name
        });
    }

    public override Task<StatusReply> GenCaption(FromImageRequest request, ServerCallContext context)
    {
        return Task.FromResult(new StatusReply
        {
                
        });
    }
    
    public override Task<StatusReply> StableDiffusionTextToImage(FromTextRequest request, ServerCallContext context)
    {
        return Task.FromResult(new StatusReply
        {
            
        });
    }
    
    public override Task<StatusReply> StableDiffusionImageToImage(FromImageandTextRequest request, ServerCallContext context)
    {
        return Task.FromResult(new StatusReply
        {
            
        });
    }
    
    public override Task<StatusReply> StableDiffusionDepthToImage(FromImageandTextRequest request, ServerCallContext context)
    {
        return Task.FromResult(new StatusReply
        {
            
        });
    }
    
    public override Task<StatusReply> StableDiffusionInpainting(FromImgandMaskandTextRequest request, ServerCallContext context)
    {
        return Task.FromResult(new StatusReply
        {
            
        });
    }
    
    public override Task<StatusReply> StableDiffusionUpscaler(FromImageandTextRequest request, ServerCallContext context)
    {
        return Task.FromResult(new StatusReply
        {
            
        });
    }
    
    public override Task<StatusReply> StableDiffusionUpscalerXX(FromImageandTextRequest request, ServerCallContext context)
    {
        return Task.FromResult(new StatusReply
        {
            
        });
    }
    
    public override Task<StatusReply> Upscale(FromImageRequest request, ServerCallContext context)
    {
        return Task.FromResult(new StatusReply
        {
            
        });
    }
    
    public override Task<StatusReply> DeleteBackground(FromImageRequest request, ServerCallContext context)
    {
        return Task.FromResult(new StatusReply
        {
            
        });
    }
    
    public override Task<StatusReply> GetImageClass(FromImgOnlyRequest request, ServerCallContext context)
    {
        return Task.FromResult(new StatusReply
        {
            
        });
    }
    
    public override Task<StatusReply> ImageColorizer(FromImageRequest request, ServerCallContext context)
    {
        return Task.FromResult(new StatusReply
        {
            
        });
    }
}
