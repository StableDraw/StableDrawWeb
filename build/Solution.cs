
using System.CodeDom;
using System.ComponentModel;
using Nuke.Common.Tooling;

[TypeConverter(typeof(Enumeration.TypeConverter<Solution>))]
public class Solution : Enumeration
{
    public static Solution Client = new Solution { Value = "\\Client\\CLI.csproj" };
    public static Solution SagaService = new Solution { Value = "\\StableDraw.SagasService\\StableDraw.SagasService.csproj" };
    public static Solution MinIoService = new Solution { Value = "\\StableDraw.MinIOService\\StableDraw.MinIOService.csproj" };

    public static implicit operator string(Solution solution)
    {
        return solution.Value;
    }
}