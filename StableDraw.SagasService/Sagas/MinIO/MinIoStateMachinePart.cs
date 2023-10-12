using MassTransit;
using StableDraw.Contracts.MInIoContracts.Replies;
using StableDraw.Contracts.MInIoContracts.Requests;

namespace StableDraw.SagasService.Sagas.MinIO;

public sealed partial class MinIoStateMachine
{
    #region requests
    public Request<MinIoState, IGetObjectsRequest, IGetObjectsReply> GetObjects { get; set; }
    public Request<MinIoState, IPutObjectsRequest, IPutObjectsReply> PutObjects { get; set; }
    public Request<MinIoState, IDeleteObjectsRequest, IDeleteObjectsReply> DeleteObjects { get; set; }
    
    #endregion

    #region events
    public Event<GetObjectsMinIoRequest> GetObjectsEvent { get; set; }
    public Event<PutObjectsMinIoRequest> PutObjectsEvent { get; set; }
    public Event<DeleteObjectsMinIoRequest> DeleteObjectsEvent { get; set; }
    #endregion
    
    public State Failed { get; set; }
    public State Complete { get; set; }

    private void BuildStateMachine()
    {
        InstanceState(x => x.CurrentState);

        #region events definition
        Event(() => 
            GetObjectsEvent, x => 
            x.CorrelateById(y => y.Message.OrderId));

        Event(() =>
            PutObjectsEvent, x =>
            x.CorrelateById(y => y.Message.OrderId));
        
        Event(() =>
            DeleteObjectsEvent, x =>
            x.CorrelateById(y => y.Message.OrderId));
        #endregion
        
        Request(() => GetObjects);
        Request(() => PutObjects);
        Request(() => DeleteObjects);
    }
}