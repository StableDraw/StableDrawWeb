using MassTransit;
using MassTransit.EntityFrameworkCoreIntegration;
using Microsoft.EntityFrameworkCore;
using Serilog;
using StableDraw.SagasService;
using StableDraw.SagasService.Sagas;
using IHost = Microsoft.Extensions.Hosting.IHost;

IHost host = Host.CreateDefaultBuilder(args)
    .ConfigureAppConfiguration((hostingContext, config) =>
    {
        config.AddJsonFile("appsettings.json", optional: true);
        config.AddEnvironmentVariables();

        if (args != null)
            config.AddCommandLine(args);
    })
    .ConfigureServices((hostContext, services) =>
    {
        services.AddDbContext<SagasDbContext>(options =>
            options.UseSqlite(hostContext.Configuration.GetConnectionString("default")));

        services.AddMassTransit(cfg =>
        {
            cfg.SetKebabCaseEndpointNameFormatter();
            cfg.AddDelayedMessageScheduler();
            cfg.AddSagaStateMachine<MinIoStateMachine, MinIoState>()
                .EntityFrameworkRepository(r =>
                {
                    r.ConcurrencyMode = ConcurrencyMode.Pessimistic;
                    r.ExistingDbContext<SagasDbContext>();
                    r.LockStatementProvider = new SqliteLockStatementProvider();
                });
            cfg.AddSagaStateMachine<NeuralStateMachine, NeuralState>().EntityFrameworkRepository(r =>
            {
                r.ConcurrencyMode = ConcurrencyMode.Pessimistic;
                r.ExistingDbContext<SagasDbContext>();
                r.LockStatementProvider = new SqliteLockStatementProvider();
            });
            cfg.UsingRabbitMq((brc, rbfc) =>
            {
                rbfc.UseInMemoryOutbox();
                //rbfc.UseMessageRetry(r => { r.Incremental(3, TimeSpan.FromSeconds(1), TimeSpan.FromSeconds(1)); });
                rbfc.UseDelayedMessageScheduler();
                rbfc.Host("localhost", h =>
                {
                    h.Username("rmuser");
                    h.Password("rmpassword");
                });
                rbfc.ConfigureEndpoints(brc);
            });
        });

    })
    .UseSerilog((context, configuration) =>
    {
        configuration.MinimumLevel.Debug()
            .Enrich.FromLogContext()
            .WriteTo.Console()
            .WriteTo.File(
                System.IO.Path.Combine("./", "logs", "diagnostics.txt"),
                rollingInterval: RollingInterval.Day,
                fileSizeLimitBytes: 10 * 1024 * 1024,
                retainedFileCountLimit: 2,
                rollOnFileSizeLimit: true,
                shared: true,
                flushToDiskInterval: TimeSpan.FromSeconds(1));
    }).Build();

// using (var scope = host.Services.CreateScope())
// {
//     var db = scope.ServiceProvider.GetRequiredService<SagasDbContext>();
//     db.Database.Migrate();
// }

host.Run();