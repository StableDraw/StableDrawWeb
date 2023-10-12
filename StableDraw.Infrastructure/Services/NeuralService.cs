using System.ComponentModel.DataAnnotations;
using MassTransit;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using StableDraw.Application.Common.Abstractions;
using StableDraw.Application.Common.Exceptions;
using StableDraw.Application.Common.Interfaces;
using StableDraw.Contracts.NeuralContracts.Replies;
using StableDraw.Contracts.NeuralContracts.Requests;
using ValidationException = StableDraw.Application.Common.Exceptions.ValidationException;

namespace StableDraw.Infrastructure.Services;


public class NeuralBuilderSettings
{
    public Dictionary<string, IDictionary<string, string[]>>? Neurals { get; set; }
}

public class NeuralService : INeuralService
{
    private readonly NeuralBuilderSettings _neuralBuilderSettings;
    private readonly IRequestBus _requestBus;

    public NeuralService(IConfiguration configuration, IRequestBus requestBus)
    {
        _requestBus = requestBus;
        _neuralBuilderSettings = new NeuralBuilderSettings()
        {
            Neurals = configuration.GetSection("Neurals").Get<Dictionary<string, IDictionary<string, string[]>>>()
        };
    }

    public Task<IDictionary<string, string[]>> GetNeuralInfo(string neuralType)
    {
        if (_neuralBuilderSettings.Neurals != null && 
            _neuralBuilderSettings.Neurals.TryGetValue(neuralType, out var param))
            return Task.FromResult(param);
        throw new NotFoundException("Neural Type not found");
    }

    public Task<IEnumerable<(string neuralName, string description, string clientName, string serverName)>> GetNeuralList()
    {
        if (_neuralBuilderSettings.Neurals != null)
        {
            return Task.FromResult(_neuralBuilderSettings.Neurals.Select(x => (
                x.Key, 
                x.Value.FirstOrDefault(y => y.Key == "description").Value.First(),
                x.Value.FirstOrDefault(y => y.Key == "clientName").Value.First(),
                x.Value.FirstOrDefault(y => y.Key == "serverName").Value.First()
            )));
        }

        throw new NotFoundException("Neural not found");
    }

    public async Task<NeuralReply> GetGenerateNeural(string neuralType,
        string? caption, IEnumerable<string>? prompts, string? parameters,
        IEnumerable<IFormFile>? imagesInput)
    {
        var request = new NeuralRequest()
        {
            OrderId = NewId.NextGuid(),
            NeuralType = neuralType,
            Caption = caption,
            Prompts = prompts,
            Parameters = parameters,
        };

        if (imagesInput != null)
        {
            var dataBytes = imagesInput.Select(async x =>
            {
                await using var memoryStream = new MemoryStream();
                await x.CopyToAsync(memoryStream);
                return memoryStream.ToArray();
            }).Select(x => x.Result);
        
            request.ImagesInput = dataBytes;
        }
        var response = await _requestBus.GetResponse<NeuralRequest, NeuralReply>(request);

        if (response.IsValid)
        {
            return response.Result;
        }

        throw new ValidationException(response.ValidationErrors.Errors.ToString());
    }
}