using StableDraw.Domain.Data.Identity;
using StableDraw.Domain.Repositories;

namespace StableDraw.Domain.UnitsOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _context;
        private readonly IImageRepository _imageRepository;

        public UnitOfWork(ApplicationDbContext context, IImageRepository imageRepository)
        {
            _context = context;
            _imageRepository = imageRepository;
        }

        public IImageRepository Images => _imageRepository;

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
