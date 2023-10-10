using MassTransit;
using Microsoft.AspNetCore.Http;
using StableDraw.Application.Common.Interfaces;

namespace StableDraw.Infrastructure.Services;

public class ObjectStorageService : IObjectStorageService
{
    private readonly IBus _bus;

    public ObjectStorageService(IBus bus)
    {
        _bus = bus;
    }

    public Task<bool> DeleteImageAsync(string imageName, string userId)
    {
        throw new NotImplementedException();
    }

    public Task<bool> DeleteImagesAsync(string userId)
    {
        throw new NotImplementedException();
    }

    public Task<bool> PutImageAsync(string userId, IFormFile file)
    {
        throw new NotImplementedException();
    }

    public Task<bool> PutImagesAsync(string userId, IEnumerable<IFormFile> files)
    {
        throw new NotImplementedException();
    }

    public Task<(string, byte[])> GetImageAsync(string userId, string imageName)
    {
        throw new NotImplementedException();
    }

    public Task<Dictionary<string, byte[]>> GetImagesAsync(string userId)
    {
        throw new NotImplementedException();
    }
}