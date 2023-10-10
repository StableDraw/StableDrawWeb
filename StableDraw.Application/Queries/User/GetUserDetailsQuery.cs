using MediatR;
using StableDraw.Application.Common.Interfaces;
using StableDraw.Application.DTOs;

namespace StableDraw.Application.Queries.User;

public class GetUserDetailsQuery : IRequest<UserDetailsResponseDto>
{
    public string UserId { get; set; }
}

public class GetUserDetailsQueryHandler : IRequestHandler<GetUserDetailsQuery, UserDetailsResponseDto>
{
    private readonly IIdentityService _identityService;

    public GetUserDetailsQueryHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }
    public async Task<UserDetailsResponseDto> Handle(GetUserDetailsQuery request, CancellationToken cancellationToken)
    {
        var (userId, fullName, userName, email, roles ) = await _identityService.GetUserDetailsAsync(request.UserId);
        return new UserDetailsResponseDto() { Id = userId, FullName = fullName, UserName = userName, Email = email, Roles = roles };
    }
}