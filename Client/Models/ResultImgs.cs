using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CLI.Models;

public class ResultImgs
{
    [Key]
    public int Id { get; set; }  // Первичный ключ

    public int ResultPicId { get; set; }  // PicId той, которая IsReady == True из таблицы AllImgs
    public int ResultParamsId { get; set; }  // либо null
    public int InitImgID { get; set; }  // Изначально = ResultPicId
    public bool IsDrawing { get; set; }  // bool
    public bool IsDrawingSure { get; set; }  // bool
    public int PrimsCount { get; set; }  // int
    public int DotsCount { get; set; }  // int
    public bool NeedRestore { get; set; }  // bool
    // public bool ClrRGBA { get; set; }  // int array[4]
    // public bool ScaleXY { get; set; }  // int turple(2)
    // public bool PositionXY { get; set; }  // int turple(2)
}
