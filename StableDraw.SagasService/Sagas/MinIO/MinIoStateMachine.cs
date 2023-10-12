using MassTransit;
using MassTransit.Contracts;
using StableDraw.Contracts.MInIoContracts.Replies;
using StableDraw.Contracts.MInIoContracts.Requests;

namespace StableDraw.SagasService.Sagas.MinIO;

public sealed partial class MinIoStateMachine : MassTransitStateMachine<MinIoState>
{
    private readonly ILogger<MinIoStateMachine> _logger;

    public MinIoStateMachine(ILogger<MinIoStateMachine> logger)
    {
        _logger = logger;
        BuildStateMachine();
        Initially
        (
            WhenGetObjectsReceived(),
            WhenPutObjectsReceived(),
            WhenDeleteObjectsReceived()
        );

        #region during
        During(PutObjects.Pending,
            When(PutObjects.Completed).ThenAsync(async context =>
            {
                await RespondFromSaga(context, string.Empty);
            }).TransitionTo(Complete),
            When(PutObjects.Faulted)
                .ThenAsync(async context =>
                {
                    await RespondFromSaga(context, "Faulted On Put Objects " + string.Join("; ", context.Message.Exceptions.Select(x => x.Message)));
                })
                .TransitionTo(Failed),
            When(PutObjects.TimeoutExpired).ThenAsync(async context =>
            {
                await RespondFromSaga(context, "TimeOut On Put Objects");
            }).TransitionTo(Failed));
        
        During(DeleteObjects.Pending,
            When(DeleteObjects.Completed).ThenAsync(async context =>
            {
                await RespondFromSaga(context, string.Empty);
            }).TransitionTo(Complete),
            When(DeleteObjects.Faulted)
                .ThenAsync(async context =>
                {
                    await RespondFromSaga(context,
                        "Faulted On Delete Objects " +
                        string.Join("; ", context.Message.Exceptions.Select(x => x.Message)));
                })
                .TransitionTo(Failed),
            When(DeleteObjects.TimeoutExpired).ThenAsync(async context =>
            {
                await RespondFromSaga(context, "TimeOut On Delete Objects");
            }).TransitionTo(Failed));

        During(GetObjects.Pending,
            When(GetObjects.Completed).ThenAsync(async context =>
            {
                await RespondFromSaga(context, string.Empty);
            }).TransitionTo(Complete),
            When(GetObjects.Faulted)
                .ThenAsync(async context =>
                {
                    await RespondFromSaga(context,
                        "Faulted On Get Objects " +
                        string.Join("; ", context.Message.Exceptions.Select(x => x.Message)));
                })
                .TransitionTo(Failed),
            When(GetObjects.TimeoutExpired).ThenAsync(async context =>
            {
                await RespondFromSaga(context, "TimeOut On Get Objects");
            }).TransitionTo(Failed));
        #endregion
    }

    #region event activites
    private EventActivityBinder<MinIoState, PutObjectsMinIoRequest> WhenPutObjectsReceived()
    {
        return When(PutObjectsEvent).Then(x =>
        {
            if (!x.TryGetPayload(out SagaConsumeContext<MinIoState, PutObjectsMinIoRequest> putImage))
                throw new Exception("Unable to retrieve required getImage for callback data.");
            x.Saga.RequestId = putImage.RequestId;
            x.Saga.ResponseAddress = putImage.ResponseAddress;

        }).Request(PutObjects, x => x.Init<IPutObjectsRequest>(new
        {
            x.Message.OrderId,
            x.Message.DataDictionary
        })).TransitionTo(PutObjects.Pending);
    }
    
    private EventActivityBinder<MinIoState, GetObjectsMinIoRequest> WhenGetObjectsReceived()
    {
        return When(GetObjectsEvent).Then(x =>
        {
            if (!x.TryGetPayload(out SagaConsumeContext<MinIoState, GetObjectsMinIoRequest> getImage))
                throw new Exception("Unable to retrieve required getImage for callback data.");
            x.Saga.RequestId = getImage.RequestId;
            x.Saga.ResponseAddress = getImage.ResponseAddress;

        }).Request(GetObjects, x => x.Init<IGetObjectsRequest>(new
        {
            x.Message.OrderId,
            x.Message.UserId
            
        })).TransitionTo(GetObjects.Pending);
    }
    
    private EventActivityBinder<MinIoState, DeleteObjectsMinIoRequest> WhenDeleteObjectsReceived()
    {
        return When(DeleteObjectsEvent).Then(x =>
        {
            if (!x.TryGetPayload(out SagaConsumeContext<MinIoState, DeleteObjectsMinIoRequest> deleteImage))
                throw new Exception("Unable to retrieve required getImage for callback data.");
            x.Saga.RequestId = deleteImage.RequestId;
            x.Saga.ResponseAddress = deleteImage.ResponseAddress;
            
        }).Request(DeleteObjects, x => x.Init<IDeleteObjectsRequest>(new
        {
            x.Message.OrderId,
            x.Message.UserId
        })).TransitionTo(DeleteObjects.Pending);
    }
    #endregion

    private static async Task RespondFromSaga<T>(BehaviorContext<MinIoState, T> context, string error) where T : class
    {
        var endpoint = await context.GetSendEndpoint(context.Saga.ResponseAddress);
        switch (context.Message)
        {
            case IPutObjectsReply:
                await endpoint.Send(
                    new PutObjectsMinIoReply()
                    {
                        OrderId = context.Saga.CorrelationId
                    }, r => r.RequestId = context.Saga.RequestId);
                break;
            case Fault<IPutObjectsRequest>:
            case RequestTimeoutExpired<IPutObjectsRequest>:
                await endpoint.Send(
                    new PutObjectsMinIoReply()
                    {
                        OrderId = context.Saga.CorrelationId,
                        ErrorMsg = error
                    }, r => r.RequestId = context.Saga.RequestId);
                break;
            case IGetObjectsReply getObjectsReply:
                await endpoint.Send(
                    new GetObjectsMinIoReply()
                    {
                        DataDictionary = getObjectsReply.DataDictionary,
                        OrderId = context.Saga.CorrelationId
                    }, r => r.RequestId = context.Saga.RequestId);
                break;
            case Fault<IGetObjectsRequest>:
            case RequestTimeoutExpired<IGetObjectsRequest>:
                await endpoint.Send(
                    new GetObjectsMinIoReply()
                    {
                        OrderId = context.Saga.CorrelationId,
                        ErrorMsg = error
                    }, r => r.RequestId = context.Saga.RequestId);
                break;
            case IDeleteObjectsReply deleteObjectsReply:
                await endpoint.Send(
                    new DeleteObjectsMinIoReply()
                    {
                        OrderId = context.Saga.CorrelationId
                    }, r => r.RequestId = context.Saga.RequestId);
                break;
            case Fault<IDeleteObjectsRequest>:
            case RequestTimeoutExpired<IDeleteObjectsRequest>:
                await endpoint.Send(
                    new DeleteObjectsMinIoReply()
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