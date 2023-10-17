namespace StableDraw.Application.DTOs;

public class GoogleRecaptchaResponseDto
{ 
    public bool success { get; set; } 
    public double score { get; set; } 
    public string action { get; set; } 
    public DateTime chellenge_ts { get; set; } 
    public string hostname { get; set; }
}