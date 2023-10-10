using MediatR;
using StableDraw.Application.Common.Interfaces;

namespace StableDraw.Application.Commands.Auth;

public class ForgotPasswordCommand : IRequest<int>
{
    public string Email { get; set; }
}

public class ForgotPasswordCommandHandler : IRequestHandler<ForgotPasswordCommand, int>
{
    private readonly IIdentityService _identityService;

    public ForgotPasswordCommandHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    public async Task<int> Handle(ForgotPasswordCommand request, CancellationToken cancellationToken)
    {
        var result = await _identityService.ForgotUserPassword(request.Email);
        return result ? 1 : 0;
    }
}