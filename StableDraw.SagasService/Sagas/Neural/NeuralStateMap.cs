using MassTransit;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace StableDraw.SagasService.Sagas.Neural;

public sealed class NeuralStateMap : SagaClassMap<NeuralState>
{
    protected override void Configure(EntityTypeBuilder<NeuralState> entity, ModelBuilder model)
    {
        base.Configure(entity, model);
        entity.Property(x => x.CurrentState).HasMaxLength(255);
    }
}