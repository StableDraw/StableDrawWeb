using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using StableDraw.Application.Commands.Auth;
using StableDraw.Application.Commands.User;
using StableDraw.Infrastructure.DTOs;
using StableDraw.Infrastructure.Services;

namespace StableDraw.WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IMediator _mediator;

    public AuthController(IMediator mediator)
    {
        _mediator = mediator;
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

    [HttpPost("ForgotPassword")]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordCommand command, string token)
    {
        return Ok(await _mediator.Send(command));
    }

    [HttpPost("ResetPassword")]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordCommand command)
    {
        return Ok(await _mediator.Send(command));
    }
    
    [HttpPost("ConfirmEmail")]
    public async Task<IActionResult> ConfirmEmail([FromBody] ConfirmEmailCommand command)
    {
        return Ok(await _mediator.Send(command));
    }
}