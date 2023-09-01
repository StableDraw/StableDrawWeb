namespace StableDraw.Contracts.NeuralContracts.Requests;

public class NeuralToSagaRequest
{
    public Guid OrderId { get; set; }
    public string? Parameters { get; set; }
    public IEnumerable<byte[]>? ImagesInput { get; set; }
}