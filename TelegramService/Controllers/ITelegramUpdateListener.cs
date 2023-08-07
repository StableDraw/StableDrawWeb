using Telegram.Bot.Types;

namespace TelegramService.Controllers
{
    public interface ITelegramUpdateListener
    {//метод GetUpdate, в который мы будем передавать апдейты. new() нам нужен, чтобы создавать экземпляры типа T
        public async Task GetUpdate(Update update) { }
    }
}
