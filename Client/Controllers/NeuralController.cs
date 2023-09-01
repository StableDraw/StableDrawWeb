using CLI.Settings;
using MassTransit;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using StableDraw.Core.Models;
using StableDraw.Domain.Repositories;

namespace CLI.Controllers;

[ApiController]
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

    [HttpPost]
    public async Task<IActionResult> PostNeuralToRun(INeuralObjectRequest request)
    {
        if (request is NeuralImpationModel impationModel)
        {
            
        }
    }
}