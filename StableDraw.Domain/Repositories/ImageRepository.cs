using System.Net.Mime;
using System.Text.RegularExpressions;
using MassTransit;
using Microsoft.EntityFrameworkCore;
using StableDraw.Core.Models;
using StableDraw.Domain.Data.Identity;

namespace StableDraw.Domain.Repositories;

public class ImageRepository : BaseRepository<Image>, IImageRepository
{
    public ImageRepository(ApplicationDbContext context) : base(context)
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

    public Task CreateImage(Image image)
    {
        //var imgName = image.ImageName.Split('.')[0];
        ////string pattern = $@"{imgName}(\w*)";
        //var regex = new Regex(imgName + @"(\w*)");
        //var imageList = await FindByCondition(x => 
        //x.UserId.Equals(image.UserId) &&
        //Regex.IsMatch(x.ImageName, imgName + @"(\w*)", RegexOptions.IgnoreCase)).ToListAsync();
        //image.ImageName = image.ImageName.Insert(imgName.Count() + 1, $"({imageList.Count})");
        Create(image);
        return Task.CompletedTask;
    }

    public async Task<Image?> GetImage(string imageName, string userId)
    {
        var result = await FindByCondition(x => 
                x.UserId.Equals(userId) && x.ImageName.Equals(imageName))
            .FirstOrDefaultAsync();
        return result;
    }

    public async Task DeleteImage(string imageName, string userId)
    {
        var img = await FindByCondition(x =>
                x.UserId.Equals(userId) && x.ImageName.Equals(imageName))
            .FirstOrDefaultAsync();
        if (img != null) Delete(img);
    }
}