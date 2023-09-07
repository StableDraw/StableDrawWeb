namespace StableDraw.Contracts.NeuralContracts.Replies;

public class NeuralReply
{
    public Guid OrderId { get; set; }
    public string? NeuralType { get; set; }
    public string? TextResult { get; set; }
    public IEnumerable<byte[]>? Images { get; set; }
    public string? ErrorMsg { get; set; }
}

public interface INeuralReply
{
    public Guid OrderId { get; set; }
    public string? NeuralType { get; set; }
    public string? TextResult { get; set; }
    public IEnumerable<byte[]>? Images { get; set; }
    public string? ErrorMsg { get; set; }
}

// public class NeuralInfoReply
// {
//     public Guid OrderId { get; set; }
//     public string? NeuralType { get; set; }
//     public string? ResultStr { get; set; }
// }
//
// public interface INeuralInfoReply
// {
//     public Guid OrderId { get; set; }
//     public string? NeuralType { get; set; }
//     public string? ResultStr { get; set; }
// }

