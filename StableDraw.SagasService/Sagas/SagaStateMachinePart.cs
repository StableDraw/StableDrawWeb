using MassTransit;
using StableDraw.Contracts;
using StableDraw.Contracts.MInIoContracts.Replies;
using StableDraw.Contracts.MInIoContracts.Requests;

namespace StableDraw.SagasService.Sagas;

public sealed partial class SagaStateMachine
{
    public Request<SagaState, IGetObjectRequest, IGetObjectReply> GetObject { get; set; }
    public Request<SagaState, IGetObjectsRequest, IGetObjectsReply> GetObjects { get; set; }
    public Request<SagaState, IPutObjectRequest, IPutObjectReply> PutObject { get; set; }
    public Request<SagaState, IPutObjectsRequest, IPutObjectsReply> PutObjects { get; set; }
    public Request<SagaState, IDeleteObjectRequest, IDeleteObjectReply> DeleteObject { get; set; }
    public Request<SagaState, IDeleteObjectsRequest, IDeleteObjectsReply> DeleteObjects { get; set; }

    public Event<GetObjectMinIoRequest> GetObjectEvent { get; set; }
    public Event<GetObjectsMinIoRequest> GetObjectsEvent { get; set; }
    public Event<PutObjectMinIoRequest> PutObjectEvent { get; set; }
    public Event<PutObjectsMinIoRequest> PutObjectsEvent { get; set; }
    public Event<DeleteObjectMinIoRequest> DeleteObjectEvent { get; set; }
    public Event<DeleteObjectsMinIoRequest> DeleteObjectsEvent { get; set; }
    public State Failed { get; set; }

    private void BuildStateMachine()
    {
        InstanceState(x => x.CurrentState);
        
        Event<GetObjectMinIoRequest>(() => 
            GetObjectEvent, x => 
            x.CorrelateById(y => y.Message.OrderId));

        Event<PutObjectMinIoRequest>(() =>
            PutObjectEvent, x =>
            x.CorrelateById(y => y.Message.OrderId));
        
        Event<DeleteObjectMinIoRequest>(() =>
            DeleteObjectEvent, x =>
            x.CorrelateById(y => y.Message.OrderId));
        
        Event<GetObjectsMinIoRequest>(() => 
            GetObjectsEvent, x => 
            x.CorrelateById(y => y.Message.OrderId));

        Event<PutObjectsMinIoRequest>(() =>
            PutObjectsEvent, x =>
            x.CorrelateById(y => y.Message.OrderId));
        
        Event<DeleteObjectsMinIoRequest>(() =>
            DeleteObjectsEvent, x =>
            x.CorrelateById(y => y.Message.OrderId));
        
        Request(() => GetObject);
        Request(() => PutObject);
        Request(() => DeleteObject);
        Request(() => GetObjects);
        Request(() => PutObjects);
        Request(() => DeleteObjects);
    }
}