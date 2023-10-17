using StableDraw.MinIOService.Data.Repositories;

namespace StableDraw.MinIOService.Data.UnitsOfWork;
public class UnitOfWork : IUnitOfWork
{
    private readonly MinIoDbContext _context;

    public UnitOfWork(MinIoDbContext context)
    {
        _context = context;
        Images = new ImageRepository(context);
    }

    public IImageRepository Images { get; }

    public void Commit()
    {
        _context.SaveChanges();
    }

    public async Task CommitAsync() =>
        await _context.SaveChangesAsync();


    private bool _disposed = false;

    protected virtual void Dispose(bool disposing)
    {
        if (!_disposed)
        {
            if(disposing)
                _context.Dispose();
        }

        _disposed = true;
    }
        
    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }
}