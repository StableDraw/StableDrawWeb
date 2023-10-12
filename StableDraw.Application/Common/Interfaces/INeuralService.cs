using Microsoft.AspNetCore.Http;
using StableDraw.Contracts.NeuralContracts.Replies;

namespace StableDraw.Application.Common.Interfaces;

public interface INeuralService
{
    Task<IDictionary<string, string[]>> GetNeuralInfo(string neuralType);
    Task<IEnumerable<(string neuralName, string description, string clientName, string serverName)>> GetNeuralList();
    Task<NeuralReply> GetGenerateNeural(string neuralType, string? caption, IEnumerable<string>? prompts, string? parameters, IEnumerable<IFormFile>? imagesInput);
}