namespace StableDraw.Infrastructure.DTOs;

public record AuthResponseDto
{
    public string UserId { get; set; }
    public string Name { get; set; }
    public string Token { get; set; }
}