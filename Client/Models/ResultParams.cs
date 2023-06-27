using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CLI.Models;

public class ResultParams
{
    [Key]
    public int ID { get; set; }

    public int ImgClass { get; set; }  // Цифра от 0 до 5

    public bool IsBW { get; set; }  // bool

    public int? GenParamsKey { get; set; }  // MinIO ключ от json с параметрами генерации, если были изменены, иначе null
}
