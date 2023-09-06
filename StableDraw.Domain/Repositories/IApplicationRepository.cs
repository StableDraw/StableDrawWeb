using StableDraw.Core.Models;

namespace StableDraw.Domain.Repositories;

public interface IApplicationRepository : IDisposable
{
    Guid CreateImage(string imageName, string userId, string contentType);
    Image? GetImage(string imageName, string userId);
    void DeleteImage(string imageName, string userId);
    void UpdateImage(Image image);

    IEnumerable<Image> GetImages(string userId);
    IEnumerable<Guid> CreateImages(IEnumerable<(string, string)> imageNames, string userId);
    void DeleteImages(IEnumerable<string> imageNames, string userId);
    void Save();
}
