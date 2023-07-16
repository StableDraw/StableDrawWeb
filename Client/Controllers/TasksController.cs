using Microsoft.AspNetCore.Mvc;
using CLI.Repositories;

namespace CLI.Controllers;

[ApiController]
[Route("[Controller]")]
public class TasksController : Controller
{
    private readonly ITasksRepository _repository;
    private readonly IUsersRepository _usersRepository;

    public TasksController(ITasksRepository repository, IUsersRepository usersRepository)
    {
        _repository = repository;
        _usersRepository = usersRepository;
    }

    [HttpGet]
    public IActionResult GetTasks()
    {
        return Ok(_repository.GetTasks());
    }

    [HttpGet("{id}")]
    public IActionResult GetTask(Guid id)
    {
        if (id == Guid.Empty)
        {
            return BadRequest("The id should not be empty");
        }

        var task = _repository.GetTask(id);

        if (task is null)
        {
            return NotFound();
        }

        return Ok(task);
    }

    [HttpPost]
    public IActionResult CreateTask(Models.Task newTask)
    {
        if (newTask.Id == Guid.Empty || newTask.UserId == Guid.Empty)
        {
            return BadRequest("The id should not be empty");
        }

        var task = _repository.GetTask(newTask.Id);
        var user = _usersRepository.GetUser(newTask.UserId);

        if (task is not null)
        {
            return BadRequest("The task has already been created");
        }

        if (user is null)
        {
            return BadRequest("The user has not been created");
        }

        _repository.CreateTask(newTask);
        _repository.Save();

        return Ok(newTask);
    }
}
