using MediatR;
using StableDraw.Application.Common.Interfaces;
using StableDraw.Infrastructure.Common;
using StableDraw.Infrastructure.DTOs;

namespace StableDraw.Application.Queries.Role;

public class GetRoleByIdQuery : IRequest<RoleResponseDto>
{
    public string RoleId { get; set; }
}

public class GetRoleQueryByIdHandler : IRequestHandler<GetRoleByIdQuery, RoleResponseDto>
{
    private readonly IIdentityService _identityService;

    public GetRoleQueryByIdHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }
    public async Task<RoleResponseDto> Handle(GetRoleByIdQuery request, CancellationToken cancellationToken)
    {
        var role = await _identityService.GetRoleByIdAsync(request.RoleId);
        return new RoleResponseDto() { Id = role.id, RoleName = role.roleName};
    }
}