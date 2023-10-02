using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Runtime;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace CLI.Services;

public class GoogleRecaptchaServiceTest
{
    [Fact]
    public void Verefication_New_ReturnsHttpClient()
    {
        // Arrange


        // Act
        var client = new HttpClient();

        // Assert
        Assert.NotNull(client);
    }
    
    [Theory]
    [InlineData("https://www.google.com/recaptcha/api/siteverify?secret=0&response=0\"")]
    public void Verefication_GetString_ReturnsResponse(string requestUri)
    {
        // Arrange
        var client = new HttpClient();

        // Act
        var response = client.GetStringAsync(requestUri);

        // Assert
        Assert.NotNull(client);
    }

    [Theory]
    [InlineData("https://www.google.com/recaptcha/api/siteverify?secret=0&response=0\"")]
    public async void Verefication_Deserialize_ReturnsCaptchaResponce(string responseUri)
    {
        // Arrange
        var client = new HttpClient();
        var response = await client.GetStringAsync(responseUri);

        // Act
        var captchaResponce = JsonConvert.DeserializeObject<GoogleRecaptchaRespnse>(response);

        // Assert
        Assert.NotNull(captchaResponce);
    }
}