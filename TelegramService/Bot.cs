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
            client = new TelegramBotClient("6648603010:AAEeTZT63Cy3p6ys-iQKs6EUV4gVkvauc8Y"); // ЗАПОЛНИТЬ
            return client;
        }
    }
}
