using MassTransit;
using StableDraw.Contracts;
using StableDraw.Contracts.MInIoContracts.Replies;
using StableDraw.Contracts.MInIoContracts.Requests;
using StableDraw.Contracts.NeuralContracts.Replies;
using StableDraw.Contracts.NeuralContracts.Requests;

namespace StableDraw.SagasService.Sagas;

public sealed partial class SagaStateMachine
{
    #region requests
    public Request<SagaState, IGetObjectRequest, IGetObjectReply> GetObject { get; set; }
    public Request<SagaState, IGetObjectsRequest, IGetObjectsReply> GetObjects { get; set; }
    public Request<SagaState, IPutObjectRequest, IPutObjectReply> PutObject { get; set; }
    public Request<SagaState, IPutObjectsRequest, IPutObjectsReply> PutObjects { get; set; }
    public Request<SagaState, IDeleteObjectRequest, IDeleteObjectReply> DeleteObject { get; set; }
    public Request<SagaState, IDeleteObjectsRequest, IDeleteObjectsReply> DeleteObjects { get; set; }
    public Request<SagaState, INeuralRequest, INeuralReply> GenerateNeural { get; set; }
    #endregion

    #region events
    public Event<GetObjectMinIoRequest> GetObjectEvent { get; set; }
    public Event<GetObjectsMinIoRequest> GetObjectsEvent { get; set; }
    public Event<PutObjectMinIoRequest> PutObjectEvent { get; set; }
    public Event<PutObjectsMinIoRequest> PutObjectsEvent { get; set; }
    public Event<DeleteObjectMinIoRequest> DeleteObjectEvent { get; set; }
    public Event<DeleteObjectsMinIoRequest> DeleteObjectsEvent { get; set; }
    public Event<NeuralRequest> GenerateNeuralEvent { get; set; }
    #endregion
    
    public State Failed { get; set; }
    public State Complete { get; set; }

    private void BuildStateMachine()
    {
        InstanceState(x => x.CurrentState);

        #region events definition
        Event(() => 
            GetObjectEvent, x => 
            x.CorrelateById(y => y.Message.OrderId));

        Event(() =>
            PutObjectEvent, x =>
            x.CorrelateById(y => y.Message.OrderId));
        
        Event(() =>
            DeleteObjectEvent, x =>
            x.CorrelateById(y => y.Message.OrderId));
        
        Event(() => 
            GetObjectsEvent, x => 
            x.CorrelateById(y => y.Message.OrderId));

        Event(() =>
            PutObjectsEvent, x =>
            x.CorrelateById(y => y.Message.OrderId));
        
        Event(() =>
            DeleteObjectsEvent, x =>
            x.CorrelateById(y => y.Message.OrderId));

        Event(() =>
            GenerateNeuralEvent, x =>
            x.CorrelateById(y => y.Message.OrderId));
        
        #endregion

        Request(() => GetObject);
        Request(() => PutObject);
        Request(() => DeleteObject);
        Request(() => GetObjects);
        Request(() => PutObjects);
        Request(() => DeleteObjects);
        Request(() => GenerateNeural);
    }
}