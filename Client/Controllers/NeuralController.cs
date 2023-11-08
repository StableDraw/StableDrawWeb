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
using Newtonsoft.Json.Linq;
using FileR = System.IO.File;
using Org.BouncyCastle.Tls;

namespace CLI.Controllers;

[ApiController]
[Authorize]
[Route($"api/[controller]/")]
public class NeuralController : Controller
{
    private readonly IBus _bus;
    private readonly ILogger<NeuralController> _logger;
    private readonly NeuralBuilderSettings _neuralBuilderSettings;
    private readonly JObject _model;


    public NeuralController(
        IBus bus, ILogger<NeuralController> logger, 
        UserManager<ApplicationUser> userManager, 
        IConfiguration configuration)
    {
        _bus = bus;
        _logger = logger;
        _model = JObject.Parse(FileR.ReadAllText(@"neural.json"));
        _neuralBuilderSettings = new NeuralBuilderSettings()
        {
            Neurals = configuration.GetSection("Neurals").Get<Dictionary<string, IDictionary<string, string[]>>>()            
        };
    }

    [HttpGet("{neuralType}")]
    public IActionResult GetNeuralInfo(string neuralType)
    {
        //if (_neuralBuilderSettings.Neurals != null &&
        //    _neuralBuilderSettings.Neurals.TryGetValue(neuralType, out var param))
        //    return Ok(param);
        //return NotFound();

        //return Ok(_model["Neurals"].Children[neuralType].ToString());
        var res = _model["Neurals"][neuralType].ToString();
        return Ok(res);
    }

    [HttpGet("neuralList")]
    public IActionResult GetNeuralList()
    {
        //if (_neuralBuilderSettings.Neurals != null)
        //    return Ok(_neuralBuilderSettings.Neurals.Select(x => new
        //    {
        //        NeuralName = x.Key,
        //        Description = x.Value.FirstOrDefault(y => y.Key == "description").Value,
        //        ClientName = x.Value.FirstOrDefault(y => y.Key == "clientName").Value,
        //        ServerName = x.Value.FirstOrDefault(y => y.Key == "serverName").Value
        //    }));
        //return NotFound();

        var res = _model["Neurals"].Select(x => new 
        {
            NeuralName = x.Path.Split('.').Last().ToString(),
            Description = x.First["description"].ToString(),
            ClientName = x.First["clientName"].ToString(),
            ServerName = x.First["serverName"].ToString(),
        });

        return Ok(res);    
    }

    [HttpPost]
    public async Task<IActionResult> RunNeural([FromForm] NeuralRequestModel requestModel)
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

        if (requestModel.ImagesInput != null)
        {
            var dataBytes = requestModel.ImagesInput.Select(async x =>
            {
                await using var memoryStream = new MemoryStream();
                await x.CopyToAsync(memoryStream);
                return memoryStream.ToArray();
            }).Select(x => x.Result);
        
            request.ImagesInput = dataBytes;
        }
        var response = await _bus.Request<NeuralRequest, NeuralReply>(request, timeout: RequestTimeout.After(m: 15));
        if (!response.Message.ErrorMsg.IsNullOrEmpty()) 
                throw new Exception(response.Message.ErrorMsg);
        return Ok(response.Message);
    }
}