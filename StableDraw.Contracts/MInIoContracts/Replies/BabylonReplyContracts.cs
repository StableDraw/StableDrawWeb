namespace StableDraw.Contracts.MInIoContracts.Replies;

public record SceneDto
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? Preview { get; set; }
    public string? Scene { get; set; }
}

public record ModelDto
{
    public int Id { get; set; }
    public IDictionary<string, string>? ModelsDict { get; set; }
    public string? Preview { get; set; }
}

public record EnvMapDto
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? Data { get; set; }
    public string? Preview { get; set;}
}

public record GetBabylonDataReply
{
    public Guid OrderId { get; set; }
    public IEnumerable<SceneDto>? Scenes { get; set; }
    public IEnumerable<ModelDto>? Models { get; set; }
    public IEnumerable<EnvMapDto>? EnvMaps { get; set; } 
    public string? ErrorMsg { get; set; }
}

public record IGetBabylonDataReply
{
    public Guid OrderId { get; set; }
    public IEnumerable<SceneDto>? Scenes { get; set; }
    public IEnumerable<ModelDto>? Models { get; set; }
    public IEnumerable<EnvMapDto>? EnvMaps { get; set; }
    public string? ErrorMsg { get; set; }
}