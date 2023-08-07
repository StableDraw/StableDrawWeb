using Telegram.Bot.Types;
using Telegram.Bot;
using System.IO;

namespace TelegramService.Commands
{
    public class SendFileCommand: ICommand
    {
        public TelegramBotClient Client => Bot.GetTelegramBot();

        public string Name => "/pic";

        public async Task Execute(Update update)
        {
            long chatId = update.Message.Chat.Id;
            string path = "C:\\Users\\1392680\\source\\repos\\TelegramService\\";// Изменить

            /* 2 - отправка файла (фотографии в виде файла) */
            string picture = "pic.jpg";
            await using Stream stream = System.IO.File.OpenRead(path + picture);
            await Client.SendDocumentAsync(
                chatId: chatId,
                document: InputFile.FromStream(stream: stream, fileName: "picture.jpg"),//назание файла
                caption: "Pic");
            /*
            await Client.SendPhotoAsync(
                        chatId,
                        InputFileId.FromUri("https://bugaga.ru/uploads/posts/2022-08/1660840053_priroda-4.jpg"));

            await Client.SendPhotoAsync(
                        chatId: chatId,
                        photo: InputFile.FromStream(stream: stream, fileName: "picture.jpg"),//назание файла
                        caption: "Pic");
            */
        }
    }
}
