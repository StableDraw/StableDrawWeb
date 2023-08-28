using MassTransit;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace StableDraw.SagasService.Sagas;

public sealed class SagaStateMap : SagaClassMap<SagaState>
{
    protected override void Configure(EntityTypeBuilder<SagaState> entity, ModelBuilder model)
    {
        base.Configure(entity, model);
        entity.Property(x => x.CurrentState).HasMaxLength(255);
    }
}