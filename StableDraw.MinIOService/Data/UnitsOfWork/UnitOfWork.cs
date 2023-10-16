using StableDraw.MinIOService.Data.Repositories;

namespace StableDraw.MinIOService.Data.UnitsOfWork
{
    public class UnitOfWork : IDisposable
    {
        private readonly MinIoDbContext _context;
        private IImageRepository Images;
        public UnitOfWork(MinIoDbContext context, IImageRepository imageRepository)
        {
            _context = context;
            Images = imageRepository;
        }

        

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
}
