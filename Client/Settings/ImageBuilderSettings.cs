namespace CLI.Settings
{
    public class ImageBuilderSettings
    {
        public List<ImageParameter>? ImageParameters { get; set; }
    }

    public class ImageParameter
    {
        public int Id { get; set; }
        public string? Type { get; set; }
        public string? Name { get; set; }
        public Dictionary<string, string>? Model { get; set; }
        public string? Preview { get; set; }
    }
}
