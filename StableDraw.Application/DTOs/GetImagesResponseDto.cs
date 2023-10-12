namespace StableDraw.Application.DTOs;

public class GetImagesResponseDto
{
    public IDictionary<string, byte[]> OutputImages { get; set; }
}