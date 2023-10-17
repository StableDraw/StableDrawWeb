using MediatR;
using StableDraw.Application.Common.Exceptions;
using StableDraw.Application.Common.Interfaces;

namespace StableDraw.Application.Commands.User;

public class CreateUserCommand : IRequest<int>
{
    public string FullName { get; set; }
    public string UserName { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string ConfirmationPassword { get; set; }
    public List<string> Roles { get; set; }
    public string Token { get; set; }
}

public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, int>
{
    private readonly IIdentityService _identityService;
    private readonly IGoogleRecaptchaService _recaptchaService;
    public CreateUserCommandHandler(IIdentityService identityService, 
        IGoogleRecaptchaService recaptchaService)
    {
        _identityService = identityService;
        _recaptchaService = recaptchaService;
    }
    public async Task<int> Handle(CreateUserCommand request, CancellationToken cancellationToken)
    {
        var isValidRequest = await _recaptchaService.Verefication(request.Token);
        
        if (!isValidRequest.success)
        {
            throw new ValidationException("Recaptcha not success response");
        }
        
        var result = await _identityService.CreateUserAsync(request.UserName, request.Password, request.Email, request.FullName, request.Roles);
        return result.isSucceed ? 1 : 0;
    }
}