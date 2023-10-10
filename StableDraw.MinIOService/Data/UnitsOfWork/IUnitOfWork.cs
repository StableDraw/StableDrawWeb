using StableDraw.Domain.Repositories;
using StableDraw.MinIOService.Data.Repositories;

namespace StableDraw.Domain.UnitsOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        IImageRepository Images { get; }

        void Commit();
        Task CommitAsync();
    }
}
