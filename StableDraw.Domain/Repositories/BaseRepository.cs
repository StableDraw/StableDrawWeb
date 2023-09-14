using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using StableDraw.Domain.Data.Identity;

namespace StableDraw.Domain.Repositories;

public abstract class BaseRepository<T> : IBaseRepository<T> where T : class
{
    protected ApplicationDbContext Context;

    protected BaseRepository(ApplicationDbContext context)
    {
        Context = context;
    }

    public IQueryable<T> FindAll()
    {
        return Context.Set<T>().AsNoTracking();
    }

    public IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression)
    {
        return Context.Set<T>()
            .Where(expression).AsNoTracking();
    }

    public void Create(T entity)
    {
        Context.Set<T>().Add(entity);
    }

    public void Update(T entity)
    {
        Context.Set<T>().Update(entity);
    }
    
    public void Delete(T entity)
    {
        Context.Set<T>().Remove(entity);
    }

    public async Task CreateRangeAsync(IEnumerable<T> entities)
    {
        await Context.Set<T>().AddRangeAsync(entities);
    }

    public void RemoveRangeAsync(IEnumerable<T> entities)
    {
        Context.Set<T>().RemoveRange(entities);
    }
}