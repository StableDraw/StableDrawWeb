using System;

namespace CLI.Models;

public class Result
{
    public Guid Id { get; set; }
    public Guid GenerationId { get; set; }
}

public class ImageResult : Result
{
    public string Property { get; set; }
}

public class CaptionResult : Result
{
    public string Property { get; set; }
}

public class ParamsResult : Result
{
    public string Property { get; set; }
}