namespace StableDraw.Application.DTOs;

public record NeuralInfoResponseDto
{
    public IDictionary<string, string[]> InfoDict { get; set; }
}