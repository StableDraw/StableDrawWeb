using Telegram.Bot.Types;
using Telegram.Bot;

namespace TelegramService.Commands
{
    public interface ICommand
    {
        public TelegramBotClient Client { get; }

        public string Name { get; }

        public async Task Execute(Update update) { }
    }
}
