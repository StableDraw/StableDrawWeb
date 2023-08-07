using Telegram.Bot.Types;

namespace TelegramService.Controllers
{
    public interface IListener
    {
        public async Task GetUpdate(Update update) { }

        public CommandExecutor Executor { get; }
    }
}
