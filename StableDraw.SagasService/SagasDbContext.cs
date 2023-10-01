using MassTransit.EntityFrameworkCoreIntegration;
using Microsoft.EntityFrameworkCore;
using StableDraw.SagasService.Sagas;
using StableDraw.SagasService.Sagas.Render;

namespace StableDraw.SagasService;

public sealed class SagasDbContext : SagaDbContext
{
    public SagasDbContext(DbContextOptions options) : base(options)
    {
        Database.Migrate();
    }

    protected override IEnumerable<ISagaClassMap> Configurations => new ISagaClassMap[]
    {
        new MinIoStateMap(),
        new NeuralStateMap(),
        new RenderStateMap()
    };
    
    
}