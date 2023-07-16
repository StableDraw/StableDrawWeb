using Microsoft.AspNetCore.Mvc;
using CLI.Models;
using CLI.Repositories;

namespace CLI.Controllers;

[ApiController]
[Route("[controller]")]
public class UsersController : Controller
{
    private readonly IUsersRepository _repository;

    public UsersController(IUsersRepository repository)
    {
        _repository = repository;
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteUser(Guid id)
    {
        if (id == Guid.Empty)
        {
            return BadRequest("The id should not be empty");
        }

        var user = _repository.GetUser(id);

        if (user is null)
        {
            return NotFound();
        }

        _repository.DeleteUser(user);
        _repository.Save();

        return Ok();
    }

    [HttpGet]
    public IActionResult GetUsers()
    {
        return Ok(_repository.GetUsers());
    }

    [HttpGet("{id}")]
    public IActionResult GetUser(Guid id)
    {
        if (id == Guid.Empty)
        {
            return BadRequest("The id should not be empty");
        }

        var user = _repository.GetUser(id);

        if (user is null)
        {
            return NotFound();
        }

        return Ok(user);
    }

    [HttpGet("{id}/info")]
    public IActionResult GetUserInfo(Guid id)
    {
        if (id == Guid.Empty)
        {
            return BadRequest("The id should not be empty");
        }

        var user = _repository.GetUser(id);

        if (user is null)
        {
            return NotFound();
        }

        var generationInfo = _repository.GetGenerationInfo(id, DateTime.Now);
        var subscriptionInfo = _repository.GetSubscriptionInfo(id);

        return Ok(UserToDTO(user, subscriptionInfo, generationInfo));
    }

    [HttpPost]
    public IActionResult CreateUser(User newUser)
    {
        if (newUser.Id == Guid.Empty)
        {
            return BadRequest("The id should not be empty");
        }
        
        var user = _repository.GetUser(newUser.Id);

        if (user is not null)
        {
            return BadRequest("The user has already been created");
        }
        
        _repository.CreateUser(newUser);
        _repository.Save();

        return Ok(newUser);
    }
        
    private Models.DTOs.User UserToDTO(User user, SubscriptionInfo? subscriptionInfo, GenerationInfo? generationInfo)
    {
        return new Models.DTOs.User()
        {
            Id = user.Id,
            IsDesignAcces = true,
            GenerationInfo = generationInfo,
            SubscriptionInfo = subscriptionInfo
        };
    }
}
