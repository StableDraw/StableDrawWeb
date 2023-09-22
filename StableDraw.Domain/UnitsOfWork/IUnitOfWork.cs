using StableDraw.Domain.Repositories;

namespace StableDraw.Domain.UnitsOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        IImageRepository Images { get; }

        void Commit();
        Task CommitAsync();
    }
}
