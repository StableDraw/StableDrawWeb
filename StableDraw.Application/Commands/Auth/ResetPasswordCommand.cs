using MediatR;
using StableDraw.Application.Common.Interfaces;

namespace StableDraw.Application.Commands.Auth;

public class ResetPasswordCommand : IRequest<int>
{
    public string Email { get; set; }
    public string Code { get; set; }
    public string Password { get; set; }
}

public class ResetPasswordCommandHandler : IRequestHandler<ResetPasswordCommand, int>
{
    private readonly IIdentityService _identityService;

    public ResetPasswordCommandHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    public async Task<int> Handle(ResetPasswordCommand request, CancellationToken cancellationToken)
    {
        var result = await _identityService.ResetUserPassword(request.Email, request.Password, request.Code);
        return result ? 1 : 0;
    }
}