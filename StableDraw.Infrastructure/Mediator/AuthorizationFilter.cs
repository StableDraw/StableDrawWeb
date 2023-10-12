using MassTransit;

namespace StableDraw.Infrastructure.Mediator;

public class AuthorizationFilter<T> : IFilter<SendContext<T>>
    where T : class
{
    public void Probe(ProbeContext context)
    {
    }

    public async Task Send(SendContext<T> context, IPipe<SendContext<T>> next)
    {
        await next.Send(context);
    }
}