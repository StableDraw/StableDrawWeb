var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Установить wehook при помощи ngrok:
//https://api.telegram.org/bot{my_bot_token}/setWebhook?url={url_to_send_updates_to}/bot
//url_to_send_updates_to=ссылка ngrok напротив Forwadding (запустить ngrok:./ngrok http --host-header=localhost 25284)


builder.Services.AddControllers().AddNewtonsoftJson(); //<- вот сюда

//builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
