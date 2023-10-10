using MediatR;

namespace StableDraw.Application.Commands.ObjectStorage;

public class DeleteImageCommand : IRequest<int>
{
    public string ImageName { get; set; }
}

public class DeleteImageCommandHandler : IRequestHandler<DeleteImageCommand, int>
{
    public Task<int> Handle(DeleteImageCommand request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}