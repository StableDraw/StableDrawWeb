using CLI.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using StableDraw.Core.Models;
using StableDraw.Domain.Repositories;

namespace CLI.Controllers;

[Route("api/v1/[controller]")]
[ApiController]
public class PaymentController : ControllerBase
{
    private readonly IPaymentRepository _paymentRepository;
    private readonly IPaymentService _paymentService;
    private readonly UserManager<ApplicationUser> _userManager;

    public PaymentController(IPaymentService paymentService, IPaymentRepository paymentRepository, UserManager<ApplicationUser> userManager)
    {
        _paymentService = paymentService;
        _paymentRepository = paymentRepository;
        _userManager = userManager;
    }

    [HttpPost]
    public async Task<IActionResult> CreatePayment(PaymentDTO paymentDTO)
    {
        var userId = _userManager.GetUserId(User);
        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized();
        }

        var payment = await _paymentService.CreatePayment(paymentDTO);

        var userPayment = new UserPayment{
            PaymentId = payment.Id,
            UserId = userId
        };

        _paymentRepository.AddPayment(userPayment);
        _paymentRepository.Save();

        return Ok(payment);
    }

    [HttpGet("/status")]
    public async Task<IActionResult> GetPaymentStatus()
    {
        var userId = _userManager.GetUserId(User);
        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized();
        }

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