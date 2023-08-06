using RabbitMQ.Client;

namespace StableDraw.RabbitMQService.Settings;

public class RabbitMQSettings
{
    public string Address { get; set; }
    public Dictionary<RebbitMQQueueEnum, string> QueuesDictionary { get; set; }
}

public enum RebbitMQQueueEnum
{
    Status
}