using Automatonymous;
using MassTransit;
using StableDraw.Contracts;

namespace StableDraw.SagasService.Sagas;

public sealed class MinIoSaga : MassTransitStateMachine<MinIoSagaState>
{
    private readonly ILogger<MinIoSaga> _logger;
    
    public MinIoSaga(ILogger<MinIoSaga> logger)
    {
        _logger = logger;
        InstanceState(x => x.CurrentState);
        
        Event(() => 
            GetObjectEvent, x => 
            x.CorrelateById(y => y.Message.OrderId));

        Event<PutObjectMinIoRequest>(() =>
            PutObjectEvent, x =>
            x.CorrelateById(y => y.Message.OrderId));
        
        Event<DeleteObjectMinIoRequest>(() =>
            DeleteObjectEvent, x =>
            x.CorrelateById(y => y.Message.OrderId));

        Request(() => GetObject);
        Request(() => PutObject);
        Request(() => DeleteObject);
                
        Initially
        (
            When(GetObjectEvent).Then(x =>
            {
                if (!x.TryGetPayload(out SagaConsumeContext<MinIoSagaState, GetObjectMinIoRequest> getImage))
                    throw new Exception("Unable to retrieve required getImage for callback data.");
                x.Saga.RequestId = getImage.RequestId;
                x.Saga.ResponseAddress = getImage.ResponseAddress;

            }).Request(GetObject, x => x.Init<IGetObjectRequest>(new
            {
                OrderId = x.Message.OrderId,
                ObjectId = x.Message.ObjectId
            })).TransitionTo(GetObject.Pending),
            
            When(PutObjectEvent).Then(x =>
            {
                if (!x.TryGetPayload(out SagaConsumeContext<MinIoSagaState, PutObjectMinIoRequest> putImage))
                    throw new Exception("Unable to retrieve required getImage for callback data.");
                x.Saga.RequestId = putImage.RequestId;
                x.Saga.ResponseAddress = putImage.ResponseAddress;
            
            }).Request(PutObject, x => x.Init<IPutObjectRequest>(new
            {
                OrderId = x.Message.OrderId,
                ObjectId = x.Message.ObjectId,
                Data = x.Message.Data
            })).TransitionTo(PutObject.Pending),
            
            When(DeleteObjectEvent).Then(x =>
            {
                if (!x.TryGetPayload(out SagaConsumeContext<MinIoSagaState, DeleteObjectMinIoRequest> deleteImage))
                    throw new Exception("Unable to retrieve required getImage for callback data.");
                x.Saga.RequestId = deleteImage.RequestId;
                x.Saga.ResponseAddress = deleteImage.ResponseAddress;
            
            }).Request(DeleteObject, x => x.Init<IDeleteObjectRequest>(new
            {
                OrderId = x.Message.OrderId,
                ObjectId = x.Message.ObjectId
            })).TransitionTo(DeleteObject.Pending)
        );
        
        During(GetObject.Pending, 
            When(GetObject.Completed).ThenAsync(async context =>
            {
                await RespondFromSaga(context, string.Empty);
            }).Finalize(),
            When(GetObject.Faulted)
                .ThenAsync(async context =>
                {
                    await RespondFromSaga(context, "Faulted On Get Objects " + string.Join("; ", context.Message.Exceptions.Select(x => x.Message)));
                })
                .TransitionTo(Failed),

            When(GetObject.TimeoutExpired)
                .ThenAsync(async context =>
                {
                    await RespondFromSaga(context, "Timeout Expired On Get Objects");
                })
                .TransitionTo(Failed)
        );
        
        During(PutObject.Pending, 
            When(PutObject.Completed).ThenAsync(async context =>
            {
                await RespondFromSaga(context, string.Empty);
            }).Finalize(),
            When(PutObject.Faulted)
                .ThenAsync(async context =>
                {
                    await RespondFromSaga(context, "Faulted On Put Objects " + string.Join("; ", context.Message.Exceptions.Select(x => x.Message)));
                })
                .TransitionTo(Failed),

            When(PutObject.TimeoutExpired)
                .ThenAsync(async context =>
                {
                    await RespondFromSaga(context, "Timeout Expired On Put Objects");
                })
                .TransitionTo(Failed)
        );
        
        During(DeleteObject.Pending, 
            When(DeleteObject.Completed).ThenAsync(async context =>
            {
                await RespondFromSaga(context, string.Empty);
            }).Finalize(),
            When(DeleteObject.Faulted)
                .ThenAsync(async context =>
                {
                    await RespondFromSaga(context, "Faulted On Delete Objects " + string.Join("; ", context.Message.Exceptions.Select(x => x.Message)));
                })
                .TransitionTo(Failed),

            When(DeleteObject.TimeoutExpired)
                .ThenAsync(async context =>
                {
                    await RespondFromSaga(context, "Timeout Expired On Delete Objects");
                })
                .TransitionTo(Failed)
        );
    }
    
    public Request<MinIoSagaState, IGetObjectRequest, IGetObjectReply> GetObject { get; set; }
    public Request<MinIoSagaState, IPutObjectRequest, IPutObjectReply> PutObject { get; set; }
    public Request<MinIoSagaState, IDeleteObjectRequest, IDeleteObjectReply> DeleteObject { get; set; }

    public Event<GetObjectMinIoRequest> GetObjectEvent { get; set; }
    public Event<PutObjectMinIoRequest> PutObjectEvent { get; set; }
    public Event<DeleteObjectMinIoRequest> DeleteObjectEvent { get; set; }
    public State Failed { get; set; }
    private static async Task RespondFromSaga<T>(BehaviorContext<MinIoSagaState, T> context, string error) where T : class
    {
        try
        {
            var endpoint = await context.GetSendEndpoint(context.Saga.ResponseAddress);
            await endpoint.Send(new
            {
                OrderId = context.Saga.CorrelationId,
                ErrorMessage = error
            }, r => r.RequestId = context.Saga.RequestId);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}