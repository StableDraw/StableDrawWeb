using CLI.Contracts;
using MassTransit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using StableDraw.Core.Models;
using StableDraw.Domain.Repositories;

namespace CLI.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]/")]
public class GenerationImageController : Controller
{
    private readonly IRequestClient<IMinIORequest> _clientRequest;
    private readonly ILogger<GenerationImageController> _logger;
    private readonly IApplicationRepository _repository;
    private readonly UserManager<ApplicationUser> _userManager;

    public GenerationImageController(
        IRequestClient<IMinIORequest> clientRequest, ILogger<GenerationImageController> logger, 
        IApplicationRepository repository, UserManager<ApplicationUser> userManager)
    {
        _clientRequest = clientRequest;
        _logger = logger;
        _repository = repository;
        _userManager = userManager;
    }
}