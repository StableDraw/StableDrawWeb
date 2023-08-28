using System.Runtime.CompilerServices;
using Automatonymous;
using MassTransit;
using StableDraw.Contracts;

namespace StableDraw.SagasService.Sagas;

public sealed partial class SagaStateMachine : MassTransitStateMachine<SagaState>
{
    private readonly ILogger<SagaStateMachine> _logger;
    
    public SagaStateMachine(ILogger<SagaStateMachine> logger)
    {
        _logger = logger;
        BuildStateMachine();
        Initially
        (
            WhenGetObjectReceived(),
            WhenPutObjectReceived(),
            WhenDeleteObjectReceived()
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
                .TransitionTo(Failed)

            // When(GetObject.TimeoutExpired)
            //     .ThenAsync(async context =>
            //     {
            //         await RespondFromSaga(context, "Timeout Expired On Get Objects");
            //     })
            //     .TransitionTo(Failed)
        );
        
        During(PutObject.Pending,
            When(PutObject.Completed).ThenAsync(async context =>
            {
                //await RespondFromSaga(context, string.Empty);
                
                await RespondFromSaga(context, string.Empty);
            }).Finalize(),
            When(PutObject.Faulted)
                .ThenAsync(async context =>
                {
                    await RespondFromSaga(context, "Faulted On Put Objects " + string.Join("; ", context.Message.Exceptions.Select(x => x.Message)));
                })
                .TransitionTo(Failed)
            // When(PutObject.TimeoutExpired)
            //     .ThenAsync(async context =>
            //     {
            //         await RespondFromSaga(context, "Timeout Expired On Put Objects");
            //     })
            //     .TransitionTo(Failed).Finalize()
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
                .TransitionTo(Failed)

            // When(DeleteObject.TimeoutExpired)
            //     .ThenAsync(async context =>
            //     {
            //         await RespondFromSaga(context, "Timeout Expired On Delete Objects");
            //     })
            //     .TransitionTo(Failed)
        );
    }

    private EventActivityBinder<SagaState, PutObjectMinIoRequest> WhenPutObjectReceived()
    {
        return When(PutObjectEvent).Then(x =>
        {
            if (!x.TryGetPayload(out SagaConsumeContext<SagaState, PutObjectMinIoRequest> putImage))
                throw new Exception("Unable to retrieve required getImage for callback data.");
            x.Saga.RequestId = putImage.RequestId;
            x.Saga.ResponseAddress = putImage.ResponseAddress;

        }).Request(PutObject, x => x.Init<IPutObjectRequest>(new
        {
            OrderId = x.Message.OrderId,
            ObjectId = x.Message.ObjectId,
            Data = x.Message.Data
        })).TransitionTo(PutObject.Pending);
    }
    
    private EventActivityBinder<SagaState, GetObjectMinIoRequest> WhenGetObjectReceived()
    {
        return When(GetObjectEvent).Then(x =>
        {
            if (!x.TryGetPayload(out SagaConsumeContext<SagaState, GetObjectMinIoRequest> getImage))
                throw new Exception("Unable to retrieve required getImage for callback data.");
            x.Saga.RequestId = getImage.RequestId;
            x.Saga.ResponseAddress = getImage.ResponseAddress;

        }).Request(GetObject, x => x.Init<IGetObjectRequest>(new
        {
            OrderId = x.Message.OrderId,
            ObjectId = x.Message.ObjectId
        })).TransitionTo(GetObject.Pending);
    }
    
    private EventActivityBinder<SagaState, DeleteObjectMinIoRequest> WhenDeleteObjectReceived()
    {
        return When(DeleteObjectEvent).Then(x =>
        {
            if (!x.TryGetPayload(out SagaConsumeContext<SagaState, DeleteObjectMinIoRequest> deleteImage))
                throw new Exception("Unable to retrieve required getImage for callback data.");
            x.Saga.RequestId = deleteImage.RequestId;
            x.Saga.ResponseAddress = deleteImage.ResponseAddress;
            
        }).Request(DeleteObject, x => x.Init<IDeleteObjectRequest>(new
        {
            OrderId = x.Message.OrderId,
            ObjectId = x.Message.ObjectId
        })).TransitionTo(DeleteObject.Pending);
    }

    // private EventActivityBinder<SagaState, TInstance>[] WherePending<TRequest, TReply, TInstance>(Request<SagaState, TRequest, TReply> request) 
    //     where TReply : class
    //     where TRequest : class
    //     where TInstance : class
    // {
    //     return new[]
    //     {
    //         When(request.Completed).ThenAsync(async context =>
    //         {
    //             await RespondFromSaga(context, string.Empty);
    //         }).Finalize(),
    //         //When(request.Faulted)
    //         // When(request.Faulted)
    //         //     .ThenAsync(async context =>
    //         //     {
    //         //         await RespondFromSaga(context, "Faulted On Delete Objects " + string.Join("; ", context.Message.Exceptions.Select(x => x.Message)));
    //         //     })
    //         //     .TransitionTo(Failed),
    //         //
    //         // When(request.TimeoutExpired)
    //         //     .ThenAsync(async context =>
    //         //     {
    //         //         await RespondFromSaga(context, "Timeout Expired On Delete Objects");
    //         //     })
    //         //     .TransitionTo(Failed)
    //     };
    // }

    private static async Task RespondFromSaga<T>(BehaviorContext<SagaState, T> context, string error) where T : class
    {
        var endpoint = await context.GetSendEndpoint(context.Saga.ResponseAddress);
        switch (context.Message)
        {
            case IPutObjectReply putObjectReply:
                await endpoint.Send<PutObjectMinIoReply>(
                    new PutObjectMinIoReply()
                    {
                        ObjectId = putObjectReply.OrderId,
                        OrderId = context.Saga.CorrelationId
                    }, r => r.RequestId = context.Saga.RequestId);
                break;
            case IGetObjectReply getObjectReply:
                await endpoint.Send<GetObjectMinIoReply>(
                    new GetObjectMinIoReply()
                    {
                        ObjectId = getObjectReply.ObjectId,
                        Data = getObjectReply.Data,
                        OrderId = context.Saga.CorrelationId
                    }, r => r.RequestId = context.Saga.RequestId);
                break;
            case IDeleteObjectReply deleteObjectReply:
                await endpoint.Send<DeleteObjectMinIoReply>(
                    new DeleteObjectMinIoReply()
                    {
                        ObjectId = deleteObjectReply.ObjectId,
                        OrderId = context.Saga.CorrelationId
                    }, r => r.RequestId = context.Saga.RequestId);
                break;
            default:
                break;
        }
    }
}