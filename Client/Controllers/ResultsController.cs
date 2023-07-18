using Microsoft.AspNetCore.Mvc;
using CLI.Models;
using CLI.Repositories;

namespace CLI.Controllers;

[ApiController]
[Route("[controller]")]
public class ResultsController : Controller
{
    private readonly ITasksRepository _repository;

    public ResultsController(ITasksRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public IActionResult GetResults()
    {
        return Ok(_repository.GetResults());
    }

    [HttpGet("{id}")]
    public IActionResult GetResult(Guid id)
    {
        if (id == Guid.Empty)
        {
            return BadRequest();
        }

        var result = _repository.GetResult(id);

        if (result is null)
        {
            return NotFound();
        }

        return Ok(result);
    }

    [HttpPost("images")]
    public IActionResult CreateResult(ImageResult result)
    {
        if (_repository.GetResult(result.Id) is not null)
        {
            return BadRequest();
        }

        _repository.CreateResult(result);
        _repository.Save();

        return Ok(result);
    }

    [HttpPost("captions")]
    public IActionResult CreateResult(CaptionResult result)
    {
        if (_repository.GetResult(result.Id) is not null)
        {
            return BadRequest();
        }

        _repository.CreateResult(result);
        _repository.Save();

        return Ok(result);
    }

    [HttpPost("params")]
    public IActionResult CreateResult(ParamsResult result)
    {
        if (_repository.GetResult(result.Id) is not null)
        {
            return BadRequest();
        }

        _repository.CreateResult(result);
        _repository.Save();

        return Ok(result);
    }
}