using StableDraw.Core.Models;
using StableDraw.Data.Repositories;

namespace StableDraw.MinIOService.Data.Repositories;

public interface IImageRepository : IBaseRepository<Image>
{
    Task<IEnumerable<Image>> GetImagesAsync(string userId);
    Task<IEnumerable<Guid>> CreateImagesAsync(IEnumerable<(string, string)> imageNames, string userId);
    Task DeleteImagesAsync(IEnumerable<string> imageNames, string userId);
    void CreateImage(Image image);
    Task<Image?> GetImage(string imageName, string userId);
    Task DeleteImage(string imageName, string userId);
}