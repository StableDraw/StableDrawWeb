using CLI.Contracts;
using MassTransit;
using Microsoft.AspNetCore.Mvc;

namespace CLI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ImageController : Controller
{
    private readonly IRequestClient<IMinIORequest> _clientRequest;
    private readonly ILogger<ImageController> _logger;
    public ImageController(IRequestClient<IMinIORequest> clientRequest, ILogger<ImageController> logger)
    {
        _clientRequest = clientRequest;
        _logger = logger;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetObject(GetObjectRequest request)
    {
        var response = await _clientRequest.GetResponse<GetObjectReply>(request);
        return Ok(response.Message);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteObject(GetObjectRequest request)
    {
        var response = await _clientRequest.GetResponse<DeleteObjectReply>(request);
        return Ok(response.Message);
    }
    //
    // [HttpGet]
    // public IActionResult Get()
    // {
    // }

    [HttpPost]
    public async Task<IActionResult> Post(PutObjectRequest request)
    {
        Response<PutObjectReply> response = await _clientRequest.GetResponse<PutObjectReply>(request);
        return Ok(response.Message);
    }
}