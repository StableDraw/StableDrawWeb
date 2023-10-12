using MediatR;
using StableDraw.Application.Common.Interfaces;
using StableDraw.Application.DTOs;

namespace StableDraw.Application.Queries.Neurals;

public class GetNeuralListQuery : IRequest<IEnumerable<NeuralListResponseDto>>
{
}

public class GetNeuralListQueryHandler : IRequestHandler<GetNeuralListQuery, IEnumerable<NeuralListResponseDto>>
{
    private readonly INeuralService _neuralService;

    public GetNeuralListQueryHandler(INeuralService neuralService)
    {
        _neuralService = neuralService;
    }

    public async Task<IEnumerable<NeuralListResponseDto>> Handle(GetNeuralListQuery request, CancellationToken cancellationToken)
    {
        var result = await _neuralService.GetNeuralList();
        return result.Select(x => new NeuralListResponseDto()
        {
            ClientName = x.clientName,
            Description = x.description,
            ServerName = x.serverName,
            NeuralName = x.neuralName
        });
    }
}