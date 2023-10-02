using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
//using Moq;

namespace CLI.Controllers;

public class OidcConfigurationControllerTest
{
    private readonly ILogger<OidcConfigurationController> _logger;
    private IClientRequestParametersProvider clientRequestParametersProvider;

    private OidcConfigurationController CreateDefaultOidcConfigurationController()
    {
        return new OidcConfigurationController(clientRequestParametersProvider, _logger);
    }

    /*
    [Theory]
    [InlineData("_configuration/{clientId}")]
    public void GetClientRequestParameters_Get_ReturnsClientParametres([FromRoute]string clienId)
    {
        // Arrange
        var controller = CreateDefaultOidcConfigurationController();

        // Act
        var parameters = controller.GetClientRequestParameters(clienId);

        // Assert
        Assert.NotNull(parameters);
    }
    */
}