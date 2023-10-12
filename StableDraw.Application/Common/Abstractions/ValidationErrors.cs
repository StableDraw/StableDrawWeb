namespace StableDraw.Application.Common.Interfaces;

public record ValidationErrors(IReadOnlyCollection<string> Errors)
{
    public ValidationErrors() : this(new string[] { })
    {
    }
}