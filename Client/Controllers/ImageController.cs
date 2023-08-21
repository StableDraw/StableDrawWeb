using CLI.Contracts;
using Duende.IdentityServer.Extensions;
using MassTransit;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using StableDraw.Core.Models;
using StableDraw.Domain.Repositories;

namespace CLI.Controllers;

[ApiController]
[Route("api/[controller]/")]
public class ImageController : Controller
{
    private readonly IRequestClient<IMinIORequest> _clientRequest;
    private readonly ILogger<ImageController> _logger;
    private readonly IApplicationRepository _repository;
    private readonly UserManager<ApplicationUser> _userManager;
    //private readonly UserManager<IdentityUser> _userManager;

    public ImageController(
        IRequestClient<IMinIORequest> clientRequest, ILogger<ImageController> logger, 
        IApplicationRepository repository, UserManager<ApplicationUser> userManager)
    {
        _clientRequest = clientRequest;
        _logger = logger;
        _repository = repository;
        _userManager = userManager;
    }

    [HttpGet("{imageName}")]
    public async Task<IActionResult> GetObject(string imageName)
    {
        var user = _userManager.GetUserAsync(User);
        var image = _repository.GetImage(imageName, user.Id);
        var response = await _clientRequest.GetResponse<GetObjectReply>(new GetObjectRequest(){ObjectId = image});
        return Ok(response.Message);
    }

    [HttpDelete("{imageName}")]
    public async Task<IActionResult> DeleteObject(string imageName)
    {
        var user = _userManager.GetUserAsync(User);
        var image = _repository.GetImage(imageName, user.Id);
        var response = await _clientRequest.GetResponse<DeleteObjectReply>( new DeleteObjectRequest(){ObjectId = image});
        _repository.DeleteImage(imageName, user.Id);
        return Ok(response.Message);
    }

    [HttpPost]
    public async Task<IActionResult> Post(IFormFile file)
    {
        var user = _userManager.GetUserAsync(User);
        var imgId = _repository.CreateImage(file.FileName, user.Id);
        Response<PutObjectReply> response;
        using (var memoryStream = new MemoryStream())
        {
            await file.CopyToAsync(memoryStream);
            response = await _clientRequest
                .GetResponse<PutObjectReply>(new PutObjectRequest()
                    { ObjectId = imgId, Data = memoryStream.ToArray() });
        }
        return Ok(response.Message);
    }
}