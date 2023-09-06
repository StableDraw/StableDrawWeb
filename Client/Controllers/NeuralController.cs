using System.Security.Claims;
using CLI.Settings;
using MassTransit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using StableDraw.Contracts.NeuralContracts.Replies;
using StableDraw.Contracts.NeuralContracts.Requests;
using StableDraw.Core.Models;
using StableDraw.Domain.Repositories;

namespace CLI.Controllers;

[ApiController]
[Authorize]
[Route($"api/[controller]/")]
public class NeuralController : Controller
{
    private readonly IBus _bus;
    private readonly ILogger<NeuralController> _logger;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IApplicationRepository _repository;
    private readonly NeuralBuilderSettings _neuralBuilderSettings;

    public NeuralController(IBus bus, ILogger<NeuralController> logger, UserManager<ApplicationUser> userManager, IApplicationRepository repository, NeuralBuilderSettings neuralBuilderSettings)
    {
        _bus = bus;
        _logger = logger;
        _userManager = userManager;
        _repository = repository;
        _neuralBuilderSettings = neuralBuilderSettings;
    }

    [HttpGet]
    public async Task<string> GetNeuralInfo()
    {
        return await Task.FromResult(_neuralBuilderSettings.Properties);
    }

    [HttpGet("img")]
    public async Task<IActionResult> GenerateImages(NeuralRequestModel requestModel)
    {
        var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(currentUserId))
        {
            var user = await _userManager.FindByIdAsync(currentUserId);
            if (user != null)
                return NotFound();
            
            switch (requestModel.NeuralType)
            {
                case "colorizer":
                case "delete_background":
                case "upscaler":
                case "image_to_image":
                case "stylization":
                case "image_fusion":
                case "inpainting":
                case "text_to_image":
                    var request = new NeuralRequest()
                    {
                        NeuralType = requestModel.NeuralType,
                        Caption = requestModel.Caption,
                        Prompts = requestModel.Prompts,
                        Parameters = requestModel.Parameters
                    };
                    if (requestModel.ImagesInput != null && requestModel.ImagesInput.Any())
                    {
                        using (var memoryStream = new MemoryStream())
                        {
                            var dataBytes = requestModel.ImagesInput.Select(async x =>
                            {
                                await x.CopyToAsync(memoryStream);
                                return memoryStream.ToArray();
                            }).Select(x => x.Result);
                            request.ImagesInput = dataBytes;
                        }
                    }

                    request.OrderId = Guid.NewGuid();
                    var responseImg = 
                        await _bus.Request<NeuralRequest, NeuralImagesReply>(request);
                    return Ok(responseImg.Message);
                case "image_captioning":
                case "image_classification":
                case "translation":
                    var responseInfo =
                        await _bus.Request<NeuralRequestModel, NeuralInfoReply>(requestModel);
                    return Ok(responseInfo.Message);
                default:
                    return NotFound();
            }
        }
        else 
            return NotFound();
    }

    // [HttpGet("info_gen")]
    // public async Task<IActionResult> GenerateInfo(NeuralRequest request)
    // {
    //     var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
    //     if (string.IsNullOrEmpty(currentUserId))
    //     {
    //         var user = await _userManager.FindByIdAsync(currentUserId);
    //         if (user != null)
    //             return NotFound();
    //         switch (request.NeuralType)
    //         {
    //             case "translation":
    //                 break;
    //             case "text_to_image":
    //                 break;
    //             default:
    //                 return NotFound();
    //         }
    //     }
    //     else
    //         return NotFound();
    // }
}