using GreenPipes;
using MassTransit;
using Microsoft.EntityFrameworkCore;
using Serilog;
using StableDraw.Domain.UnitsOfWork;
using StableDraw.MinIOService.Consumers;
using StableDraw.MinIOService.Data;
using StableDraw.MinIOService.Services;
using StableDraw.MinIOService.Settings;
using IHost = Microsoft.Extensions.Hosting.IHost;

IHost host = Host.CreateDefaultBuilder(args)
    .ConfigureAppConfiguration((hostingContext, config) =>
    {
        config.AddJsonFile("appsettings.json", optional: true);
        config.AddJsonFile("credentials.json");
        config.AddEnvironmentVariables();

        config.AddCommandLine(args);
    })
    .ConfigureServices((hostContext, services) =>
    {
        services.AddOptions<MinIOSettings>().Configure(o =>
        {
            o.AccessKey = hostContext.Configuration.GetSection("accessKey").Value ?? throw new ArgumentNullException();
            o.Address = hostContext.Configuration.GetSection("MinIOSettings:Address").Value!;
            o.BucketName = hostContext.Configuration.GetSection("MinIOSettings:BucketName").Value!;
            o.SecretKey = hostContext.Configuration.GetSection("secretKey").Value ?? throw new ArgumentNullException();
        });
        //services.Configure<MinIOSettings>(hostContext.Configuration.GetSection("MinIOSettings"));
        services.Configure<AppConfig>(hostContext.Configuration.GetSection("AppConfig"));
        services.Configure<EndpointConfig>(hostContext.Configuration.GetSection("EndpointConfig"));

        services.AddDbContext<MinIODbContext>(options => options.UseSqlite(hostContext.Configuration.GetConnectionString("DefaultConnection")));

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
                rbfc.Host("localhost", "/",h =>
                {
                    h.Username("rmuser");
                    h.Password("rmpassword");
                });
                rbfc.ConfigureEndpoints(brc);
            });
        }).AddMassTransitHostedService();

        services.AddTransient<IMinIoService, MinIoService>();
        services.AddScoped<IUnitOfWork, UnitOfWork>();
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