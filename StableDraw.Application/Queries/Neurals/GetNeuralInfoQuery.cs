using MediatR;
using StableDraw.Application.Common.Interfaces;
using StableDraw.Application.DTOs;

namespace StableDraw.Application.Queries.Neurals;

public class GetNeuralInfoQuery : IRequest<NeuralInfoResponseDto>
{
    public string NeuralType { get; set; }
}

public class GetNeuralInfoQueryHandler : IRequestHandler<GetNeuralInfoQuery, NeuralInfoResponseDto>
{
    private readonly INeuralService _neuralService;

    public GetNeuralInfoQueryHandler(INeuralService neuralService)
    {
        _neuralService = neuralService;
    }


    public async Task<NeuralInfoResponseDto> Handle(GetNeuralInfoQuery request, CancellationToken cancellationToken)
    {
        var result = await _neuralService.GetNeuralInfo(request.NeuralType);
        return new NeuralInfoResponseDto() {InfoDict = result};
    }
}

