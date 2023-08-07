using Microsoft.AspNetCore.Mvc;
using System.IO;
using Telegram.Bot;
using Telegram.Bot.Types;

namespace TelegramService.Controllers
{
    [ApiController]
    [Route("/[controller]/")]
    public class BotController : Controller
    {
        private TelegramBotClient bot = Bot.GetTelegramBot();
        private UpdateDistributor<CommandExecutor> updateDistributor = new UpdateDistributor<CommandExecutor>();

        [HttpPost]
        public async void Post([FromBody]Update update) //Сюда будут приходить апдейты
        {
            /*
            if (update.Type == Telegram.Bot.Types.Enums.UpdateType.Message) // при любом сообщении
            {
                long chatId = update.Message.From.Id;
                await bot.SendTextMessageAsync(chatId, "Привет!");
            }
            */
            
            if (update.Message == null) //и такое тоже бывает, делаем проверку
                return;

            await updateDistributor.GetUpdate(update);
        }
        
        [HttpGet]
        public string Get()
        {
            //Здесь мы пишем, что будет видно если зайти на адрес,
            //указаную в ngrok и launchSettings: http://localhost:25284/bot
            var me = bot.GetMeAsync().Result;
            
            var text = $"Telegram bot {me.Username} was started.";
            return text;
        }

    }
}
