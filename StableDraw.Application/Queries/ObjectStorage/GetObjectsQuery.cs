using MediatR;
using StableDraw.Application.Common.Interfaces;
using StableDraw.Application.DTOs;

namespace StableDraw.Application.Queries.ObjectStorage;

public class GetObjectsQuery : IRequest<GetImagesResponseDto>
{
    public string UserId { get; set; }
    public IEnumerable<string>? ObjectNames { get; set; }
}

class GetObjectsQueryHandler : IRequestHandler<GetObjectsQuery, GetImagesResponseDto>
{
    private readonly IObjectStorageService _objectStorageService;

    public GetObjectsQueryHandler(IObjectStorageService objectStorageService)
    {
        _objectStorageService = objectStorageService;
    }

    public async Task<GetImagesResponseDto> Handle(GetObjectsQuery request, CancellationToken cancellationToken)
    {
        var result = await _objectStorageService.GetImagesAsync(request.UserId, request.ObjectNames);
        return new GetImagesResponseDto()
        {
            OutputImages = result
        };
    }
}