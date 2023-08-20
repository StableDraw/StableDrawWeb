using System.ComponentModel.DataAnnotations;

namespace StableDraw.Core.Models;

public class BaseObject
{
    [Key]
    public Guid Oid { get; set; }

    protected BaseObject()
    {
        Oid = new Guid();
    }
}