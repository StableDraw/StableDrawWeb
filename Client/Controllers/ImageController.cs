using System.Security.Claims;
using MassTransit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StableDraw.Contracts.MInIoContracts.Replies;
using StableDraw.Contracts.MInIoContracts.Requests;
using StableDraw.Core.Models;
using StableDraw.Domain.UnitsOfWork;
using Exception = System.Exception;

namespace CLI.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]/")]
public class ImageController : Controller
{
    private readonly IBus _bus;
    private readonly ILogger<ImageController> _logger;
    private readonly IUnitOfWork _unitOfWork;

    public ImageController(
        ILogger<ImageController> logger, IUnitOfWork unitOfWork, IBus bus)
    {
        _logger = logger;
        _unitOfWork = unitOfWork;
        _bus = bus;
    }

    [HttpGet("{imageName}")]
    public async Task<IActionResult> GetObject(string imageName)
    {
        var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(currentUserId)) return NotFound();
        
        Response<GetObjectMinIoReply> response;
        Image? image;
        
        try
        {
            image = await _unitOfWork.Images.GetImage(imageName, currentUserId);
            if (image == null)
                return NotFound();
            
            response = await _bus.Request<GetObjectMinIoRequest, GetObjectMinIoReply>(new GetObjectRequestModel()
            {
                ObjectId = image.Oid,
                OrderId = NewId.NextGuid()
            });
            
            if(string.IsNullOrEmpty(response.Message.ErrorMsg))
                throw new Exception(response.Message.ErrorMsg);
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            return BadRequest(e.Message);
        }
        return Ok(new { image.ImageName, response.Message.Data });
    }

    [HttpDelete("{imageName}")]
    public async Task<IActionResult> DeleteObject(string imageName)
    {
        var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(currentUserId)) return NotFound();
        Response<DeleteObjectMinIoReply> response;
        try
        {
            var image = await _unitOfWork.Images.GetImage(imageName, currentUserId);
            if (image == null)
                return NotFound();
                
            await _unitOfWork.Images.DeleteImage(imageName, currentUserId);
                
            response =
                await _bus.Request<DeleteObjectMinIoRequest, DeleteObjectMinIoReply>(new DeleteObjectRequestModel()
                {
                    ObjectId = image.Oid,
                    OrderId = NewId.NextGuid()
                });
            
            if (!string.IsNullOrEmpty(response.Message.ErrorMsg))
                throw new Exception(response.Message.ErrorMsg);
            await _unitOfWork.CommitAsync();
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            return BadRequest(e.Message);
        }
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
        
        try
        {
            _unitOfWork.Images.Create(img);
            using var memoryStream = new MemoryStream(); 
            await file.CopyToAsync(memoryStream); 
            image = memoryStream.ToArray();
            var response = await _bus
                .Request<PutObjectMinIoRequest, PutObjectMinIoReply>(new PutObjectRequestModel()
                {
                    ObjectId = img.Oid,
                    Data = memoryStream.ToArray(),
                    OrderId = NewId.NextGuid()
                });
            
            if (!string.IsNullOrEmpty(response.Message.ErrorMsg))
                throw new Exception(response.Message.ErrorMsg);

            await _unitOfWork.CommitAsync();
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            return BadRequest(e.Message);
        }

        return Ok(new
        {
            ImageName = file.FileName,
            Bytes = image
        });
    }

    [HttpPost]
    public async Task<IActionResult> PostObjects(IEnumerable<IFormFile> files)
    {
        var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(currentUserId) && files.Any()) return NotFound();
        Response<PutObjectsMinIoReply> response;

        try
        {
            var imagesId = await _unitOfWork.Images.CreateImagesAsync(
                files.Select(x => (x.FileName, x.ContentType)), currentUserId);
                
            IEnumerable<byte[]> dataBytes;
            using (var memoryStream = new MemoryStream())
            {
                dataBytes = files.Select(async x =>
                {
                    await x.CopyToAsync(memoryStream);
                    return memoryStream.ToArray();
                }).Select(x => x.Result);    
            }
                    
            response =
                await _bus.Request<PutObjectsMinIoRequest, PutObjectsMinIoReply>(new PutObjectsRequestModel()
                {
                    OrderId = NewId.NextGuid(),
                    DataDictionary = imagesId.Zip(dataBytes, (k, v) => new { k, v })
                        .ToDictionary(x => x.k, x => x.v)
                });
            
            if (!string.IsNullOrEmpty(response.Message.ErrorMsg))
                throw new Exception(response.Message.ErrorMsg);

            await _unitOfWork.CommitAsync();
        }
        catch(Exception e)
        {
            _logger.LogError(e.Message);
            return BadRequest(e.Message);
        }

        return Ok(response.Message);
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteObjects()
    {
        var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(currentUserId)) return NotFound();
        var images = await _unitOfWork.Images.GetImagesAsync(currentUserId);
        if (!images.Any())
            return NotFound();

        Response<DeleteObjectsMinIoReply> response;
        
        try
        {
            await _unitOfWork.Images.DeleteImagesAsync(images.Select(x => x.ImageName), currentUserId);
            response = await _bus.Request<DeleteObjectsMinIoRequest, DeleteObjectsMinIoReply>(
                new DeleteObjectsRequestModel()
                {
                    OrderId = NewId.NextGuid(),
                    ObjectsId = images.Select(x => x.Oid),
                });

            if (!string.IsNullOrEmpty(response.Message.ErrorMsg))
                throw new Exception(response.Message.ErrorMsg);

            await _unitOfWork.CommitAsync();
        }
        catch(Exception e)
        {
            _logger.LogError(e.Message);
            return BadRequest(e.Message);
        }

        return Ok(response.Message);
    }

    [HttpGet]
    public async Task<IActionResult> GetObjects()
    {
        var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(currentUserId)) return NotFound();
        Response<GetObjectsMinIoReply> response;
        IEnumerable<Image> images;
        var cts = new CancellationTokenSource();
        
        images = await _unitOfWork.Images.GetImagesAsync(currentUserId).WaitAsync(cts.Token);
        if (!images.Any())
            return NotFound();

        try
        {
            response = await _bus.Request<GetObjectsMinIoRequest, GetObjectsMinIoReply>(new GetObjectsRequestModel() 
            { 
                OrderId = NewId.NextGuid(),
                ObjectsId = images.Select(x => x.Oid) 
            }, cts.Token);
        }
        catch (RequestTimeoutException e)
        {
            Console.WriteLine(e);
            throw new Exception(e.Message);
        }
        
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
        return NotFound();
    }

    protected override void Dispose(bool disposing)
    {
        _unitOfWork.Dispose();
        base.Dispose(disposing);
    }
}