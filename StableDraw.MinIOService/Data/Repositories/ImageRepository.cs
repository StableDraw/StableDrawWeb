using MassTransit;
using Microsoft.EntityFrameworkCore;
using StableDraw.Core.Models;
using StableDraw.MinIOService.Data;

namespace StableDraw.Domain.Repositories;

public class ImageRepository : BaseRepository<Image>, IImageRepository
{
    public ImageRepository(MinIODbContext context) : base(context)
    {
    }

    public async Task<IEnumerable<Image>> GetImagesAsync(string userId) => 
        await FindByCondition(image => image.UserId.Equals(userId)).ToListAsync();
    

    public async Task<IEnumerable<Guid>> CreateImagesAsync(IEnumerable<(string, string)> imageNames, string userId)
    {
        var imgs = imageNames.Select(x => new Image()
        {
            ImageName = x.Item1, ContentType = x.Item2, UserId = userId, Oid = NewId.NextGuid()
        }).ToList();
        await CreateRangeAsync(imgs);
        return await FindByCondition(img => imgs.Contains(img)).Select(x => x.Oid).ToListAsync();
    }

    public async Task DeleteImagesAsync(IEnumerable<string> imageNames, string userId)
    {
        var imgs = await FindByCondition(img => imageNames.Contains(img.ImageName) && img.UserId.Equals(userId)).ToListAsync();
        RemoveRangeAsync(imgs);
    }

    public void CreateImage(Image image)
    {
        Create(image);
    }

    public async Task<Image?> GetImage(string imageName, string userId)
    {
        return await FindByCondition(x => 
            x.UserId.Equals(userId) && x.ImageName.Equals(userId))
            .FirstOrDefaultAsync();
    }

    public async Task DeleteImage(string imageName, string userId)
    {
        var img = await FindByCondition(x =>
                x.UserId.Equals(userId) && x.ImageName.Equals(userId))
            .FirstOrDefaultAsync();
        if (img != null) Delete(img);
    }
}