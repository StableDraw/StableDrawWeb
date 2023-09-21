using MassTransit;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace StableDraw.SagasService.Sagas;

public sealed class MinIoStateMap : SagaClassMap<MinIoState>
{
    protected override void Configure(EntityTypeBuilder<MinIoState> entity, ModelBuilder model)
    {
        base.Configure(entity, model);
        entity.Property(x => x.CurrentState).HasMaxLength(255);
    }
}