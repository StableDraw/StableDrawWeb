using Telegram.Bot;

namespace TelegramService
{
    public class Bot  //паттерн Singleton
    {
        private static TelegramBotClient client { get; set; }

        public static TelegramBotClient GetTelegramBot()
        {
            if (client != null)
            {
                return client;
            }
            client = new TelegramBotClient("ваш токен"); // ЗАПОЛНИТЬ
            return client;
        }
    }
}
