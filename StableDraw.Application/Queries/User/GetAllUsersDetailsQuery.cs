using MediatR;
using StableDraw.Application.Common.Interfaces;
using StableDraw.Application.DTOs;
using StableDraw.Infrastructure.DTOs;

namespace StableDraw.Application.Queries.User;

public class GetAllUsersDetailsQuery : IRequest<List<UserDetailsResponseDto>>
{
}

public class GetAllUsersDetailsQueryHandler : IRequestHandler<GetAllUsersDetailsQuery, List<UserDetailsResponseDto>>
{
    private readonly IIdentityService _identityService;

    public GetAllUsersDetailsQueryHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    public async Task<List<UserDetailsResponseDto>> Handle(GetAllUsersDetailsQuery request, CancellationToken cancellationToken)
    {
        var users = await _identityService.GetAllUsersAsync();
        var userDetails = users.Select(x => new UserDetailsResponseDto()
        {
            Id = x.id,
            Email = x.email,
            UserName = x.userName
        }).ToList();

        foreach (var user in userDetails)
        {
            user.Roles = await _identityService.GetUserRolesAsync(user.Id);
        }
        return userDetails;
    }
}