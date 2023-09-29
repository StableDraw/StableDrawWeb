namespace CLI.Settings;

public class NeuralBuilderSettings
{
    public Dictionary<string, IDictionary<string, string[]>>? Neurals { get; set; }
}

public class ErrorMessage
{
    private string? Stacktrace { get; set; }
    private string? Message { get; set; }
}