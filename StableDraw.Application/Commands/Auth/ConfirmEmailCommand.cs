using MediatR;

namespace StableDraw.Application.Commands.Auth;

public class ConfirmEmailCommand : IRequest<int>
{
    public string UserId { get; set; }
    public string Code { get; set; }
}

public class ConfirmEmailCommandHandler : IRequestHandler<ConfirmEmailCommand, int>
{
    public Task<int> Handle(ConfirmEmailCommand request, CancellationToken cancellationToken)
    {
        
    }
}