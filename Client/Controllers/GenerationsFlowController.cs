using Microsoft.AspNetCore.Mvc;
using StableDraw.Core.Models;
using StableDraw.Domain.Repositories;

namespace CLI.Controllers;

[ApiController]
[Route("[controller]")]
public class GenerationsFlowController : Controller
{
    private readonly IUsersRepository _repository;

    public GenerationsFlowController(IUsersRepository repository)
    {
        _repository = repository;
    }

    [HttpPut]
    public IActionResult UpdateGenerationsFlow(GenerationFlow flow)
    {
        if (flow.UserId == null)
        {
            return BadRequest("The id should not be empty");
        }

        var user = _repository.GetUser(flow.UserId.ToString());

        if (user is null)
        {
            return BadRequest("The user has not been created");
        }

        _repository.CreateGenerationFlow(flow);
        _repository.Save();
        
        return Ok();
    }
}
