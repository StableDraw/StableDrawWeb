using MassTransit;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using StableDraw.Contracts;
using StableDraw.Core.Models;
using StableDraw.Domain.Repositories;

namespace CLI.Controllers;

[ApiController]
[Route("api/[controller]/")]
public class ImageController : Controller
{
    private readonly IBus _bus;
    private readonly ILogger<ImageController> _logger;
    private readonly IApplicationRepository _repository;
    private readonly UserManager<ApplicationUser> _userManager;

    public ImageController(
         ILogger<ImageController> logger, 
        IApplicationRepository repository, UserManager<ApplicationUser> userManager, IBus bus)
    {
        _logger = logger;
        _repository = repository;
        _userManager = userManager;
        _bus = bus;
    }

    [HttpGet]
    public async Task<IActionResult> GetObject(string imageName)
    {
        var user = _userManager.GetUserAsync(User);
        var image = _repository.GetImage(imageName, user.Id);
        var response = await _bus.Request<GetObjectMinIoRequest, GetObjectMinIoReply>(new GetObjectRequestModel()
            {ObjectId = image, OrderId = Guid.NewGuid()});
        return Ok(response.Message);
    }

    [HttpDelete("{imageName}")]
    public async Task<IActionResult> DeleteObject(string imageName)
    {
        var user = _userManager.GetUserAsync(User);
        var image = _repository.GetImage(imageName, user.Id);
        var response = 
            await _bus.Request<DeleteObjectMinIoRequest, DeleteObjectMinIoReply>(new DeleteObjectRequestModel()
                { ObjectId = image, OrderId = Guid.NewGuid()});
        _repository.DeleteImage(imageName, user.Id);
        return Ok(response.Message);
    }

    [HttpPost]
    public async Task<IActionResult> Post(IFormFile file)
    {
        var user = _userManager.GetUserAsync(User);
        var imgId = _repository.CreateImage(file.FileName, user.Id);
        Response<PutObjectMinIoReply> response;
        using (var memoryStream = new MemoryStream())
        {
            await file.CopyToAsync(memoryStream);
            response = await _bus
                .Request<PutObjectMinIoRequest, PutObjectMinIoReply>(new PutObjectRequestModel()
                    { ObjectId = imgId, Data = memoryStream.ToArray() });
        }
        return Ok(response.ResponseAddress.ToString());
    }
}