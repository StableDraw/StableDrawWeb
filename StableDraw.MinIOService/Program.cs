using GreenPipes;
using MassTransit;
using Serilog;
using StableDraw.MinIOService.Consumers;
using StableDraw.MinIOService.Services;
using StableDraw.MinIOService.Settings;
using IHost = Microsoft.Extensions.Hosting.IHost;

IHost host = Host.CreateDefaultBuilder(args)
    .ConfigureAppConfiguration((context, configuration) =>
    {
        configuration.AddJsonFile("appsettings.json", optional: true);
        configuration.AddJsonFile("credentals.json");
        configuration.AddEnvironmentVariables();

        configuration.AddCommandLine(args);
    })
    .ConfigureServices((context, services) =>
    {
        services.AddOptions<MinIOSettings>().Configure(o =>
        {
            o.AccessKey = context.Configuration.GetSection("accessKey").Value ?? throw new ArgumentNullException();
            o.Address = context.Configuration.GetSection("MinIOSettings:Address").Value!;
            o.BucketName = context.Configuration.GetSection("MinIOSettings:BucketName").Value!;
            o.SecretKey = context.Configuration.GetSection("secretKey").Value ?? throw new ArgumentNullException();
        });
        //services.Configure<MinIOSettings>(hostContext.Configuration.GetSection("MinIOSettings"));
        services.Configure<AppConfig>(context.Configuration.GetSection("AppConfig"));
        services.Configure<EndpointConfig>(context.Configuration.GetSection("EndpointConfig"));

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
                rbfc.Host("rabbitmq", 5672, "/", h =>
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