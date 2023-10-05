using System.Linq.Expressions;

namespace StableDraw.Domain.Repositories;

public interface IBaseRepository<T>
{
    IQueryable<T> FindAll();
    IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression);
    void Create(T entity);
    void Update(T entity);
    void Delete(T entity);
    public Task CreateRangeAsync(IEnumerable<T> entities);
}