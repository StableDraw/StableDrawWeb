using Automatonymous;
using MassTransit;

namespace StableDraw.SagasService.Sagas;

public class MinIoSagaState : MassTransit.SagaStateMachineInstance
{
    public Guid CorrelationId { get; set; }
    public string? CurrentState { get; set; }
    public Guid? RequestId { get; set; }
    public Uri? ResponseAddress { get; set; }
}