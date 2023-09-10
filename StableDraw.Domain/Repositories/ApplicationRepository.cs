using System.Net.Mime;
using System.Security.Cryptography;
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

    public Guid CreateImage(string imageName, string contentType, string userId)
    {
        var img = new Image()
        {
            ImageName = imageName,
            ContentType = contentType,
            UserId = userId, 
            Oid = Guid.NewGuid()
        };
        _context.Images.Add(img);
        return img.Oid;
    }

    public Image? GetImage(string imageName, string userId) =>
        _context.Images.FirstOrDefault(x => x.ImageName == imageName && x.UserId == userId);

    public void DeleteImage(string imageName, string userId) =>
        _context.Images.Remove(_context.Images
            .FirstOrDefault(x => x.ImageName == imageName && x.UserId == userId) ?? throw new InvalidOperationException());

    public void UpdateImage(Image image)
    {
        _context.Images.Update(image);
    }

    public IEnumerable<Image> GetImages(string userId) => 
        _context.Images.Where(x => x.UserId == userId);

    public IEnumerable<Guid> CreateImages(IEnumerable<(string, string)> imageNames, string userId)
    {
        var imgs = imageNames.Select(x => new Image()
        {
            ImageName = x.Item1, ContentType = x.Item2, UserId = userId, Oid = Guid.NewGuid()
        });
        _context.Images.AddRange(imgs);
        return imgs.Select(x => x.Oid);
    }

    public void DeleteImages(IEnumerable<Guid> imagesId, string userId) =>
        _context.Images.RemoveRange(_context.Images.Where(x => imagesId.Contains(x.Oid) && userId == x.UserId));

    public void Save()
    {
        _context.SaveChanges();
    }

    private bool _disposed = false;
    
    protected virtual void Dispose(bool disposing)
    {
        if (!this._disposed)
        {
            if (disposing)
            {
                _context.Dispose();
            }
        }
        this._disposed = true;
    }
    
    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }
}