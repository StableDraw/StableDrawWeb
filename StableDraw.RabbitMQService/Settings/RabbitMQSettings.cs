using RabbitMQ.Client;
using StableDraw.RabbitMQService.Services;

namespace StableDraw.RabbitMQService.Settings;

public class RabbitMQSettings
{
    public string Address { get; set; }
    public Dictionary<RebbitMQQueueEnum, string> QueuesDictionary { get; set; }
}
