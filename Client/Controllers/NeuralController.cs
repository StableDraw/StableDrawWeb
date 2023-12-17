using System.Security.Claims;
using CLI.Settings;
using Duende.IdentityServer.Extensions;
using MassTransit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using StableDraw.Contracts.NeuralContracts.Replies;
using StableDraw.Contracts.NeuralContracts.Requests;
using StableDraw.Core.Models;
using Newtonsoft.Json.Linq;
using FileR = System.IO.File;
using StableDraw.Domain.Data.Identity;

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
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly ApplicationDbContext _context;

    public NeuralController(
        IBus bus, ILogger<NeuralController> logger, 
        UserManager<ApplicationUser> userManager, 
        IConfiguration configuration, ApplicationDbContext context)
    {
        _bus = bus;
        _logger = logger;
        _model = JObject.Parse(FileR.ReadAllText(@"neural.json"));
        _userManager = userManager;
        _context = context;
        _neuralBuilderSettings = new NeuralBuilderSettings()
        {
            Neurals = configuration.GetSection("Neurals").Get<Dictionary<string, IDictionary<string, string[]>>>()            
        };
    }

    [HttpGet("{neuralType}")]
    public IActionResult GetNeuralInfo(string neuralType)
    {        
        var res = _model["Neurals"][neuralType].ToString();
        return Ok(res);
    }

    [HttpGet("neuralList")]
    public IActionResult GetNeuralList()
    {       
        var res = _model["Neurals"].Select(x => new 
        {
            NeuralName = x.Path.Split('.').Last().ToString(),
            Description = x.First["description"].ToString(),
            ClientName = x.First["clientName"].ToString(),
            ServerName = x.First["serverName"].ToString(),
						ImageCount = x.First["image_count_input"].ToString(),
        });

        return Ok(res);    
    }

    [HttpPost]
    public async Task<IActionResult> RunNeural([FromForm] NeuralRequestModel requestModel)
    {
        var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(currentUserId)) return NotFound();
        var user = await _userManager.FindByIdAsync(currentUserId);
        //if (user.GenerationCount > 10) return BadRequest("User has exhausted the number of generations for the day");
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
        //user.GenerationCount++;
        //_context.SaveChanges();
        return Ok(response.Message);
    }
}