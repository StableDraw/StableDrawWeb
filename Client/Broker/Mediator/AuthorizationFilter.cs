using MassTransit;

namespace CLI.Broker.Mediator;

public class AuthorizationFilter<T> : IFilter<SendContext<T>>
    where T: class
{
    public async Task Send(SendContext<T> context, IPipe<SendContext<T>> next)
    {
        await next.Send(context);
    }

    public void Probe(ProbeContext context)
    {
    }
}