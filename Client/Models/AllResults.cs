using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CLI.Models;

public class AllResults
{
    [Key]
    public int Id { get; set; }  // Первичный ключ

    public int ResultType { get; set; }  // изображение, текст или параметры

    public int ResultId { get; set; }  // Id результата уже в своей таблице (если Img, то PicId в таблице AllImgs и т.д.)
}
