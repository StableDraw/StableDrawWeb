using StableDraw.Core.Models;
using StableDraw.Domain.Data;
using StableDraw.Domain.Data.Task;
using Task = StableDraw.Core.Models.Task;

namespace StableDraw.Domain.Repositories;

public class TasksRepository : ITasksRepository
{
    private readonly TaskContext _context;

    public TasksRepository(TaskContext context)
    {
        _context = context;
    }

    public void CreateGeneration(Generation generation)
    {
        _context.Generations.Add(generation);
    }

    public void CreateResult(Result result)
    {
        _context.Results.Add(result);
    }

    public void CreateResult(ImageResult result)
    {
        _context.ImageResults.Add(result);
    }

    public void CreateResult(ParamsResult result)
    {
        _context.ParamsResults.Add(result);
    }

    public void CreateResult(CaptionResult result)
    {
        _context.CaptionResults.Add(result);
    }

    public void CreateTask(Task task)
    {
        _context.Tasks.Add(task);
    }

    public Generation? GetGeneration(Guid id, int number)
    {
        return _context.Generations.FirstOrDefault(g => g.TaskId == id && g.Number == number);
    }

    public Result? GetResult(Guid id)
    {
        return _context.Results.FirstOrDefault(r => r.Oid == id);
    }

    public IEnumerable<Result> GetResults()
    {
        return _context.Results.ToList();
    }

    public Task? GetTask(Guid id)
    {
        return _context.Tasks.FirstOrDefault(t => t.Oid == id);
    }

    public IEnumerable<Task> GetTasks()
    {
        return _context.Tasks.ToList();
    }

    public void Save()
    {
        _context.SaveChanges();
    }
}