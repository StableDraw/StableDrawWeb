using StableDraw.Core.Models;

namespace StableDraw.Domain.Repositories;

public interface IPaymentRepository
{
    void AddPayment(Payment payment, Guid userId);
    Guid GetPaymentIdByUserId(Guid userId);
    bool IsSubscriber(Guid userId);
    void Save();
    void UpdateUserToSubscriberAsync(Guid userId);
}