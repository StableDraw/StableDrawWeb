using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CLI.Models;

public class UserTasks
{
    [Key]
    public int Id { get; set; }  // Первичный ключ

    [Required(ErrorMessage = "UserStatusId is required.")]
    [ForeignKey("UserStatusId")]
    public int UserStatusId { get; set; }  // Внешний ключ
    public UserStatus? UserStatus { get; set; }  // Навигационное свойство

    [Required]
    public int LastLinkId { get; set; }  // обязательное, AllTasks GenID последней генерации в цепочке

    [Required]
    public int UserTaskType { get; set; }  // тип задания, обязательное поле, хранит либо числовое, либо строковое id типа задания, которое заказал пользователь

    public int? ResultImgId { get; set; }  // это Id итогового изображения из таблицы AllImgs либо null

    public int? ResultCaptionId { get; set; }  // либо null это Id итогового изображения из таблицы AllCaptions

    public int UserSettingsKey { get; set; }  // MinIO ключ
}
