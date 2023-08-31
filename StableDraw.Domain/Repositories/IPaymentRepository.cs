using StableDraw.Core.Models;

namespace StableDraw.Domain.Repositories;

public interface IPaymentRepository
{
    void AddPayment(UserPayment userPayment);
    Guid GetPaymentIdByUserId(string userId);
    bool IsSubscriber(string userId);
    void Save();
    void UpdateUserToSubscriberAsync(string userId);
}