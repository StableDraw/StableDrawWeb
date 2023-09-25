namespace StableDraw.Domain.Repositories;

public interface IRepositoryWrapper
{
    IImageRepository ImageRepository { get; }
    Task SaveAsync();
}