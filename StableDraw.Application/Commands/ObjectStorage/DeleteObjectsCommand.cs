using MediatR;
using StableDraw.Application.Common.Interfaces;

namespace StableDraw.Application.Commands.ObjectStorage;

public class DeleteObjectsCommand : IRequest<int>
{
    public string UserId { get; set; }
    public IEnumerable<string> ObjectNames { get; set; }
}

public class DeleteObjectsCommandHandler : IRequestHandler<DeleteObjectsCommand, int>
{
    private readonly IObjectStorageService _objectStorageService;

    public DeleteObjectsCommandHandler(IObjectStorageService objectStorageService)
    {
        _objectStorageService = objectStorageService;
    }

    public async Task<int> Handle(DeleteObjectsCommand request, CancellationToken cancellationToken)
    {
        var result = await _objectStorageService.DeleteImagesAsync(request.UserId, request.ObjectNames);
        return result ? 1 : 0;
    }
}