using Microsoft.AspNetCore.Http;

namespace StableDraw.Application.Common.Interfaces;

public interface IObjectStorageService
{
    Task<bool> DeleteImageAsync(string imageName, string userId);
    Task<bool> DeleteImagesAsync(string userId);
    Task<bool> PutImageAsync(string userId, IFormFile file);
    Task<bool> PutImagesAsync(string userId, IEnumerable<IFormFile> files);
    Task<(string, byte[])> GetImageAsync(string userId, string imageName);
    Task<Dictionary<string, byte[]>> GetImagesAsync(string userId);
}