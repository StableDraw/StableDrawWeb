using StableDraw.Core.Models;
using Task = StableDraw.Core.Models.Task;

namespace StableDraw.Domain.Repositories;

public interface ITasksRepository
{
    void CreateGeneration(Generation generation);
    void CreateResult(Result result);
    void CreateTask(Task newTask);
    Generation? GetGeneration(Guid id, int number);
    Result? GetResult(Guid id);
    IEnumerable<Result> GetResults();
    Task? GetTask(Guid id);
    IEnumerable<Task> GetTasks();
    void Save();
}
