using GreenPipes;
using MassTransit;
using Serilog;
using StableDraw.MinIOService.Consumers;
using StableDraw.MinIOService.Services;
using StableDraw.MinIOService.Settings;
using IHost = Microsoft.Extensions.Hosting.IHost;

IHost host = Host.CreateDefaultBuilder(args)
    .ConfigureAppConfiguration((hostingContext, config) =>
    {
        config.AddJsonFile("appsettings.json", optional: true);
        config.AddEnvironmentVariables();

        config.AddCommandLine(args);
    })
    .ConfigureServices((hostContext ,services) =>
    {
        services.Configure<MinIOSettings>(hostContext.Configuration.GetSection("MinIOSettings"));
        services.Configure<AppConfig>(hostContext.Configuration.GetSection("AppConfig"));
        services.Configure<EndpointConfig>(hostContext.Configuration.GetSection("EndpointConfig"));

        services.AddMassTransit(cfg =>
        {
            cfg.SetKebabCaseEndpointNameFormatter();
            cfg.AddDelayedMessageScheduler();
            cfg.AddConsumer<DeleteObjectConsumer>();
            cfg.AddConsumer<DeleteObjectsConsumer>();
            cfg.AddConsumer<PutObjectConsumer>();
            cfg.AddConsumer<PutObjectsConsumer>();
            cfg.AddConsumer<GetObjectConsumer>();
            cfg.AddConsumer<GetObjectsConsumer>();
            cfg.UsingRabbitMq((brc, rbfc) =>
            {
                rbfc.UseMessageRetry(r =>
                {
                    r.Incremental(3, TimeSpan.FromSeconds(1), TimeSpan.FromSeconds(1));
                });
                rbfc.UseDelayedMessageScheduler();
                rbfc.Host("localhost", h =>
                {
                    h.Username("rmuser");
                    h.Password("rmpassword");
                });
                rbfc.ConfigureEndpoints(brc);
            });
        }).AddMassTransitHostedService();
        
        services.AddTransient<IMinIoService, MinIoService>();
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
    })
    .Build();

host.Run();