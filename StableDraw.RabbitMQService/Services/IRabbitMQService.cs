namespace StableDraw.RabbitMQService.Services;

public interface IRabbitMQService
{ 
    // void SendMessage(object obj);
    // void SendMessage(string message);
    void SendMesssage<T>(T message);
}

public enum RebbitMQQueueEnum
{
    StatusRequest,
    StatusReply,
    ImageToNeuralNetwork,
    ImageToBackend,
    ImageToMinIO
}