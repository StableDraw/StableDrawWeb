using MediatR;
using Microsoft.AspNetCore.Http;
using StableDraw.Application.Common.Interfaces;
using StableDraw.Contracts.NeuralContracts.Replies;

namespace StableDraw.Application.Queries.Neurals;

public class GetNeuralGenerateQuery : IRequest<NeuralReply>
{
    public string? NeuralType { get; set; }
    public string? Caption { get; set; }
    public IEnumerable<string>? Prompts { get; set; }
    public string? Parameters { get; set; }
    public IEnumerable<IFormFile>? ImagesInput { get; set; }
}

public class GetNeuralGenerateQueryHandler : IRequestHandler<GetNeuralGenerateQuery, NeuralReply>
{
    private readonly INeuralService _neuralService;

    public GetNeuralGenerateQueryHandler(INeuralService neuralService)
    {
        _neuralService = neuralService;
    }

    public async Task<NeuralReply> Handle(GetNeuralGenerateQuery request, CancellationToken cancellationToken)
    {
        var result = await _neuralService.GetGenerateNeural(request.NeuralType, request.Caption, request.Prompts,
            request.Parameters, request.ImagesInput);

        return result;
    }
}