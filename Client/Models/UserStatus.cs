using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CLI.Models;

public class UserStatus
{
    [Key]
    public int Id { get; set; }  // Первичный ключ

    public int GenLeft { get; set; }  // сколько генераций осталось

    [DataType(DataType.Date)]
    public DateTime LastGenTime { get; set; }  // Время последней генерации

    public bool HasSub { get; set; }  // Есть ли у него подписка

    [DataType(DataType.Date)]
    public DateTime SubLeftTime { get; set; }  // Время истечения подписки

    public bool IsDesignAccess { get; set; }  // Есть ли доступ к секции design
}
