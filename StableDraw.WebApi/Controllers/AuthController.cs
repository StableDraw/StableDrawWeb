using MediatR;
using Microsoft.AspNetCore.Mvc;
using StableDraw.Infrastructure.DTOs;

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
}