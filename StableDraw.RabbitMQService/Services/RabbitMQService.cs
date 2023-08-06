using System.Text;
using System.Text.Json;
using RabbitMQ.Client;
using StableDraw.RabbitMQService.Settings;

namespace StableDraw.RabbitMQService.Services;

public class RabbitMQService : IRabbitMQService
{
    private readonly RabbitMQSettings _rabbitMqSettings;

    public RabbitMQService(RabbitMQSettings rabbitMqSettings)
    {
        _rabbitMqSettings = rabbitMqSettings;
    }
    
    public void SendMessage(object obj)
    {
        var message = JsonSerializer.Serialize(obj);
        SendMessage(message);
    }

    public void SendMessage(string message)
    {
        var factory = new ConnectionFactory() { HostName = _rabbitMqSettings.Address };
        using (var connection = factory.CreateConnection())
        using (var channel = connection.CreateModel())
        {
            channel.QueueDeclare(queue: _rabbitMqSettings.QueuesDictionary[RebbitMQQueueEnum.Status],
                durable: false,
                exclusive: false,
                autoDelete: false,
                arguments: null);

            var body = Encoding.UTF8.GetBytes(message);

            channel.BasicPublish(exchange: "",
                routingKey: _rabbitMqSettings.QueuesDictionary[RebbitMQQueueEnum.Status],
                basicProperties: null,
                body: body);
        }
    }
}