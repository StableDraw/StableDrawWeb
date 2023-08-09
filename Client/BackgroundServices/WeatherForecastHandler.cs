using EasyNetQ;

namespace CLI.BackgroundServices;

public class WeatherForecastHandler : BackgroundService
{
    private readonly IBus _bus;

    public WeatherForecastHandler(IBus bus)
    {
        _bus = bus;
    }
    
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        await _bus.Rpc.RespondAsync<WeatherForecast, WeatherForecastReply>(RequestProcess, cancellationToken: stoppingToken);
    }

    private WeatherForecastReply RequestProcess(WeatherForecast request)
    {
        return new WeatherForecastReply(){message = "Hello"};
    }
}

public class WeatherForecastReply
{
    public string message { get; set; }
}