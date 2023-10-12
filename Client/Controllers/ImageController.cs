using System.Security.Claims;
using MassTransit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StableDraw.Contracts.MInIoContracts.Replies;
using StableDraw.Contracts.MInIoContracts.Requests;
using StableDraw.Core.Models;
using Exception = System.Exception;

namespace CLI.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]/")]
public class ImageController : Controller
{
    private readonly IBus _bus;
    private readonly ILogger<ImageController> _logger;

    public ImageController(
        ILogger<ImageController> logger, IBus bus)
    {
        _logger = logger;
        _bus = bus;
    }

    [HttpGet("{imageName}")]
    public async Task<IActionResult> GetObject(string imageName)
    {
        var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(currentUserId)) return NotFound();
        Response<GetObjectMinIoReply> response =
            await _bus.Request<GetObjectMinIoRequest, GetObjectMinIoReply>(new GetObjectRequestModel()
            {
                UserId = Guid.Parse(currentUserId),
                ImageName = imageName,
                OrderId = NewId.NextGuid()
            });

        if (string.IsNullOrEmpty(response.Message.ErrorMsg))
            throw new Exception(response.Message.ErrorMsg);

        return Ok(new { response.Message.ImageName, response.Message.Data });
    }

    [HttpDelete("{imageName}")]
    public async Task<IActionResult> DeleteObject(string imageName)
    {
        var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(currentUserId)) return NotFound();
        Response<DeleteObjectMinIoReply> response =
                await _bus.Request<DeleteObjectMinIoRequest, DeleteObjectMinIoReply>(new DeleteObjectRequestModel()
                {
                    UserId = Guid.Parse(currentUserId),
                    ImageName = imageName,
                    OrderId = NewId.NextGuid()
                });

        if (!string.IsNullOrEmpty(response.Message.ErrorMsg))
            throw new Exception(response.Message.ErrorMsg);

        return Ok(response.Message);
    }

    [HttpPost("{imageName}")]
    public async Task<IActionResult> PostObject(IFormFile file)
    {
        var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(currentUserId)) return NotFound();

        var img = new Image()
        {
            ImageName = file.FileName,
            ContentType = file.ContentType,
            UserId = currentUserId
        };

        byte[] image;

        using var memoryStream = new MemoryStream();
        await file.CopyToAsync(memoryStream);
        image = memoryStream.ToArray();
        var response = await _bus
            .Request<PutObjectMinIoRequest, PutObjectMinIoReply>(new PutObjectRequestModel()
            {
                UserId = Guid.Parse(currentUserId),
                ImageName = file.FileName,
                Data = memoryStream.ToArray(),
                OrderId = NewId.NextGuid()
            });

        if (!string.IsNullOrEmpty(response.Message.ErrorMsg))
            throw new Exception(response.Message.ErrorMsg);

        return Ok(new
        {
            response.Message.ImageName,
            Bytes = image
        });
    }

    [HttpPost]
    public async Task<IActionResult> PostObjects(IEnumerable<IFormFile> files)
    {
        var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (string.IsNullOrEmpty(currentUserId) || !files.Any()) return NotFound();

        var imagesNames = from file in files
                          select file.FileName;

        IEnumerable<byte[]> dataBytes;
        using (var memoryStream = new MemoryStream())
        {
            dataBytes = files.Select(async x =>
            {
                await x.CopyToAsync(memoryStream);
                return memoryStream.ToArray();
            }).Select(x => x.Result);
        }

        Response<PutObjectsMinIoReply> response =
                await _bus.Request<PutObjectsMinIoRequest, PutObjectsMinIoReply>(new PutObjectsRequestModel()
                {
                    OrderId = NewId.NextGuid(),
                    UserId = Guid.Parse(currentUserId),
                    DataDictionary = imagesNames.Zip(dataBytes, (k, v) => new { k, v })
                        .ToDictionary(x => x.k, x => x.v)
                });

        if (!string.IsNullOrEmpty(response.Message.ErrorMsg))
            throw new Exception(response.Message.ErrorMsg);

        return Ok(response.Message);
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteObjects()
    {
        var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(currentUserId)) return NotFound();

        Response<DeleteObjectsMinIoReply> response = await _bus.Request<DeleteObjectsMinIoRequest, DeleteObjectsMinIoReply>(
                new DeleteObjectsRequestModel()
                {
                    OrderId = NewId.NextGuid(),
                    UserId = Guid.Parse(currentUserId)
                });

        if (!string.IsNullOrEmpty(response.Message.ErrorMsg))
            throw new Exception(response.Message.ErrorMsg);

        return Ok(response.Message);
    }

    [HttpGet]
    public async Task<IActionResult> GetObjects()
    {
        var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(currentUserId)) return NotFound();

        IEnumerable<Image> images;
        var cts = new CancellationTokenSource();

        Response<GetObjectsMinIoReply> response = await _bus.Request<GetObjectsMinIoRequest, GetObjectsMinIoReply>(new GetObjectsRequestModel()
        {
            OrderId = NewId.NextGuid(),
            UserId = Guid.Parse(currentUserId)
        }, cts.Token);

        if (response.Message.DataDictionary != null)
            return Ok(response.Message.DataDictionary.Select(dict =>
            {
                return new
                {
                    ImageName = dict.Key,
                    Bytes = dict.Value
                };
            }));
        return NotFound();
    }
}