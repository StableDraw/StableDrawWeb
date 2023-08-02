using Microsoft.AspNetCore.Mvc;
using StableDraw.Core.Models;
using StableDraw.Domain.Repositories;

namespace CLI.Controllers;

[ApiController]
[Route("[controller]")]
public class SubscribersController : Controller
{
    private readonly IUsersRepository _repository;

    public SubscribersController(IUsersRepository repository)
    {
        _repository = repository;
    }

    [HttpPut]
    public IActionResult UpdateSubscription(Subscriber newSubscriber)
    {
        if (newSubscriber.Id == string.Empty)
        {
            return BadRequest("The id should not be empty");
        }

        var user = _repository.GetUser(newSubscriber.Id);
        var subscriber = _repository.GetSubscriber(newSubscriber.Id);

        if (user is null)
        {
            return BadRequest("The user has not been created");
        }

        if (subscriber is null)
        {
            _repository.CreateSubscriber(newSubscriber);
            _repository.Save();
        
            return Ok(newSubscriber);
        }

        subscriber.Expiration = newSubscriber.Expiration;
        
        _repository.Save();

        return Ok(subscriber);
    }
}