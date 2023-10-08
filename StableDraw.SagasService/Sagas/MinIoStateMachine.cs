using MassTransit;
using MassTransit.Contracts;
using StableDraw.Contracts.MInIoContracts.Replies;
using StableDraw.Contracts.MInIoContracts.Requests;
using StableDraw.Contracts.NeuralContracts.Replies;
using StableDraw.Contracts.NeuralContracts.Requests;

namespace StableDraw.SagasService.Sagas;

public sealed partial class MinIoStateMachine : MassTransitStateMachine<MinIoState>
{
    private readonly ILogger<MinIoStateMachine> _logger;

    public MinIoStateMachine(ILogger<MinIoStateMachine> logger)
    {
        _logger = logger;
        BuildStateMachine();
        Initially
        (
            WhenGetObjectReceived(),
            WhenPutObjectReceived(),
            WhenDeleteObjectReceived(),
            WhenGetObjectsReceived(),
            WhenPutObjectsReceived(),
            WhenDeleteObjectsReceived()
        );

        #region during

        During(GetObject.Pending,
            When(GetObject.Completed).ThenAsync(async context =>
            {
                await RespondFromSaga(context, string.Empty);
            }).TransitionTo(Complete),
            When(GetObject.Faulted)
                .ThenAsync(async context =>
                {
                    await RespondFromSaga(context,
                        "Faulted On Get Objects " +
                        string.Join("; ", context.Message.Exceptions.Select(x => x.Message)));
                })
                .TransitionTo(Failed),
            When(GetObjects.TimeoutExpired)
                .ThenAsync(async context =>
                {
                    await RespondFromSaga(context, "TimeOut Get Object ");
                }).TransitionTo(Failed));
        
        During(PutObject.Pending,
            When(PutObject.Completed).ThenAsync(async context =>
            {
                await RespondFromSaga(context, string.Empty);
            }).TransitionTo(Complete),
            When(PutObject.Faulted)
                .ThenAsync(async context =>
                {
                    await RespondFromSaga(context, "Faulted On Put Objects " + string.Join("; ", context.Message.Exceptions.Select(x => x.Message)));
                })
                .TransitionTo(Failed),
            When(PutObject.TimeoutExpired).ThenAsync(async context =>
            {
                await RespondFromSaga(context, "Timeout Expired On Put Object");
            }).TransitionTo(Failed));
        
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
        
        During(DeleteObject.Pending, 
            When(DeleteObject.Completed).ThenAsync(async context =>
            {
                await RespondFromSaga(context, string.Empty);
            }).TransitionTo(Complete),
            When(DeleteObject.Faulted)
                .ThenAsync(async context =>
                {
                    await RespondFromSaga(context, "Faulted On Delete Objects " + string.Join("; ", context.Message.Exceptions.Select(x => x.Message)));
                })
                .TransitionTo(Failed),
            When(DeleteObject.TimeoutExpired).ThenAsync(async context =>
            {
                await RespondFromSaga(context, "TimeOut On Delete Object");
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
    private EventActivityBinder<MinIoState, PutObjectMinIoRequest> WhenPutObjectReceived()
    {
        return When(PutObjectEvent).Then(x =>
        {
            if (!x.TryGetPayload(out SagaConsumeContext<MinIoState, PutObjectMinIoRequest> putImage))
                throw new Exception("Unable to retrieve required getImage for callback data.");
            x.Saga.RequestId = putImage.RequestId;
            x.Saga.ResponseAddress = putImage.ResponseAddress;

        }).Request(PutObject, x => x.Init<IPutObjectRequest>(new
        {
            x.Message.OrderId,
            x.Message.ImageName,
            x.Message.Data,
            x.Message.UserId
        })).TransitionTo(PutObject.Pending);
    }
    
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
            OrderId = x.Message.OrderId,
            DataDictionary = x.Message.DataDictionary
        })).TransitionTo(PutObjects.Pending);
    }
    
    private EventActivityBinder<MinIoState, GetObjectMinIoRequest> WhenGetObjectReceived()
    {
        return When(GetObjectEvent).Then(x =>
        {
            if (!x.TryGetPayload(out SagaConsumeContext<MinIoState, GetObjectMinIoRequest> getImage))
                throw new Exception("Unable to retrieve required getImage for callback data.");
            x.Saga.RequestId = getImage.RequestId;
            x.Saga.ResponseAddress = getImage.ResponseAddress;

        }).Request(GetObject, x => x.Init<IGetObjectRequest>(new
        {
            OrderId = x.Message.OrderId,
            ImageName = x.Message.ImageName
        })).TransitionTo(GetObject.Pending);
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
    
    private EventActivityBinder<MinIoState, DeleteObjectMinIoRequest> WhenDeleteObjectReceived()
    {
        return When(DeleteObjectEvent).Then(x =>
        {
            if (!x.TryGetPayload(out SagaConsumeContext<MinIoState, DeleteObjectMinIoRequest> deleteImage))
                throw new Exception("Unable to retrieve required getImage for callback data.");
            x.Saga.RequestId = deleteImage.RequestId;
            x.Saga.ResponseAddress = deleteImage.ResponseAddress;
            
        }).Request(DeleteObject, x => x.Init<IDeleteObjectRequest>(new
        {
            x.Message.OrderId,
            x.Message.ImageName,
            x.Message.UserId
        })).TransitionTo(DeleteObject.Pending);
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
            case IPutObjectReply putObjectReply:
                await endpoint.Send(
                    new PutObjectMinIoReply()
                    {
                        UserId = putObjectReply.UserId,
                        ImageName = putObjectReply.ImageName,
                        OrderId = context.Saga.CorrelationId
                    }, r => r.RequestId = context.Saga.RequestId);
                break;
            case Fault<IPutObjectRequest>:
                await endpoint.Send(
                    new PutObjectMinIoReply()
                    {
                        OrderId = context.Saga.CorrelationId,
                        ErrorMsg = error
                    }, r => r.RequestId = context.Saga.RequestId);
                break;
            case RequestTimeoutExpired<IPutObjectRequest>:
                await endpoint.Send(new PutObjectMinIoReply()
                {
                    OrderId = context.Saga.CorrelationId,
                    ErrorMsg = error
                }, r => r.RequestId = context.Saga.RequestId);
                break;
            case IPutObjectsReply:
                await endpoint.Send(
                    new PutObjectsMinIoReply()
                    {
                        OrderId = context.Saga.CorrelationId
                    }, r => r.RequestId = context.Saga.RequestId);
                break;
            case Fault<IPutObjectsRequest>:
                await endpoint.Send(
                    new PutObjectsMinIoReply()
                    {
                        OrderId = context.Saga.CorrelationId,
                        ErrorMsg = error
                    }, r => r.RequestId = context.Saga.RequestId);
                break;
            case IGetObjectReply getObjectReply:
                await endpoint.Send(
                    new GetObjectMinIoReply()
                    {
                        ImageName = getObjectReply.ImageName,
                        Data = getObjectReply.Data,
                        OrderId = context.Saga.CorrelationId
                    }, r => r.RequestId = context.Saga.RequestId);
                break;
            case Fault<IGetObjectRequest>:
                await endpoint.Send<IGetObjectReply>(new GetObjectMinIoReply()
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
                await endpoint.Send(
                    new GetObjectsMinIoReply()
                    {
                        OrderId = context.Saga.CorrelationId,
                        ErrorMsg = error
                    }, r => r.RequestId = context.Saga.RequestId);
                break;
            case RequestTimeoutExpired<IGetObjectsRequest>:
                await endpoint.Send(
                    new GetObjectsMinIoReply()
                    {
                        OrderId = context.Saga.CorrelationId,
                        ErrorMsg = error
                    }, r => r.RequestId = context.Saga.RequestId);
                break;
            case IDeleteObjectReply deleteObjectReply:
                await endpoint.Send(
                    new DeleteObjectMinIoReply()
                    {
                        UserId = deleteObjectReply.UserId,
                        OrderId = context.Saga.CorrelationId,
                        ImageName = deleteObjectReply.ImageName
                    }, r => r.RequestId = context.Saga.RequestId);
                break;
            case Fault<IDeleteObjectRequest>:
                await endpoint.Send(
                    new DeleteObjectMinIoReply()
                    {
                        OrderId = context.Saga.CorrelationId,
                        ErrorMsg = error
                    }, r => r.RequestId = context.Saga.RequestId);
                break;
            case IDeleteObjectsReply deleteObjectsReply:
                await endpoint.Send(
                    new DeleteObjectsMinIoReply()
                    {
                        UserId = deleteObjectsReply.UserId,
                        OrderId = context.Saga.CorrelationId
                    }, r => r.RequestId = context.Saga.RequestId);
                break;
            case Fault<IDeleteObjectsRequest>:
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