using MediatR;
using StableDraw.Application.Common.Exceptions;
using StableDraw.Application.Common.Interfaces;

namespace StableDraw.Application.Commands.Auth;

public class RegistrationUserCommand : IRequest<int>
{
    public string FullName { get; set; }
    public string UserName { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string ConfirmationPassword { get; set; }
    public string Token { get; set; }
}

public class RegistrationUserCommandHandler : IRequestHandler<RegistrationUserCommand, int>
{
    private readonly IIdentityService _identityService;
    private readonly IGoogleRecaptchaService _recaptchaService;

    public RegistrationUserCommandHandler(IIdentityService identityService, IGoogleRecaptchaService recaptchaService)
    {
        _identityService = identityService;
        _recaptchaService = recaptchaService;
    }

    public async Task<int> Handle(RegistrationUserCommand request, CancellationToken cancellationToken)
    {
        var isValidRequest = await _recaptchaService.Verefication(request.Token);
        
        if (!isValidRequest.success)
        {
            throw new ValidationException("Recaptcha not success response");
        }

        var result =
            await _identityService.RegistrationUserAsync(request.UserName, request.Password, request.Email,
                request.FullName);
        return result ? 1 : 0;
    }
}

