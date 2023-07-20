using CLI.Data;
using CLI.Models;

namespace CLI.Repositories;

public class UsersRepository : IUsersRepository
{
    private readonly UserContext _context;

    public UsersRepository(UserContext context)
    {
        _context = context;
    }

    public void CreateGenerationFlow(GenerationFlow generationFlow)
    {
        _context.GenerationFlows.Add(generationFlow);
    }

    public void CreateSubscriber(Subscriber subscriber)
    {
        _context.Subscribers.Add(subscriber);
    }

    public void CreateUser(ApplicationUser user)
    {
        _context.Users.Add(user);
    }

    public void DeleteUser(ApplicationUser user)
    {
        _context.Users.Remove(user);
    }

    public GenerationInfo? GetGenerationInfo(string id, DateTime date)
    {
        return _context.GenerationFlows
            .Where(g => g.UserId == id && g.Date <= date)
            .GroupBy(g => g.UserId)
            .Select(g => new GenerationInfo()
            {
                Balance = g.Sum(b => b.Flow),
                DateLastUsed = g.Max(b => b.Date)
            })
            .FirstOrDefault();
    }

    public Subscriber? GetSubscriber(string id)
    {
        return _context.Subscribers.Where(s => s.Id == id).FirstOrDefault();
    }

    public SubscriptionInfo? GetSubscriptionInfo(string id)
    {
        return _context.Subscribers
            .Where(s => s.Id == id)
            .Select(s => new SubscriptionInfo()
            {
                Expiration = s.Expiration
            })
            .FirstOrDefault();
    }

    public ApplicationUser? GetUser(string id)
    {
        return _context.Users.Where(u => u.Id == id).FirstOrDefault();
    }

    public IEnumerable<ApplicationUser> GetUsers()
    {
        return _context.Users.ToList();
    }

    public void Save()
    {
        _context.SaveChanges();
    }
}