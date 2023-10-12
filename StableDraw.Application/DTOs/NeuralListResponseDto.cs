namespace StableDraw.Application.DTOs;

public record NeuralListResponseDto
{
    public string NeuralName { get; set; }
    public string Description { get; set; }
    public string ClientName { get; set; }
    public string ServerName { get; set; }
}