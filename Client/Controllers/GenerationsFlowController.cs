using Microsoft.AspNetCore.Mvc;
using CLI.Models;
using CLI.Repositories;

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
        if (flow.UserId == string.Empty)
        {
            return BadRequest("The id should not be empty");
        }

        var user = _repository.GetUser(flow.UserId);

        if (user is null)
        {
            return BadRequest("The user has not been created");
        }

        _repository.CreateGenerationFlow(flow);
        _repository.Save();
        
        return Ok();
    }
}
