namespace StableDraw.Application.Common.Abstractions;

public record ValidationErrors(IReadOnlyCollection<string> Errors)
{
    public ValidationErrors() : this(new string[] { })
    {
    }
}