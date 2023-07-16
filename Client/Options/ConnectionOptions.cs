namespace CLI.Options;

public class ConnectionOptions
{
    public const string Context = "Context";

    public string ConnectionString { get; set; } = string.Empty;
    public string ProviderName { get; set; } = string.Empty;
}
