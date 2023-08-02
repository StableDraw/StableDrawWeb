using System.ComponentModel.DataAnnotations;

namespace StableDraw.Core.Models;

public class Result : BaseObject
{
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