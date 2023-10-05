using MassTransit;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace StableDraw.SagasService.Sagas.Render
{
    public sealed class RenderStateMap : SagaClassMap<RenderState>
    {
        protected override void Configure(EntityTypeBuilder<RenderState> entity, ModelBuilder model)
        {
            base.Configure(entity, model);
            entity.Property(x => x.CurrentState).HasMaxLength(255);
        }
    }
}
