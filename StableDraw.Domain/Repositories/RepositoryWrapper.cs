using StableDraw.Domain.Data.Identity;

namespace StableDraw.Domain.Repositories;

public class RepositoryWrapper : IRepositoryWrapper
{
    private readonly ApplicationDbContext _context;

    public RepositoryWrapper(ApplicationDbContext context, IImageRepository imageRepository)
    {
        _context = context;
        ImageRepository = imageRepository;
    }

    public IImageRepository ImageRepository { get; }
    public async Task SaveAsync()
    {
        await _context.SaveChangesAsync();
    }
}