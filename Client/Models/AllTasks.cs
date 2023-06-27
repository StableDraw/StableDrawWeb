using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CLI.Models;

public class AllTasks
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }  // Первичный ключ

    [Required]
    [ForeignKey("UserTasksId")]
    public int UserTasksId { get; set; }  // обязательное
    public UserTasks? UserTasks { get; set; }  // Навигационное свойство

    [Required]
    [ForeignKey("UserStatusId")]
    public int UserStatusId { get; set; }  // обязательное
    public UserStatus? UserStatus { get; set; }  // Навигационное свойство

    public int PrevLinkId { get; set; }  // Id предыдущей генерации, по умолчанию = TaskId
    public int TechTaskType { get; set; }  // тип задания нейронки, обязательное поле, хранит либо числовое, либо строковое id типа задания, выполненного нейронкой

    [ForeignKey("AllResultsId")]
    public int? AllResultsId { get; set; }  // либо null, Id CommonResultId из таблицы AllResults
    public AllResults? AllResults { get; set; }  // Навигационное свойство
}
