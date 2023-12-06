using StableDraw.Domain.Data.Identity;

namespace CLI.Services
{
    public class TimerHostedUpdateDbService : BackgroundService
    {
        private readonly ILogger<TimerHostedUpdateDbService> _logger;
        private readonly ApplicationDbContext _context;
        
        public TimerHostedUpdateDbService(ApplicationDbContext context, ILogger<TimerHostedUpdateDbService> looger)
        {
            _context = context;
            _logger = looger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Timed Hosted Service running.");

            await DoWorkAsync();

            using PeriodicTimer timer = new(TimeSpan.FromDays(1));

            try
            {
                while(await timer.WaitForNextTickAsync(stoppingToken))
                {
                    await DoWorkAsync();
                }
            }
            catch (OperationCanceledException)
            {
                _logger.LogInformation("Timed Hosted Service is stopping.");
            }
        }

        private async Task DoWorkAsync()
        {
            foreach(var user in _context.Users)
            {
                user.GenerationCount = 0;
            }
            await _context.SaveChangesAsync();
        }
    }
}
