using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CLI.Models;

public class ResultCaptions
{
    [Key]
    public int Id { get; set; }

    public int ResultTextId { get; set; }  // TextId той, которая Lang == "en" из таблицы AllCaptions
    public int InitTextId { get; set; }  // Изначально = ResultTextId
    public bool IsInitEng { get; set; }  // bool
    public bool IsFinalEng { get; set; }  // bool
    public bool IsHuman { get; set; }  // bool
}
