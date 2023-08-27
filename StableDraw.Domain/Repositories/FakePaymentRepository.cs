using StableDraw.Core.Models;

namespace StableDraw.Domain.Repositories;

public class FakePaymentRepository : IPaymentRepository
{
    public void AddPayment(Payment payment, Guid userId)
    {
        return;
    }

    public Guid GetPaymentIdByUserId(Guid userId)
    {
        return new Guid("2c789018-000f-5000-9000-19072706b7e1");
    }

    public bool IsSubscriber(Guid userId)
    {
        return false;
    }

    public void Save()
    {
        return;
    }

    public void UpdateUserToSubscriberAsync(Guid userId)
    {
        return;
    }
}