
using System.CodeDom;
using System.ComponentModel;
using Nuke.Common.Tooling;

[TypeConverter(typeof(Enumeration.TypeConverter<Solution>))]
public class Solution : Enumeration
{
    public static Solution Client = new Solution { Value = nameof(Client)};
    public static Solution SagaService = new Solution { Value = nameof(SagaService) };
    public static Solution MinIoService = new Solution { Value = nameof(MinIoService) };

    public static implicit operator string(Solution solution)
    {
        return solution.Value;
    }
}