using System.Runtime.CompilerServices;
using Automatonymous;
using MassTransit;
using StableDraw.Contracts;
using StableDraw.Contracts.MInIoContracts.Replies;
using StableDraw.Contracts.MInIoContracts.Requests;
using StableDraw.Contracts.NeuralContracts.Replies;
using StableDraw.Contracts.NeuralContracts.Requests;

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
            WhenDeleteObjectReceived(),
            WhenGetObjectsReceived(),
            WhenPutObjectsReceived(),
            WhenDeleteObjectsReceived(),
            WhenGenerateNeuralReceived()
        );

        #region during
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
                .TransitionTo(Failed)
        );
        
        During(GetObjects.Pending,
            When(GetObjects.Completed).ThenAsync(async context =>
            {
                await RespondFromSaga(context, string.Empty);
            }).Finalize(),
            When(GetObjects.Faulted)
                .ThenAsync(async context =>
                {
                    await RespondFromSaga(context, "Faulted On Get Objects " + string.Join("; ", context.Message.Exceptions.Select(x => x.Message)));
                })
                .TransitionTo(Failed));
        
        During(GenerateNeuralImages.Pending, 
            When(GenerateNeuralImages.Completed).ThenAsync(async context =>
            {
                await RespondFromSaga(context, string.Empty);
            }).Finalize(),
            When(GenerateNeuralImages.Faulted)
                .ThenAsync(async context =>
                {
                    await RespondFromSaga(context, "Faulted On Generate images " + string.Join("; ", context.Message.Exceptions.Select(x => x.Message)));
                })
                .TransitionTo(Failed));
        
        During(GenerateNeuralInfo.Pending,
            When(GenerateNeuralInfo.Completed).ThenAsync(async context =>
            {
                await RespondFromSaga(context, string.Empty);
            }).Finalize(),
            When(GenerateNeuralInfo.Faulted)
                .ThenAsync(async context =>
                {
                    await RespondFromSaga(context, "Faulted On Generate info " + string.Join("; ", context.Message.Exceptions.Select(x => x.Message)));
                })
                .TransitionTo(Failed));
        #endregion
    }

    #region event activites
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
    
    private EventActivityBinder<SagaState, PutObjectsMinIoRequest> WhenPutObjectsReceived()
    {
        return When(PutObjectsEvent).Then(x =>
        {
            if (!x.TryGetPayload(out SagaConsumeContext<SagaState, PutObjectsMinIoRequest> putImage))
                throw new Exception("Unable to retrieve required getImage for callback data.");
            x.Saga.RequestId = putImage.RequestId;
            x.Saga.ResponseAddress = putImage.ResponseAddress;

        }).Request(PutObjects, x => x.Init<IPutObjectsRequest>(new
        {
            OrderId = x.Message.OrderId,
            DataDictionary = x.Message.DataDictionary
        })).TransitionTo(PutObjects.Pending);
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
    
    private EventActivityBinder<SagaState, GetObjectsMinIoRequest> WhenGetObjectsReceived()
    {
        return When(GetObjectsEvent).Then(x =>
        {
            if (!x.TryGetPayload(out SagaConsumeContext<SagaState, GetObjectsMinIoRequest> getImage))
                throw new Exception("Unable to retrieve required getImage for callback data.");
            x.Saga.RequestId = getImage.RequestId;
            x.Saga.ResponseAddress = getImage.ResponseAddress;

        }).Request(GetObjects, x => x.Init<IGetObjectsRequest>(new
        {
            OrderId = x.Message.OrderId,
            ObjectsId = x.Message.ObjectsId
            
        })).TransitionTo(GetObjects.Pending);
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
    
    private EventActivityBinder<SagaState, DeleteObjectsMinIoRequest> WhenDeleteObjectsReceived()
    {
        return When(DeleteObjectsEvent).Then(x =>
        {
            if (!x.TryGetPayload(out SagaConsumeContext<SagaState, DeleteObjectsMinIoRequest> deleteImage))
                throw new Exception("Unable to retrieve required getImage for callback data.");
            x.Saga.RequestId = deleteImage.RequestId;
            x.Saga.ResponseAddress = deleteImage.ResponseAddress;
            
        }).Request(DeleteObjects, x => x.Init<IDeleteObjectsRequest>(new
        {
            OrderId = x.Message.OrderId,
            ObjectsId = x.Message.ObjectsId
        })).TransitionTo(DeleteObjects.Pending);
    }

    private EventActivityBinder<SagaState, NeuralRequest> WhenGenerateNeuralReceived()
    {
        return When(GenerateNeuralEvent).Then(x =>
        {
            if (!x.TryGetPayload(out SagaConsumeContext<SagaState, NeuralRequest> generateNeural))
                throw new Exception("Unable to retrieve required generateNeural for callback data.");
            x.Saga.RequestId = generateNeural.RequestId;
            x.Saga.ResponseAddress = generateNeural.ResponseAddress;
        }).IfElse(x => x.Message.NeuralType == "", binder => 
            binder.Request(GenerateNeuralImages, x =>
                x.Init<INeuralRequest>(x.Message))
                .TransitionTo(GenerateNeuralImages.Pending), binder => 
            binder.Request(GenerateNeuralInfo, x => 
                x.Init<INeuralRequest>(x.Message))
                .TransitionTo(GenerateNeuralInfo.Pending));
    }
    #endregion
    

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
                        ObjectId = putObjectReply.ObjectId,
                        OrderId = context.Saga.CorrelationId
                    }, r => r.RequestId = context.Saga.RequestId);
                break;
            case IPutObjectsReply putObjectsReply:
                await endpoint.Send<PutObjectsMinIoReply>(
                    new PutObjectsMinIoReply()
                    {
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
            case IGetObjectsReply getObjectsReply:
                await endpoint.Send<GetObjectsMinIoReply>(
                    new GetObjectsMinIoReply()
                    {
                        DataDictionary = getObjectsReply.DataDictionary,
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
            case IDeleteObjectsReply deleteObjectsReply:
                await endpoint.Send<DeleteObjectsMinIoReply>(
                    new DeleteObjectsMinIoReply()
                    {
                        ObjectsId = deleteObjectsReply.ObjectsId,
                        OrderId = context.Saga.CorrelationId
                    }, r => r.RequestId = context.Saga.RequestId);
                break;
            case INeuralImagesReply neuralImagesReply:
                await endpoint.Send<NeuralImagesReply>(new NeuralImagesReply()
                {
                    OrderId = context.Saga.CorrelationId,
                    Images = neuralImagesReply.Images,
                    NeuralType = neuralImagesReply.NeuralType
                }, r => r.RequestId = context.Saga.RequestId);
                break;
            case INeuralInfoReply neuralInfoReply:
                await endpoint.Send<NeuralInfoReply>(new NeuralInfoReply()
                {
                    OrderId = context.Saga.CorrelationId,
                    NeuralType = neuralInfoReply.NeuralType,
                    ResultStr = neuralInfoReply.ResultStr
                }, r => r.RequestId = context.Saga.RequestId);
                break;
            default:
                throw new Exception("Bad Response");
                break;
        }
    }
}