using System.Security.Claims;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StableDraw.Application.Commands.ObjectStorage;
using StableDraw.Application.Queries.ObjectStorage;

namespace StableDraw.WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class ObjectStorageController : ControllerBase
{
    private readonly IMediator _mediator;

    public ObjectStorageController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("Post")]
    public async Task<IActionResult> PostObjects([FromBody] PutObjectsCommand command)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        command.UserId = userId;
        return Ok(await _mediator.Send(command));
    }

    [HttpDelete("Delete")]
    public async Task<IActionResult> DeleteObjects([FromBody] DeleteObjectsCommand command)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        command.UserId = userId;
        return Ok(await _mediator.Send(command));
    }

    [HttpGet("Get")]
    public async Task<IActionResult> GetObjects([FromQuery] GetObjectsQuery query)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        query.UserId = userId;
        return Ok(await _mediator.Send(query));
    }
}