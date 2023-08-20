using Microsoft.AspNetCore.Mvc;

namespace CLI.Controllers;

[ApiController]
public class PaymentController : Controller
{
    private readonly ILogger<PaymentController> _logger;
    
    public PaymentController(ILogger<PaymentController> logger)
    {
        _logger = logger;
    }
    
    
}