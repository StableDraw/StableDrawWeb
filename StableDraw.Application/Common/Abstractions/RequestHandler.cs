using MassTransit;
using MediatR;

namespace StableDraw.Application.Common.Abstractions;

public abstract class RequestHandler<TRequest, TResponse> : IConsumer<TRequest>, IRequestHandler<TRequest, TResponse>
where TRequest : class, IRequest<TResponse>
where TResponse : class
{
    public async Task Consume(ConsumeContext<TRequest> context)
    {
        var validationResult = await Validate(context.Message, context.CancellationToken);
        if (validationResult.Errors.Any())
        {
            await context.RespondAsync(validationResult);
            return;
        }
        
        var response = await Handle(context.Message, context.CancellationToken).ConfigureAwait(false);
        await context.RespondAsync(response);
    }
    
    protected virtual Task<ValidationErrors> Validate(TRequest request, CancellationToken token)
    {
        return Task.FromResult(new ValidationErrors());
    }

    public abstract Task<TResponse> Handle(TRequest request, CancellationToken cancellationToken);
}
