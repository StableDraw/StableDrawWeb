using MassTransit.EntityFrameworkCoreIntegration;
using Microsoft.EntityFrameworkCore;
using StableDraw.SagasService.Sagas;

namespace StableDraw.SagasService;

public class SagasDbContext : SagaDbContext
{
    public SagasDbContext(DbContextOptions options) : base(options)
    {
    }

    protected override IEnumerable<ISagaClassMap> Configurations => new ISagaClassMap[]
    {
        new MinIoSagaStateMap()
    };
}