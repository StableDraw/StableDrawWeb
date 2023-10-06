using MediatR;
using StableDraw.Application.DTOs;
using StableDraw.Infrastructure.Common;
using StableDraw.Infrastructure.DTOs;

namespace StableDraw.Application.Queries.User;

public class GetUserQuery : IRequest<List<UserResponseDto>>
{
}

public class GetUserQueryHandler : IRequestHandler<GetUserQuery, List<UserResponseDto>>
{
    private readonly IIdentityService _identityService;

    public GetUserQueryHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    public async Task<List<UserResponseDto>> Handle(GetUserQuery request, CancellationToken cancellationToken)
    {
        var users = await _identityService.GetAllUsersAsync();
        return users.Select(x => new UserResponseDto()
        {
            Id = x.id,
            FullName = x.fullName,
            UserName = x.userName,
            Email = x.email
        }).ToList();
    }
}