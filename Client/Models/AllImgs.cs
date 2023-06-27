using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CLI.Models;

public class AllImgs
{
    [Key]
    public int Id { get; set; }

    public bool IsReady { get; set; }  // bool

    public int PixelWidth { get; set; }  // int

    public int PixelHeight { get; set; }  // int
}
