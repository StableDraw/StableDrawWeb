using MediatR;
using Microsoft.AspNetCore.Http;
using StableDraw.Application.Common.Interfaces;

namespace StableDraw.Application.Commands.ObjectStorage;

public class PutObjectsCommand : IRequest<int>
{
    public string UserId { get; set; }
    public IEnumerable<IFormFile> InputObjects { get; set; }
}

public class PutObjectsCommandHandler : IRequestHandler<PutObjectsCommand, int>
{
    private readonly IObjectStorageService _objectStorageService;

    public PutObjectsCommandHandler(IObjectStorageService objectStorageService)
    {
        _objectStorageService = objectStorageService;
    }

    public async Task<int> Handle(PutObjectsCommand request, CancellationToken cancellationToken)
    {
        var result = await _objectStorageService.PutImagesAsync(request.UserId, request.InputObjects);
        return result ? 1 : 0;
    }
}