using Microsoft.AspNetCore.Mvc;
using StableDraw.Core.Models;
using StableDraw.Domain.Repositories;

namespace CLI.Controllers;

[ApiController]
[Route("[controller]")]
public class GenerationsController : Controller
{
    private readonly ITasksRepository _repository;

    public GenerationsController(ITasksRepository repository)
    {
        _repository = repository;
    }

    [HttpGet("{id}")]
    public IActionResult GetGeneration(Guid id, [FromQuery] int number)
    {
        if (id == Guid.Empty)
        {
            return BadRequest("The id should not be empty");
        }

        var generation = _repository.GetGeneration(id, number);

        if (generation is null)
        {
            return NotFound();
        }

        return Ok(generation);
    }

    [HttpPost]
    public IActionResult CreateGeneration(Generation newGeneration)
    {
        if (newGeneration.TaskId == Guid.Empty)
        {
            return BadRequest("The id should not be empty");
        }

        var task = _repository.GetTask(newGeneration.TaskId);

        if (task is null)
        {
            return BadRequest("The task has not been created");
        }

        if (task.Generations.Contains(newGeneration))
        {
            return BadRequest("The generation has already been created");
        }

        _repository.CreateGeneration(newGeneration);
        _repository.Save();

        return Ok(newGeneration);
    }
}
