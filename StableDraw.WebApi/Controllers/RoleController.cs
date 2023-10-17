using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StableDraw.Application.Commands.Role;
using StableDraw.Application.Queries.Role;
using StableDraw.Infrastructure.DTOs;

namespace StableDraw.WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
//[AllowAnonymous]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
[Authorize(Roles = "Admin, Management")]
public class RoleController : ControllerBase
{
    private readonly IMediator _mediator;

    public RoleController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("Create")]
    [ProducesDefaultResponseType(typeof(int))]

    public async Task<ActionResult> CreateRoleAsync(RoleCreateCommand command)
    {
        return Ok(await _mediator.Send(command));
    }

    [HttpGet("GetAll")]
    [ProducesDefaultResponseType(typeof(List<RoleResponseDto>))]
    public async Task<IActionResult> GetRoleAsync()
    {
        return Ok(await _mediator.Send(new GetRoleQuery()));
    }


    [HttpGet("{id}")]
    [ProducesDefaultResponseType(typeof(RoleResponseDto))]
    public async Task<IActionResult> GetRoleByIdAsync(string id)
    {
        return Ok(await _mediator.Send(new GetRoleByIdQuery() { RoleId = id }));
    }

    [HttpDelete("Delete/{id}")]
    [ProducesDefaultResponseType(typeof(int))]
    public async Task<IActionResult> DeleteRoleAsync(string id)
    {
        return Ok(await _mediator.Send(new DeleteRoleCommand()
        {
            RoleId = id
        }));
    }

    [HttpPut("Edit/{id}")]
    [ProducesDefaultResponseType(typeof(int))]
    public async Task<ActionResult> EditRole(string id, [FromBody] UpdateRoleCommand command)
    {
        if (id == command.Id)
        {
            var result = await _mediator.Send(command);
            return Ok(result);
        }
        else
        {
            return BadRequest();
        }
    }
}