using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using StableDraw.Application.Commands.Auth;
using StableDraw.Application.Commands.User;
using StableDraw.Infrastructure.DTOs;
using StableDraw.Infrastructure.Identity;
using StableDraw.WebApi.Services;

namespace StableDraw.WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly GoogleRecaptchaService _googleRecaptchaService;

    public AuthController(IMediator mediator, GoogleRecaptchaService googleRecaptchaService)
    {
        _mediator = mediator;
        _googleRecaptchaService = googleRecaptchaService;
    }
    
    [HttpPost("Login")]
    [ProducesDefaultResponseType(typeof(AuthResponseDto))]
    public async Task<IActionResult> Login([FromBody] AuthCommand command, string token)
    {
        var recaptcha = _googleRecaptchaService.Verefication(token);
        if (recaptcha.Result.success || !(recaptcha.Result.score <= 0.5)) return Ok(await _mediator.Send(command));
        throw new ValidationException("Капча не пройдена, подождите 2 минуты, пожалуйста");
    }

    [HttpPost("Register")]
    public async Task<IActionResult> Register([FromBody] CreateUserCommand command, string token)
    {
        var recaptcha = _googleRecaptchaService.Verefication(token);
        if (recaptcha.Result.success || !(recaptcha.Result.score <= 0.5)) return Ok(await _mediator.Send(command));
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        throw new ValidationException("Капча не пройдена, подождите 2 минуты, пожалуйста");
    }

    [HttpPost("ForgotPassword")]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordCommand command, string token)
    {
        var recaptcha = _googleRecaptchaService.Verefication(token);
        if (recaptcha.Result.success || !(recaptcha.Result.score <= 0.5)) return Ok(await _mediator.Send(command));
        throw new ValidationException("Капча не пройдена, подождите 2 минуты, пожалуйста");
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