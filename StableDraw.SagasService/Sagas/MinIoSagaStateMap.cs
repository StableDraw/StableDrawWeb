using MassTransit;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace StableDraw.SagasService.Sagas;

public class MinIoSagaStateMap : SagaClassMap<MinIoSagaState>
{
    protected override void Configure(EntityTypeBuilder<MinIoSagaState> entity, ModelBuilder model)
    {
        base.Configure(entity, model);
        entity.Property(x => x.CurrentState).HasMaxLength(255);
    }
}