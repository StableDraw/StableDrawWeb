using StableDraw.Core.Models;

namespace StableDraw.Domain.Repositories;

public class FakePaymentRepository : IPaymentRepository
{
    private readonly PaymentDbContext _context;

    public FakePaymentRepository(PaymentDbContext context)
    {
        _context = context;
    }
    
    public void AddPayment(UserPayment userPayment)
    {
        _context.Add(userPayment);
    }

    public Guid GetPaymentIdByUserId(string userId)
    {
        return _context.UserPayments.Where(x => x.UserId == userId).Select(x => x.PaymentId).FirstOrDefault();
    }

    public bool IsSubscriber(string userId)
    {
        return true;
    }

    public void Save()
    {
        _context.SaveChanges();
    }

    public void UpdateUserToSubscriberAsync(string userId)
    {
        return;
    }
}