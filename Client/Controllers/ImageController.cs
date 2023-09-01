using MassTransit;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using StableDraw.Contracts.MInIoContracts.Replies;
using StableDraw.Contracts.MInIoContracts.Requests;
using StableDraw.Core.Models;
using StableDraw.Domain.Repositories;

namespace CLI.Controllers;

[ApiController]
[Route($"api/[controller]/")]
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
        var user = await _userManager.GetUserAsync(User);
        var image = _repository.GetImage(imageName, user.Id);
        if (image == null)
        {
            return NotFound();
        }

        var response = await _bus.Request<GetObjectMinIoRequest, GetObjectMinIoReply>(new GetObjectRequestModel()
        {
            ObjectId = image.Oid, OrderId = Guid.NewGuid()
        });
        return Ok(response.Message);
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteObject(string imageName)
    {
        var user = await _userManager.GetUserAsync(User);
        var image = _repository.GetImage(imageName, user.Id);
        if (image == null)
        {
            return NotFound();
        }
        var response = 
            await _bus.Request<DeleteObjectMinIoRequest, DeleteObjectMinIoReply>(new DeleteObjectRequestModel()
                { ObjectId = image.Oid, OrderId = Guid.NewGuid()});
        _repository.DeleteImage(imageName, user.Id);
        return Ok(response.Message);
    }

    [HttpPost]
    public async Task<IActionResult> PostObject(IFormFile file)
    {
        var user = await _userManager.GetUserAsync(User);
        Response<PutObjectMinIoReply> response;
        //var imgId = Guid.NewGuid();
        var imgId = _repository.CreateImage(file.FileName, user.Id);
        _repository.Save();
        using (var memoryStream = new MemoryStream())
        {
            await file.CopyToAsync(memoryStream);
            response = await _bus
                .Request<PutObjectMinIoRequest, PutObjectMinIoReply>(new PutObjectRequestModel()
                    { ObjectId = imgId, Data = memoryStream.ToArray(), OrderId = Guid.NewGuid()});
        }

        if (response.Message == null)
            return BadRequest();
        return Ok(response.ResponseAddress.ToString());
    }

    [HttpPost]
    public async Task<IActionResult> PostObjects(IEnumerable<IFormFile> files)
    {
        var user = await _userManager.GetUserAsync(User);
        Response<PutObjectsMinIoReply> responce;
        var imagesId = _repository.CreateImages(files.Select(x => x.FileName), user.Id);
        _repository.Save();
        Response<PutObjectsMinIoReply> response;
        using (var memoryStream = new MemoryStream())
        {
            var dataBytes = files.Select(async x =>
            {
                await x.CopyToAsync(memoryStream);
                return memoryStream.ToArray();
            }).Select(x => x.Result);
            
            response =
                await _bus.Request<PutObjectsMinIoRequest, PutObjectsMinIoReply>(new PutObjectsRequestModel()
                {
                    OrderId = Guid.NewGuid(),
                    DataDictionary = imagesId.Zip(dataBytes, (k, v) => new { k, v }).ToDictionary(x => x.k, x => x.v) 
                });
        }
        return Ok(response.Message);
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteObjects()
    {
        var user = await _userManager.GetUserAsync(User);
        
        var imgs = _repository.GetImages(user.Id);
        if (!imgs.Any())
            return NotFound();
        var response = await _bus.Request<DeleteObjectsMinIoRequest, DeleteObjectsMinIoReply>(new DeleteObjectsRequestModel()
        {
            OrderId = Guid.NewGuid(),
            ObjectsId = imgs.Select(x => x.Oid),
            
        });
        _repository.DeleteImages(imgs.Select(x => x.ImageName), user.Id);
        return Ok(response.Message);
    }

    [HttpGet]
    public async Task<IActionResult> GetObjects()
    {
        var user = await _userManager.GetUserAsync(User);
        var images = _repository.GetImages(user.Id);
        if (!images.Any())
        {
            return NotFound();
        }
        var response = await _bus.Request<GetObjectsMinIoRequest, GetObjectsMinIoReply>(new GetObjectsMinIoRequest()
        {
            OrderId = Guid.NewGuid(),
            ObjectsId = images.Select(x => x.Oid)
        });
        return Ok(response.Message);
    }
}