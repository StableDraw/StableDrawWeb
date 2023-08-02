using Microsoft.AspNetCore.Mvc;
using StableDraw.Core.Models;
using StableDraw.Domain.Repositories;

namespace CLI.Controllers;

[ApiController]
[Route("[controller]")]
public class ResultsController : Controller
{
    private readonly ITasksRepository _repository;
    private readonly ILogger<ResultsController> _logger;

    public ResultsController(ITasksRepository repository, ILogger<ResultsController> logger)
    {
        _repository = repository;
        _logger = logger;
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
        if (_repository.GetResult(result.Oid) is not null)
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
        if (_repository.GetResult(result.Oid) is not null)
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
        if (_repository.GetResult(result.Oid) is not null)
        {
            return BadRequest();
        }

        _repository.CreateResult(result);
        _repository.Save();

        return Ok(result);
    }
}