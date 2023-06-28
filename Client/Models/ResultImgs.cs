using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Drawing;

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

    [NotMapped]
    public Color ClrRGBANotMapped { get; set; }
    public Int32 ClrRGBA { get { return ClrRGBANotMapped.ToArgb(); } set { ClrRGBANotMapped = Color.FromArgb(value); } }

    [NotMapped]
    public float[] ScaleXYNotMapped { get; set; }

    public string ScaleXY
    {
        get
        {
            return $"{ScaleXYNotMapped[0].ToString()};{ScaleXYNotMapped[1].ToString()}";
        }
        set
        {
            float tmp1 = 0, tmp2 = 0;
            string[] data = value.Split(";");

            if (data.Length >= 2)
            {
                float.TryParse(data[0], out tmp1);
                float.TryParse(data[1], out tmp2);
            }

            ScaleXYNotMapped = new float[2] { tmp1, tmp2 };
        }
    }

    [NotMapped]
    public float[] PositionXYNotMapped { get; set; }

    public string PositionXY
    {
        get
        {
            return $"{PositionXYNotMapped[0].ToString()};{PositionXYNotMapped[1].ToString()}";
        }
        set
        {
            float tmp1 = 0, tmp2 = 0;
            string[] data = value.Split(";");

            if (data.Length >= 2)
            {
                float.TryParse(data[0], out tmp1);
                float.TryParse(data[1], out tmp2);
            }

            PositionXYNotMapped = new float[2] { tmp1, tmp2 };
        }
    }
}
