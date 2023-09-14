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
    private readonly NeuralBuilderSettings _neuralBuilderSettings;

    public NeuralController(
        IBus bus, ILogger<NeuralController> logger, 
        UserManager<ApplicationUser> userManager, IRepositoryWrapper repository, 
        IConfiguration configuration)
    {
        _bus = bus;
        _logger = logger;
        _userManager = userManager;
        _neuralBuilderSettings = new NeuralBuilderSettings()
        {
            Neurals = configuration.GetSection("Neurals").Get<Dictionary<string, dynamic>>()
        };
    }

    [HttpGet("neuralType")]
    public IActionResult GetNeuralInfo(string neuralType)
    {
        if (_neuralBuilderSettings.Neurals != null && 
            _neuralBuilderSettings.Neurals.TryGetValue(neuralType, out var param))
        {
            return Ok(param);
        }
        else
            return NotFound();
    }

    [HttpGet]
    public async Task<IActionResult> RunNeural(NeuralRequestModel requestModel)
    {
        var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!string.IsNullOrEmpty(currentUserId))
        {
            var user = await _userManager.FindByIdAsync(currentUserId);
            if (user != null)
                return NotFound();
            
            var request = new NeuralRequest()
            {
                OrderId = Guid.NewGuid(),
                NeuralType = requestModel.NeuralType,
                Caption = requestModel.Caption,
                Prompts = requestModel.Prompts,
                Parameters = requestModel.Parameters,
            };
            
            using (var memoryStream = new MemoryStream())
            {
                if (requestModel.ImagesInput != null)
                {
                    var dataBytes = requestModel.ImagesInput.Select(async x =>
                    {
                        await x.CopyToAsync(memoryStream);
                        return memoryStream.ToArray();
                    }).Select(x => x.Result);

                    request.ImagesInput = dataBytes;
                }
            }
            var response = await _bus.Request<NeuralRequest, NeuralReply>(request);
            return Ok(response.Message);
        }
        else
            return NotFound();
    }
}