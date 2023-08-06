using Google.Protobuf;
using Grpc.Core;
using StableDraw.MinIOService.Models;

namespace StableDraw.MinIOService.Services;

public class GreeterService : Greeter.GreeterBase
{
    private readonly ILogger<GreeterService> _logger;
    private readonly IMinIOService _minIo;
    
    public GreeterService(ILogger<GreeterService> logger, IMinIOService minIo)
    {
        _logger = logger;   
        _minIo = minIo;
    }

    public override Task<HelloReply> SayHello(HelloRequest request, ServerCallContext context)
    {
        return Task.FromResult(new HelloReply
        {
            Message = "Hello " + request.Name
        });
    }

    public override async Task<ImageReply> GetObject(ImageIdRequest request, ServerCallContext context)
    {
        var resultImg = await _minIo.GetObj("", request.Id);
        
        return await Task.FromResult(new ImageReply
        {
            ImgBinaryData = ByteString.CopyFrom(resultImg.Data)
        });
    }

    public override async Task<ImageIdReply> PutObject(ImageRequest request, ServerCallContext context)
    {
        var result = await _minIo.PutObj(new PutObjectRequest() { Data = request.ImgBinaryData.ToByteArray() });
        return await Task.FromResult(new ImageIdReply
        {
            ImageId = result
        });
    }

    public override async Task<StatusReply> DelObject(ImageIdRequest request, ServerCallContext context)
    {
        var result = await _minIo.DelObj(new DeleteObjectRequest { Bucket = request.Id = request.Id });
        return await Task.FromResult(new StatusReply{Code = (int)result});
    }
}
