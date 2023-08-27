using StableDraw.Core.Models;

namespace CLI.Services;

public interface IPaymentService
{
    Task<Payment> CreatePayment(PaymentDTO payment);
    Task<string> GetPaymentStatus(Guid paymentId);
}