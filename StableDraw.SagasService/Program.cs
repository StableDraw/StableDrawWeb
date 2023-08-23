using MassTransit;
using MassTransit.EntityFrameworkCoreIntegration;
using Microsoft.EntityFrameworkCore;
using Serilog;
using StableDraw.SagasService;
using StableDraw.SagasService.Sagas;


var builder = WebApplication.CreateBuilder(args);
Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Debug()
    .Enrich.FromLogContext()
    .WriteTo.Console()
    // Add this line:
    .WriteTo.File(
        System.IO.Path.Combine("./", "logs", "diagnostics.txt"),
        rollingInterval: RollingInterval.Day,
        fileSizeLimitBytes: 10 * 1024 * 1024,
        retainedFileCountLimit: 2,
        rollOnFileSizeLimit: true,
        shared: true,
        flushToDiskInterval: TimeSpan.FromSeconds(1))
    .CreateLogger();
builder.Host.UseSerilog();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddDbContext<SagasDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("default")));
builder.Services.AddMassTransit(cfg =>
{
    cfg.SetKebabCaseEndpointNameFormatter();
    cfg.AddDelayedMessageScheduler();
    cfg.AddSagaStateMachine<MinIoSaga, MinIoSagaState>()
        .EntityFrameworkRepository(r =>
        {
            r.ConcurrencyMode = ConcurrencyMode.Pessimistic;
            r.ExistingDbContext<SagasDbContext>();
            r.LockStatementProvider = new PostgresLockStatementProvider();
        });
    cfg.UsingRabbitMq((brc, rbfc) =>
    {
        rbfc.UseMessageRetry(r => { r.Incremental(3, TimeSpan.FromSeconds(1), TimeSpan.FromSeconds(1)); });
        rbfc.UseDelayedMessageScheduler();
        rbfc.Host("localhost", h =>
        {
            h.Username("rmuser");
            h.Password("rmpassword");
        });
        rbfc.ConfigureEndpoints(brc);
    });
});


var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<SagasDbContext>();
    db.Database.Migrate();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();


//app.MapGet("/", () => "Hello World!");

app.Run();