using StableDraw.Core.Models;

namespace StableDraw.Domain.Repositories;

public interface IApplicationRepository
{
    Guid CreateImage(string imageName, int userId);
    Guid GetImage(string imageName, int userId);
    void DeleteImage(string imageName, int userId);

    IEnumerable<Guid> GetImages(int userId);
    void CreateImages(IEnumerable<string> imageNames, int userId);
    void DeleteImages(IEnumerable<string> imageNames, int userId);
}