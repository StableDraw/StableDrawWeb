using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using StableDraw.Core.Models;
using StableDraw.Domain.Data.Identity;
using StableDraw.Domain.Repositories;

namespace StableDraw.Data.Repositories;

public interface IDbContext
{
    DbSet<TEntity> Set<TEntity>() where TEntity : class;
    int SaveChanges();
    void Dispose();
}


public abstract class BaseRepository<T> : IBaseRepository<T> where T : BaseObject
{
    private readonly IDbContext _context;

    protected BaseRepository(IDbContext context)
    {
        _context = context;
    }

    public IQueryable<T> FindAll()
    {
        return _context.Set<T>().AsNoTracking();
    }

    public IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression)
    {
        return _context.Set<T>()
            .Where(expression).AsNoTracking();
    }

    public void Create(T entity)
    {
        _context.Set<T>().Add(entity);
    }

    public void Update(T entity)
    {
        _context.Set<T>().Update(entity);
    }
    
    public void Delete(T entity)
    {
        _context.Set<T>().Remove(entity);
    }

    public async Task CreateRangeAsync(IEnumerable<T> entities)
    {
        await _context.Set<T>().AddRangeAsync(entities);
    }

    public void RemoveRangeAsync(IEnumerable<T> entities)
    {
        _context.Set<T>().RemoveRange(entities);
    }
}