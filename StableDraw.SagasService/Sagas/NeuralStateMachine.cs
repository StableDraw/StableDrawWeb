using MassTransit;
using MassTransit.Contracts;
using StableDraw.Contracts.NeuralContracts.Replies;
using StableDraw.Contracts.NeuralContracts.Requests;

namespace StableDraw.SagasService.Sagas;

public class NeuralStateMachine : MassTransitStateMachine<NeuralState>
{
    private readonly ILogger<NeuralStateMachine> _logger;
    
    public NeuralStateMachine(ILogger<NeuralStateMachine> logger)
    {
        _logger = logger;
        InstanceState(x => x.CurrentState);
        
        Event(() =>
            GenerateNeuralEvent, x =>
            x.CorrelateById(y => y.Message.OrderId));
        
        Request(() => GenerateNeural);
        
        Initially(WhenGenerateNeuralReceived());
        
        During(GenerateNeural.Pending,
            When(GenerateNeural.Completed).ThenAsync(async context =>
            {
                await RespondFromSaga(context, string.Empty);
            }).TransitionTo(Complete),
            When(GenerateNeural.Faulted).ThenAsync(async context =>
                {
                    await RespondFromSaga(context,
                        "Faulted On Generate " +
                        string.Join("; ", context.Message.Exceptions.Select(x => x.Message)));
                })
                .TransitionTo(Failed),
            When(GenerateNeural.TimeoutExpired).ThenAsync(async context =>
            {
                await RespondFromSaga(context, "Time Expired On Generate");
            }).TransitionTo(Failed));
    }
    
    public Request<NeuralState, INeuralRequest, INeuralReply> GenerateNeural { get; set; }
    public Event<NeuralRequest> GenerateNeuralEvent { get; set; }
    public State Failed { get; set; }
    public State Complete { get; set; }
    
    private EventActivityBinder<NeuralState, NeuralRequest> WhenGenerateNeuralReceived()
    {
        return When(GenerateNeuralEvent).Then(x =>
        {
            if (!x.TryGetPayload(out SagaConsumeContext<NeuralState, NeuralRequest> neuralGen))
                throw new Exception("Unable to retrieve required neuralGen for callback data.");
            x.Saga.RequestId = neuralGen.RequestId;
            x.Saga.ResponseAddress = neuralGen.ResponseAddress;
        }).Request(GenerateNeural, x => x.Init<INeuralRequest>(new
        {
            OrderId = x.Message.OrderId,
            NeuralType = x.Message.NeuralType,
            Prompts = x.Message.Prompts,
            Parameters = x.Message.Parameters,
            ImagesInput = x.Message.ImagesInput
        })).TransitionTo(GenerateNeural.Pending);
    }
    
    private static async Task RespondFromSaga<T>(BehaviorContext<NeuralState, T> context, string error) where T : class
    {
        var endpoint = await context.GetSendEndpoint(context.Saga.ResponseAddress);
        switch (context.Message)
        {
            case INeuralReply neuralReply:
                await endpoint.Send(new NeuralReply()
                {
                    OrderId = context.Saga.CorrelationId,
                    Images = neuralReply.Images,
                    NeuralType = neuralReply.NeuralType,
                    TextResult = neuralReply.TextResult,
                    ErrorMsg = neuralReply.ErrorMsg
                }, r => r.RequestId = context.Saga.RequestId);
                break;
            case Fault<INeuralRequest>:
                await endpoint.Send(new NeuralReply()
                {
                    OrderId = context.Saga.CorrelationId,
                    ErrorMsg = error
                }, r => r.RequestId = context.Saga.RequestId);
                break;
            case RequestTimeoutExpired<INeuralRequest>:
                await endpoint.Send(new NeuralReply()
                {
                    OrderId = context.Saga.CorrelationId,
                    ErrorMsg = error
                }, r => r.RequestId = context.Saga.RequestId);
                break;
            default:
                throw new Exception("Bad Response");
        }
    }
}