I. использование ngrok

1) скачать ngrok.exe в проект
2) запустить ngrok командой:
./ngrok http <url>
./ngrok http http://localhost:25284
ЛИБО
./ngrok http --host-header=localhost 25284
3) коннект с вашим аккаунтом ngrok (нужно зарегистрироваться в ngrok)
 ngrok config add-authtoken 2TI8pMVIpMP8eI0cPGiih04mP0i_6ZCr8Ai4m21YBCDuZv8iB
=> создается файл ngrok.yml

II. Установить wehook при помощи ngrok

1) перейти по ссылке = установить wehook
https://api.telegram.org/bot{my_bot_token}/setWebhook?url={url_to_send_updates_to}/bot
где
url_to_send_updates_to=ссылка ngrok напротив Forwadding (запустить ngrok:./ngrok http --host-header=localhost 25284)
my_bot_token = Токен бота (в BotFather)
/bot = путь, установленный в BotController