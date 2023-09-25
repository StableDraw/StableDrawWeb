using System.Collections;
using System.Security.Claims;
using CLI.Settings;
using Duende.IdentityServer.Extensions;
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
    private readonly NeuralBuilderSettings _neuralBuilderSettings;

    public NeuralController(
        IBus bus, ILogger<NeuralController> logger, 
        UserManager<ApplicationUser> userManager, 
        IConfiguration configuration)
    {
        _bus = bus;
        _logger = logger;
        _neuralBuilderSettings = new NeuralBuilderSettings()
        {
            Neurals = configuration.GetSection("Neurals").Get<Dictionary<string, IDictionary<string, string[]>>>()
        };
    }

    [HttpGet("{neuralType}")]
    public IActionResult GetNeuralInfo(string neuralType)
    {
        if (_neuralBuilderSettings.Neurals != null && 
            _neuralBuilderSettings.Neurals.TryGetValue(neuralType, out var param))
            return Ok(param);
        return NotFound();
    }

    [HttpGet("neuralList")]
    public IActionResult GetNeuralList()
    {
        if (_neuralBuilderSettings.Neurals != null)
            return Ok(_neuralBuilderSettings.Neurals.Select(x => new
            {
                NeuralName = x.Key,
                Description = x.Value.FirstOrDefault(y => y.Key == "description").Value,
                Icon = x.Value.FirstOrDefault(y => y.Key == "icon").Value
            }));
        return NotFound();
    }
    
    [HttpPost]
    public async Task<IActionResult> RunNeural(NeuralRequestModel requestModel)
    {
        var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(currentUserId)) return NotFound();
        var request = new NeuralRequest()
        {
            OrderId = NewId.NextGuid(),
            NeuralType = requestModel.NeuralType,
            Caption = requestModel.Caption,
            Prompts = requestModel.Prompts,
            Parameters = requestModel.Parameters,
        };

        try
        {
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
            if (!response.Message.ErrorMsg.IsNullOrEmpty())
                throw new Exception(response.Message.ErrorMsg);
            return Ok(response.Message);
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            return BadRequest(e.Message);
        }
    }
}