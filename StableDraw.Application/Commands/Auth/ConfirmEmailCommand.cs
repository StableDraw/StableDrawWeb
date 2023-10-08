using MediatR;
using StableDraw.Application.Common.Interfaces;

namespace StableDraw.Application.Commands.Auth;

public class ConfirmEmailCommand : IRequest<int>
{
    public string UserId { get; set; }
    public string Code { get; set; }
}

public class ConfirmEmailCommandHandler : IRequestHandler<ConfirmEmailCommand, int>
{
    private readonly IIdentityService _identityService;

    public ConfirmEmailCommandHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    public async Task<int> Handle(ConfirmEmailCommand request, CancellationToken cancellationToken)
    {
        var result = await _identityService.EmailConfirmed(request.UserId, request.Code);
        return result ? 1 : 0;
    }
}