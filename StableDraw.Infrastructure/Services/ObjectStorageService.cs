using MassTransit;
using Microsoft.AspNetCore.Http;
using StableDraw.Application.Common.Abstractions;
using StableDraw.Application.Common.Exceptions;
using StableDraw.Application.Common.Interfaces;
using StableDraw.Contracts.MInIoContracts.Replies;
using StableDraw.Contracts.MInIoContracts.Requests;

namespace StableDraw.Infrastructure.Services;

public class ObjectStorageService : IObjectStorageService
{
    private readonly IRequestBus _requestBus;

    public ObjectStorageService(IBus bus, IRequestBus requestBus)
    {
        _requestBus = requestBus;
    }


    public async Task<bool> DeleteImagesAsync(string userId, IEnumerable<string>? imageNames)
    {
        var response = await _requestBus.GetResponse<DeleteObjectsMinIoRequest, DeleteObjectsMinIoReply>(
            new DeleteObjectsMinIoRequest()
            {
                OrderId = NewId.NextGuid(), 
                UserId = userId, 
                ObjectNames = imageNames
            });
        if (response.IsValid && string.IsNullOrEmpty(response.Result.ErrorMsg))
            return response.IsValid;

        throw new ValidationException(response.ValidationErrors.Errors.ToString());
    }

    public async Task<bool> PutImagesAsync(string userId, IEnumerable<IFormFile> files)
    {
        var imagesNames = from file in files
            select file.FileName;

        IEnumerable<byte[]> dataBytes;
        using (var memoryStream = new MemoryStream())
        {
            dataBytes = files.Select(async x =>
            {
                await x.CopyToAsync(memoryStream);
                return memoryStream.ToArray();
            }).Select(x => x.Result);
        }
        
        var response = await _requestBus.GetResponse<PutObjectsMinIoRequest, PutObjectsMinIoReply>(
            new PutObjectsMinIoRequest()
            {
                OrderId = NewId.NextGuid(),
                UserId = userId,
                DataDictionary = imagesNames.Zip(dataBytes, (k, v) => new { k, v })
                    .ToDictionary(x => x.k, x => x.v)
            });

        if (response.IsValid && string.IsNullOrEmpty(response.Result.ErrorMsg))
        {
            return response.IsValid;
        }

        throw new ValidationException(response.ValidationErrors.Errors.ToString());
    }

    public async Task<IDictionary<string, byte[]>> GetImagesAsync(string userId, IEnumerable<string>? imageNames)
    {
        var response = await _requestBus.GetResponse<GetObjectsMinIoRequest, GetObjectsMinIoReply>(
            new GetObjectsMinIoRequest()
            {
                OrderId = NewId.NextGuid(),
                UserId = userId,
                ObjectNames = imageNames
            });

        if (response.IsValid && string.IsNullOrEmpty(response.Result.ErrorMsg))
        {
            return response.Result.DataDictionary;
        }

        throw new ValidationException(response.ValidationErrors.Errors.ToString());
    }
}