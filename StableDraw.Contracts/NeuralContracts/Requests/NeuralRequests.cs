using Microsoft.AspNetCore.Http;

namespace StableDraw.Contracts.NeuralContracts.Requests;

public class NeuralRequest
{
    public Guid OrderId { get; set; }
    public string? NeuralType { get; set; }
    public string? Caption { get; set; }
    public IEnumerable<string>? Prompts { get; set; }
    public Dictionary<string, string>? Parameters { get; set; }
    public IEnumerable<byte[]>? ImagesInput { get; set; }
}

public interface INeuralRequest
{
    public Guid OrderId { get; set; }
    public string? NeuralType { get; set; }
    public string? Caption { get; set; }
    public IEnumerable<string>? Prompts { get; set; }
    public Dictionary<string, string>? Parameters { get; set; }
    public IEnumerable<byte[]>? ImagesInput { get; set; }
}