using StableDraw.Core.Models;
using Task = StableDraw.Core.Models.Task;

namespace StableDraw.Domain.Repositories;

public interface IUsersRepository
{
    void CreateGenerationFlow(GenerationFlow flow);
    void CreateSubscriber(Subscriber subscriber);
    void CreateUser(ApplicationUser user);
    void DeleteUser(ApplicationUser user);
    GenerationInfo? GetGenerationInfo(string id, DateTime date);
    Subscriber? GetSubscriber(string id);
    SubscriptionInfo? GetSubscriptionInfo(string id);
    ApplicationUser? GetUser(string id);
    IEnumerable<ApplicationUser> GetUsers();
    void Save();
}