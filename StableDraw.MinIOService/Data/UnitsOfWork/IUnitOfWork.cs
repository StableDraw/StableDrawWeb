using StableDraw.MinIOService.Data.Repositories;

namespace StableDraw.MinIOService.Data.UnitsOfWork;

public interface IUnitOfWork : IDisposable
{
    IImageRepository Images { get; }

    void Commit();
    Task CommitAsync();
}
