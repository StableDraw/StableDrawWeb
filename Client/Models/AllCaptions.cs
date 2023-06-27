using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CLI.Models;

public class AllCaptions
{
    [Key]
    public int Id { get; set; }  // Первичный ключ

    public string? Lang { get; set; }  // Язык (string)

    public int CaptionKey { get; set; }  // MinIO key
}
