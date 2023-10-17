using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using StableDraw.Application.Common.Interfaces;
using StableDraw.Application.DTOs;
using StableDraw.Infrastructure.Settings;

namespace StableDraw.Infrastructure.Services;

public class GoogleRecaptchaService : IGoogleRecaptchaService
{
    private readonly GoogleRecaptchaSettings _settings;

    public GoogleRecaptchaService(IOptions<GoogleRecaptchaSettings> settings)
    {
        _settings = settings.Value;
    }

    public async Task<GoogleRecaptchaResponseDto> Verefication(string token)
    {
        GoogleRecaptchaData data = new GoogleRecaptchaData()
        {
            Response = token,
            SecretKey = _settings.RecaptchaSecretKey
        };

        var client = new HttpClient();

        var response = await client.GetStringAsync($"https://www.google.com/recaptcha/api/siteverify?secret={data.SecretKey}&response={data.Response}");

        var captchaResponse = JsonConvert.DeserializeObject<GoogleRecaptchaResponseDto>(response);

        return captchaResponse;
    }
}

public class GoogleRecaptchaData
{
    public string Response { get; set; }
    public string SecretKey { get; set; }
}

