using RabbitMQ.Client;

namespace StableDraw.RabbitMQService.Settings;

public class RabbitMQSettings
{
    public string HostName { get; set; }
    public Dictionary<RebbitMQQueueEnum, string> QueuesDictionary { get; set; }
}

public enum RebbitMQQueueEnum
{
    
}