using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StableDraw.Application.Queries.Neurals;

namespace StableDraw.WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class NeuralController : ControllerBase
{
    private readonly IMediator _mediator;
    
    public NeuralController(IMediator mediator)
    {
        _mediator = mediator;
    }
    
     [HttpGet("NeuralInfo")]
    public async Task<IActionResult> GetNeuralInfo([FromQuery] GetNeuralInfoQuery query)
    {
        return Ok(await _mediator.Send(query));
    }

    [HttpGet("NeuralList")]
    public async Task<IActionResult> GetNeuralList([FromQuery] GetNeuralListQuery query)
    {
        return Ok(await _mediator.Send(query));
    }

    [HttpGet("Generate")]
    public async Task<IActionResult> RunNeural([FromQuery] GetNeuralGenerateQuery query)
    {
        return Ok(await _mediator.Send(query));
    }
}