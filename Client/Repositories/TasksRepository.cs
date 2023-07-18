using CLI.Data;
using CLI.Models;
using Task = CLI.Models.Task;

namespace CLI.Repositories;

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

    public void CreateTask(Models.Task task)
    {
        _context.Tasks.Add(task);
    }

    public Generation? GetGeneration(Guid id, int number)
    {
        return _context.Generations.FirstOrDefault(g => g.TaskId == id && g.Number == number);
    }

    public Result? GetResult(Guid id)
    {
        return _context.Results.FirstOrDefault(r => r.Id == id);
    }

    public IEnumerable<Result> GetResults()
    {
        return _context.Results.ToList();
    }

    public Task? GetTask(string id)
    {
        return _context.Tasks.FirstOrDefault(t => t.Id.ToString() == id);
    }

    // public Models.Task? GetTask(Guid id)
    // {
    //     return _context.Tasks.Where(t => t.Id == id).FirstOrDefault();
    // }

    public IEnumerable<Models.Task> GetTasks()
    {
        return _context.Tasks.ToList();
    }

    public void Save()
    {
        _context.SaveChanges();
    }
}