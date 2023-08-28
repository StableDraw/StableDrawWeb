using StableDraw.Core.Models;

namespace StableDraw.Domain.Repositories;

public interface IApplicationRepository : IDisposable
{
    void CreateImage(string imageName, int userId);
    Image? GetImage(string imageName, int userId);
    void DeleteImage(string imageName, int userId);
    void UpdateImage(Image image);

    IEnumerable<Image> GetImages(int userId);
    void CreateImages(IEnumerable<string> imageNames, int userId);
    void DeleteImages(IEnumerable<string> imageNames, int userId);
    void Save();
}
