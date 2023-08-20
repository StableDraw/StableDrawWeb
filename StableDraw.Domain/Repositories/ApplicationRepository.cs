using StableDraw.Core.Models;
using StableDraw.Domain.Data.Identity;

namespace StableDraw.Domain.Repositories;

public class ApplicationRepository : IApplicationRepository
{
    private readonly ApplicationDbContext _context;

    public ApplicationRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public Guid CreateImage(string imageName, int userId)
    {
        var img = new Image(imageName, userId);
        _context.Images.AddAsync(img);
        return img.Oid;
    }
        
    

    public Guid GetImage(string imageName, int userId) =>
        _context.Images.FirstOrDefault(x => x.ImageName == imageName && x.UserId == userId)!.Oid;

    public void DeleteImage(string imageName, int userId) =>
        _context.Images.Remove(_context.Images
            .FirstOrDefault(x => x.ImageName == imageName && x.UserId == userId) ?? throw new InvalidOperationException());


    public IEnumerable<Guid> GetImages(int userId) => 
        _context.Images.Where(x => x.UserId == userId).Select(x => x.Oid);

    public void CreateImages(IEnumerable<string> imageNames, int userId) => 
        _context.Images.AddRange(imageNames.Select(x => new Image(x, userId)));

    public void DeleteImages(IEnumerable<string> imageNames, int userId) =>
        _context.Images.RemoveRange(_context.Images.Where(x => imageNames.Contains(x.ImageName) && userId == x.UserId));
}