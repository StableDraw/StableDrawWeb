using CLI.Services;
using Microsoft.AspNetCore.Mvc;
using StableDraw.Core.Models;
using StableDraw.Domain.Repositories;

namespace CLI.Controllers;

[Route("api/v1/[controller]")]
[ApiController]
public class PaymentController : ControllerBase
{
    private IPaymentRepository _paymentRepository;
    private IPaymentService _paymentService;

    public PaymentController(IPaymentService paymentService, IPaymentRepository paymentRepository)
    {
        _paymentService = paymentService;
        _paymentRepository = paymentRepository;
    }

    [HttpPost("{userId}")]
    public async Task<IActionResult> CreatePayment(Guid userId, PaymentDTO paymentDTO)
    {
        var payment = await _paymentService.CreatePayment(paymentDTO);

        _paymentRepository.AddPayment(payment, userId);
        _paymentRepository.Save();

        return Ok(payment);
    }

    [HttpGet("{userId}/status")]
    public async Task<IActionResult> GetPaymentStatus(Guid userId)
    {
        if (_paymentRepository.IsSubscriber(userId))
        {
            return Ok();
        }

        var paymentId = _paymentRepository.GetPaymentIdByUserId(userId);
        var status = await _paymentService.GetPaymentStatus(paymentId);

        if (status is not "succeeded")
        {
            return Unauthorized();
        }

        _paymentRepository.UpdateUserToSubscriberAsync(userId);
        _paymentRepository.Save();

        return Ok(status);
    }
}