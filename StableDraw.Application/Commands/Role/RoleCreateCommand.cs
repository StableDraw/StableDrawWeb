using MediatR;
using StableDraw.Application.Common.Interfaces;

namespace StableDraw.Application.Commands.Role;

public class RoleCreateCommand : IRequest<int>
{
    public string RoleName { get; set; }
}

public class RoleCreateCommandHandler : IRequestHandler<RoleCreateCommand, int>
{
    private readonly IIdentityService _identityService;

    public RoleCreateCommandHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }
    public async Task<int> Handle(RoleCreateCommand request, CancellationToken cancellationToken)
    {
        var result = await _identityService.CreateRoleAsync(request.RoleName);
        return result ? 1 : 0;
    }
}