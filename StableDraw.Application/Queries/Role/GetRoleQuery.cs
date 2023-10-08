using MediatR;
using StableDraw.Application.Common.Interfaces;
using StableDraw.Infrastructure.Common;
using StableDraw.Infrastructure.DTOs;

namespace StableDraw.Application.Queries.Role;

public class GetRoleQuery : IRequest<IList<RoleResponseDto>>
{

}

public class GetRoleQueryHandler : IRequestHandler<GetRoleQuery, IList<RoleResponseDto>>
{
    private readonly IIdentityService _identityService;

    public GetRoleQueryHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }
    public async Task<IList<RoleResponseDto>> Handle(GetRoleQuery request, CancellationToken cancellationToken)
    {
        var roles = await _identityService.GetRolesAsync();
        return roles.Select(role => new RoleResponseDto() { Id = role.id, RoleName = role.roleName}).ToList();
    }
}