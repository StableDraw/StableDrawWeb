using CLI.Models;

namespace CLI.Repositories;

public interface IUsersRepository
{
    void CreateGenerationFlow(GenerationFlow flow);
    void CreateSubscriber(Subscriber subscriber);
    void CreateUser(User user);
    void DeleteUser(User user);
    GenerationInfo? GetGenerationInfo(Guid id, DateTime date);
    Subscriber? GetSubscriber(Guid id);
    SubscriptionInfo? GetSubscriptionInfo(Guid id);
    User? GetUser(Guid id);
    IEnumerable<User> GetUsers();
    void Save();
}
