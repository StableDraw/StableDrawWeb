using System.Security.Claims;
using Duende.IdentityServer.Extensions;
using MassTransit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using StableDraw.Contracts.MInIoContracts.Replies;
using StableDraw.Contracts.MInIoContracts.Requests;
using StableDraw.Core.Models;
using StableDraw.Domain.Repositories;

namespace CLI.Controllers;

[ApiController]
[Authorize]
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

    [HttpGet("{imageName}")]
    public async Task<IActionResult> GetObject(string imageName)
    {
        var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!string.IsNullOrEmpty(currentUserId))
        {
            var user = await _userManager.FindByIdAsync(currentUserId);
            if (user == null)
                return NotFound();
            var image = _repository.GetImage(imageName, currentUserId);
            if (image == null)
            {
                return NotFound();
            }
    
            var response = await _bus.Request<GetObjectMinIoRequest, GetObjectMinIoReply>(new GetObjectRequestModel()
            {
                ObjectId = image.Oid, OrderId = Guid.NewGuid()
            });
            return File(response.Message.Data, image.ContentType, image.ImageName);
            //return Ok(response.Message);
        }
        else
            return NotFound();
    }

    [HttpDelete("{imageName}")]
    public async Task<IActionResult> DeleteObject(string imageName)
    {
        var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!string.IsNullOrEmpty(currentUserId))
        {
            var user = await _userManager.FindByIdAsync(currentUserId);
            if (user == null)
                return NotFound();
            var image = _repository.GetImage(imageName, currentUserId);
            if (image == null)
            {
                return NotFound();
            }
            var response = 
                await _bus.Request<DeleteObjectMinIoRequest, DeleteObjectMinIoReply>(new DeleteObjectRequestModel()
                    { ObjectId = image.Oid, OrderId = Guid.NewGuid()});
            _repository.DeleteImage(imageName, currentUserId);
            _repository.Save();
            return Ok(response.Message);
        }
        else
            return NotFound();
    }

    [HttpPost("{imageName}")]
    public async Task<IActionResult> PostObject(IFormFile file)
    {
        Response<PutObjectMinIoReply> response;
        var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!string.IsNullOrEmpty(currentUserId))
        {
            var user = await _userManager.FindByIdAsync(currentUserId);
            if (user == null)
                return NotFound();
            var imgId = _repository.CreateImage(file.FileName, currentUserId, file.ContentType);
            _repository.Save();
            using (var memoryStream = new MemoryStream())
            {
                await file.CopyToAsync(memoryStream);
                response = await _bus
                    .Request<PutObjectMinIoRequest, PutObjectMinIoReply>(new PutObjectRequestModel()
                        { ObjectId = Guid.NewGuid(), Data = memoryStream.ToArray(), OrderId = Guid.NewGuid() });
            }

            if (response.Message == null)
                return BadRequest();
            return Ok(response.ResponseAddress.ToString());
        }
        else
            return NotFound();
    }

    [HttpPost]
    public async Task<IActionResult> PostObjects(IEnumerable<IFormFile> files)
    {
        var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        Response<PutObjectsMinIoReply> responce;
        if (!string.IsNullOrEmpty(currentUserId))
        {
            var user = await _userManager.FindByIdAsync(currentUserId);
            if (user == null)
                return NotFound();
            var imagesId = _repository.CreateImages(files.Select(x => (x.FileName, x.ContentType)), currentUserId);
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
                        DataDictionary = imagesId.Zip(dataBytes, (k, v) => new { k, v })
                            .ToDictionary(x => x.k, x => x.v)
                    });
            }

            return Ok(response.Message);
        }
        else
            return NotFound();
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteObjects()
    {
        var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!string.IsNullOrEmpty(currentUserId))
        {
            var user = await _userManager.FindByIdAsync(currentUserId);
            if (user == null)
                return NotFound();
            var imgs = _repository.GetImages(currentUserId);
            if (!imgs.Any())
                return NotFound();
            var response = await _bus.Request<DeleteObjectsMinIoRequest, DeleteObjectsMinIoReply>(new DeleteObjectsRequestModel()
            {
                OrderId = Guid.NewGuid(),
                ObjectsId = imgs.Select(x => x.Oid),
            
            });
            _repository.DeleteImages(imgs.Select(x => x.ImageName), currentUserId);
            return Ok(response.Message);
        }
        else
            return NotFound();
    }

    [HttpGet]
    public async Task<IActionResult> GetObjects()
    {
        var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!string.IsNullOrEmpty(currentUserId))
        {
            var user = await _userManager.FindByIdAsync(currentUserId);
            if (user == null)
                return NotFound();
            var images = _repository.GetImages(currentUserId);
            if (!images.Any())
            {
                return NotFound();
            }

            var response = await _bus.Request<GetObjectsMinIoRequest, GetObjectsMinIoReply>(new GetObjectsRequestModel()
            {
                OrderId = Guid.NewGuid(),
                ObjectsId = images.Select(x => x.Oid)
            });
            return response.Message.DataDictionary
                .Select(x =>
                {
                    var contentType = images
                        .Where(y => y.Oid == x.Key)
                        .FirstOrDefault()?.ImageName;
                    return File(x.Value, contentType);
                });
        }
        else
            return NotFound();
    }
}