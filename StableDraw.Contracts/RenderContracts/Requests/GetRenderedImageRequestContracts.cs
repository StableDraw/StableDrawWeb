namespace StableDraw.Contracts.RenderContracts.Requests;

public interface IGetRenderedImageRequest
{
    public Guid OrderId { get; set; }
    public string ErrorMsg { get; set; }
    public string SceneName { get; set; }
    public double[] Coords { get; set; }
}

public class GetRenderedImageRequest
{
    public Guid OrderId { get; set; } 
    public string? ErrorMsg { get; set; }
    public string? SceneName { get; set; }
    public double[]? Coords { get; set; }
}

