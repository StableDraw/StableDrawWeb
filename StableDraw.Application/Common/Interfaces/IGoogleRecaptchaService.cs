using StableDraw.Application.DTOs;

namespace StableDraw.Application.Common.Interfaces;

public interface IGoogleRecaptchaService
{
    Task<GoogleRecaptchaResponseDto> Verefication(string token);
}