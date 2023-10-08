using MediatR;
using StableDraw.Application.Common.Interfaces;
using StableDraw.Application.DTOs;
using StableDraw.Infrastructure.Common;

namespace StableDraw.Application.Queries.User;

public class GetUserDetailsByUserNameQuery : IRequest<UserDetailsResponseDto>
{
    public string UserName { get; set; }
}

public class GetUserDetailsByUserNameQueryHandler : IRequestHandler<GetUserDetailsByUserNameQuery, UserDetailsResponseDto>
{
    private readonly IIdentityService _identityService;

    public GetUserDetailsByUserNameQueryHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }
    public async Task<UserDetailsResponseDto> Handle(GetUserDetailsByUserNameQuery request, CancellationToken cancellationToken)
    {
        var (userId, fullName, userName, email, roles ) = await _identityService.GetUserDetailsByUserNameAsync(request.UserName);
        return new UserDetailsResponseDto() { Id = userId, FullName = fullName, UserName = userName, Email = email, Roles = roles };
    }
}