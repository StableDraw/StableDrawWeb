using GreenPipes;
using MassTransit;
using StableDraw.MinIOService.Consumers;
using StableDraw.MinIOService.Services;
using StableDraw.MinIOService.Settings;
using IHost = Microsoft.Extensions.Hosting.IHost;

IHost host = Host.CreateDefaultBuilder(args)
    .ConfigureAppConfiguration((hostingContext, config) =>
    {
        config.AddJsonFile("appsettings.json", optional: true);
        config.AddEnvironmentVariables();

        if (args != null)
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
            cfg.AddConsumer<PutObjectConsumer>();
            cfg.AddConsumer<GetObjectConsumer>();
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
    .ConfigureLogging((hostingContext, logging) =>
    {
        logging.AddConfiguration(hostingContext.Configuration.GetSection("Logging"));
        logging.AddConsole();
    })
    .Build();

host.Run();