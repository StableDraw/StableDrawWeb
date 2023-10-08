using System.Security.Claims;
using System.Text;
using System.Text.Encodings.Web;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using StableDraw.Application.Commands.Auth;
using StableDraw.Application.Commands.User;
using StableDraw.Infrastructure.DTOs;
using StableDraw.Infrastructure.Identity;

namespace StableDraw.WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly IEmailSender _emailSender;
    private readonly UserManager<ApplicationUser> _userManager;

    public AuthController(IMediator mediator, IEmailSender emailSender, UserManager<ApplicationUser> userManager)
    {
        _mediator = mediator;
        _emailSender = emailSender;
        _userManager = userManager;
    }
    
    [HttpPost("Login")]
    [ProducesDefaultResponseType(typeof(AuthResponseDto))]
    public async Task<IActionResult> Login([FromBody] AuthCommand command)
    {
        return Ok(await _mediator.Send(command));
    }

    [HttpPost("Register")]
    public async Task<IActionResult> Register([FromBody] CreateUserCommand command)
    {
        return Ok(await _mediator.Send(command));
    }

    [HttpGet("ConfirmEmail")]
    public async Task<IActionResult> ConfirmEmail([FromQuery] ConfirmEmailCommand command)
    {
        return Ok(await _mediator.Send(command));
    }
}