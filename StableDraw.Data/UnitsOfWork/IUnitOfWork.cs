namespace StableDraw.Data.UnitsOfWork;

public interface IUnitOfWork : IDisposable
{
    void Commit();
    Task CommitAsync();
}