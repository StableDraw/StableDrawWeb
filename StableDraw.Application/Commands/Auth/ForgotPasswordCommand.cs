using MediatR;
using StableDraw.Application.Common.Exceptions;
using StableDraw.Application.Common.Interfaces;

namespace StableDraw.Application.Commands.Auth;

public class ForgotPasswordCommand : IRequest<int>
{
    public string Email { get; set; }
    public string Token { get; set; }
}

public class ForgotPasswordCommandHandler : IRequestHandler<ForgotPasswordCommand, int>
{
    private readonly IIdentityService _identityService;
    private readonly IGoogleRecaptchaService _recaptchaService;

    public ForgotPasswordCommandHandler(IIdentityService identityService, 
        IGoogleRecaptchaService recaptchaService)
    {
        _identityService = identityService;
        _recaptchaService = recaptchaService;
    }

    public async Task<int> Handle(ForgotPasswordCommand request, CancellationToken cancellationToken)
    {
        var isValidRequest = await _recaptchaService.Verefication(request.Token);
        
        if (!isValidRequest.success)
        {
            throw new ValidationException("Recaptcha not success response");
        }
        
        var result = await _identityService.ForgotUserPassword(request.Email);
        return result ? 1 : 0;
    }
}