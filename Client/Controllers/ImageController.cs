using System.Security.Claims;
using MassTransit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using StableDraw.Contracts.MInIoContracts.Replies;
using StableDraw.Contracts.MInIoContracts.Requests;
using StableDraw.Core.Models;
using StableDraw.Domain.Repositories;
using StableDraw.Domain.UnitsOfWork;

namespace CLI.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]/")]
public class ImageController : Controller
{
    private readonly IBus _bus;
    private readonly ILogger<ImageController> _logger;

    private readonly IRepositoryWrapper _repository;

    private readonly IUnitOfWork _unitOfWork;

    //private readonly IApplicationRepository _repository;
    private readonly UserManager<ApplicationUser> _userManager;

    public ImageController(
        ILogger<ImageController> logger,
        IRepositoryWrapper repository, IUnitOfWork unitOfWork, UserManager<ApplicationUser> userManager, IBus bus)
    {
        _logger = logger;

        _repository = repository;
        _unitOfWork = unitOfWork;

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
            var image = await _repository.ImageRepository.GetImage(imageName, currentUserId);
            if (image == null)
                return NotFound();

            var response = await _bus.Request<GetObjectMinIoRequest, GetObjectMinIoReply>(new GetObjectRequestModel()
            {
                ObjectId = image.Oid,
                OrderId = NewId.NextGuid()
            });
            return Ok(new { image.ImageName, response.Message.Data });
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
            var image = await _repository.ImageRepository.GetImage(imageName, currentUserId);
            if (image == null)
            {
                return NotFound();
            }

            var response =
                await _bus.Request<DeleteObjectMinIoRequest, DeleteObjectMinIoReply>(new DeleteObjectRequestModel()
                {
                    ObjectId = image.Oid,
                    OrderId = NewId.NextGuid()
                });
            await _repository.ImageRepository.DeleteImage(imageName, currentUserId);
            await _repository.SaveAsync();
            return Ok(response.Message);
        }
        else
            return NotFound();
    }

    [HttpPost("{imageName}")]
    public async Task<IActionResult> PostObject(IFormFile file)
    {
        var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!string.IsNullOrEmpty(currentUserId))
        {
            var user = await _userManager.FindByIdAsync(currentUserId);
            if (user == null) return NotFound();

            var img = new Image()
            {
                ImageName = file.FileName,
                ContentType = file.ContentType,
                UserId = currentUserId
            };

            byte[] image = Array.Empty<byte>();

            using (_unitOfWork)
            {
                _unitOfWork.Images.Create(img);

                try
                {
                    Response<PutObjectMinIoReply> response;

                    using var memoryStream = new MemoryStream();
                    await file.CopyToAsync(memoryStream);
                    image = memoryStream.ToArray();
                    response = await _bus
                        .Request<PutObjectMinIoRequest, PutObjectMinIoReply>(new PutObjectRequestModel()
                        {
                            ObjectId = img.Oid,
                            Data = memoryStream.ToArray(),
                            OrderId = NewId.NextGuid()
                        });

                    if (response.Message == null)
                        return BadRequest();

                    await _unitOfWork.CommitAsync();
                }
                catch(Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }

            return Ok(new
            {
                ImageName = file.FileName,
                Bytes = image
            });
        }
        else
            return NotFound();
    }

    [HttpPost]
    public async Task<IActionResult> PostObjects(IEnumerable<IFormFile> files)
    {
        var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!string.IsNullOrEmpty(currentUserId))
        {
            var user = await _userManager.FindByIdAsync(currentUserId);
            if (user == null)
                return NotFound();
            var imagesId =
                await _repository.ImageRepository.CreateImagesAsync(files.Select(x => (x.FileName, x.ContentType)),
                    currentUserId);
            await _repository.SaveAsync();
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
                        OrderId = NewId.NextGuid(),
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
            var images = await _repository.ImageRepository.GetImagesAsync(currentUserId);
            if (!images.Any())
                return NotFound();
            var response = await _bus.Request<DeleteObjectsMinIoRequest, DeleteObjectsMinIoReply>(
                new DeleteObjectsRequestModel()
                {
                    OrderId = NewId.NextGuid(),
                    ObjectsId = images.Select(x => x.Oid),
                });
            await _repository.ImageRepository.DeleteImagesAsync(images.Select(x => x.ImageName), currentUserId);
            await _repository.SaveAsync();
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
            var images = await _repository.ImageRepository.GetImagesAsync(currentUserId);
            if (!images.Any())
                return NotFound();

            var response = await _bus.Request<GetObjectsMinIoRequest, GetObjectsMinIoReply>(new GetObjectsRequestModel()
            {
                OrderId = NewId.NextGuid(),
                ObjectsId = images.Select(x => x.Oid)
            });
            if (response.Message.DataDictionary != null)
                return Ok(response.Message.DataDictionary.Select(dict =>
                {
                    var img = images.FirstOrDefault(img => img.Oid == dict.Key);
                    return new
                    {
                        ImageName = img?.ImageName,
                        Bytes = dict.Value
                    };
                }));
            else
                return NotFound();
        }
        else
            return NotFound();
    }

    protected override void Dispose(bool disposing)//освобождаем ресурсы
    {
        _unitOfWork.Dispose();
        base.Dispose(disposing);
    }
}