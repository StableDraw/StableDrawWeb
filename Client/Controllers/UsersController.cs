using Microsoft.AspNetCore.Mvc;
using StableDraw.Core.Models;
using StableDraw.Core.Models.DTOs;
using StableDraw.Domain.Repositories;

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
    public IActionResult DeleteUser(string id)
    {
        if (id == string.Empty)
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
    public IActionResult GetUser(string id)
    {
        if (id == string.Empty)
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
    public IActionResult GetUserInfo(string id)
    {
        if (id == string.Empty)
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
    public IActionResult CreateUser(ApplicationUser newUser)
    {
        if (newUser.Id == string.Empty)
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
        
    private static User UserToDTO(ApplicationUser user, SubscriptionInfo? subscriptionInfo, GenerationInfo? generationInfo)
    {
        return new User()
        {
            Oid = new Guid(user.Id),
            IsDesignAcces = true,
            GenerationInfo = generationInfo,
            SubscriptionInfo = subscriptionInfo
        };
    }
}
