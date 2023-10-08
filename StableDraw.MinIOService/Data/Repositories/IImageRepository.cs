using System.Net.Mime;
using StableDraw.Core.Models;

namespace StableDraw.Domain.Repositories;

public interface IImageRepository : IBaseRepository<Image>
{
    Task<IEnumerable<Image>> GetImagesAsync(string userId);
    Task<IEnumerable<Guid>> CreateImagesAsync(IEnumerable<(string, string)> imageNames, string userId);
    Task DeleteImagesAsync(IEnumerable<string> imageNames, string userId);
    void CreateImage(Image image);
    Task<Image?> GetImage(string imageName, string userId);
    Task DeleteImage(string imageName, string userId);
}