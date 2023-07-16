using CLI.Models;

namespace CLI.Repositories;

public interface ITasksRepository
{
    void CreateGeneration(Generation generation);
    void CreateResult(Result result);
    void CreateTask(Models.Task newTask);
    Generation? GetGeneration(Guid id, int number);
    Result? GetResult(Guid id);
    IEnumerable<Result> GetResults();
    Models.Task? GetTask(Guid id);
    IEnumerable<Models.Task> GetTasks();
    void Save();
}
