using MassTransit;
using StableDraw.Contracts;

namespace StableDraw.SagasService.Sagas;

public sealed partial class SagaStateMachine
{
    public Request<SagaState, IGetObjectRequest, IGetObjectReply> GetObject { get; set; }
    public Request<SagaState, IPutObjectRequest, IPutObjectReply> PutObject { get; set; }
    public Request<SagaState, IDeleteObjectRequest, IDeleteObjectReply> DeleteObject { get; set; }

    public Event<GetObjectMinIoRequest> GetObjectEvent { get; set; }
    public Event<PutObjectMinIoRequest> PutObjectEvent { get; set; }
    public Event<DeleteObjectMinIoRequest> DeleteObjectEvent { get; set; }
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
        
        Request(() => GetObject);
        Request(() => PutObject);
        Request(() => DeleteObject);
    }
}