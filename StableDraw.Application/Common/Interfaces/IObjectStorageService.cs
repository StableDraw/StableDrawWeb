using System.Collections;
using Microsoft.AspNetCore.Http;

namespace StableDraw.Application.Common.Interfaces;

public interface IObjectStorageService
{
    Task<bool> DeleteImagesAsync(string userId, IEnumerable<string>? imageNames);
    Task<bool> PutImagesAsync(string userId, IEnumerable<IFormFile> files);
    Task<IDictionary<string, byte[]>> GetImagesAsync(string userId, IEnumerable<string>? imageNames);
}