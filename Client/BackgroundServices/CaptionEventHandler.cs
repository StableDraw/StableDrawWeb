using EasyNetQ;

namespace CLI.BackgroundServises;

public class CaptionEventHandler : BackgroundService
{
    private readonly IBus _bus;

    public CaptionEventHandler(IBus bus)
    {
        _bus = bus;
    }
    
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        await _bus.Rpc.RespondAsync<CaptionRequest, CaptionReply>(ProcessCaptionRequest);
    }

    private CaptionReply ProcessCaptionRequest(CaptionRequest request)
    {
        
        return new CaptionReply();
    }
}

public class CaptionRequest
{
    
}

public class CaptionReply
{
    
}