using MassTransit;
using MassTransit.Contracts;
using StableDraw.Contracts.RenderContracts.Replies;
using StableDraw.Contracts.RenderContracts.Requests;

namespace StableDraw.SagasService.Sagas.Render
{
    internal class RenderStateMachine : MassTransitStateMachine<RenderState>
    {
        private readonly ILogger<MinIO.MinIoStateMachine> _logger;

        public Request<RenderState, IGetRenderedImageRequest, IGetRenderedImageReply> GetRenderedImage { get; set; }
        public Event<GetRenderedImageRequest> GetRenderedImageEvent { get; set; }

        public State Failed { get; set; }
        public State Complete { get; set; }

        public RenderStateMachine(ILogger<MinIO.MinIoStateMachine> logger)
        {
            _logger = logger;
            BuildStateMachine();
        }

        private void BuildStateMachine()
        {
            InstanceState(x => x.CurrentState);

            #region events definition
            Event(() =>
                GetRenderedImageEvent, x =>
                x.CorrelateById(y => y.Message.OrderId));
            #endregion

            Request(() => GetRenderedImage);

            Initially
            (
                WhenGetRenderedImageReceived()
            );

            During(GetRenderedImage.Pending,
            When(GetRenderedImage.Completed).ThenAsync(async context =>
            {
                await RespondFromSaga(context, string.Empty);
            }).TransitionTo(Complete),
            When(GetRenderedImage.Faulted)
                .ThenAsync(async context =>
                {
                    await RespondFromSaga(context,
                        "Faulted On Get Objects " +
                        string.Join("; ", context.Message.Exceptions.Select(x => x.Message)));
                })
                .TransitionTo(Failed),
            When(GetRenderedImage.TimeoutExpired)
                .ThenAsync(async context =>
                {
                    await RespondFromSaga(context, "TimeOut Get Object ");
                }).TransitionTo(Failed));

        }

        private EventActivityBinder<RenderState, GetRenderedImageRequest> WhenGetRenderedImageReceived()
        {
            return When(GetRenderedImageEvent).Then(x =>
            {
                if (!x.TryGetPayload(out SagaConsumeContext<RenderState, GetRenderedImageRequest> getRenderedImage))
                    throw new Exception("Unable to retrieve required getRenderedImage for callback data.");
                x.Saga.RequestId = getRenderedImage.RequestId;
                x.Saga.ResponseAddress = getRenderedImage.ResponseAddress;

            }).Request(GetRenderedImage, x => x.Init<IGetRenderedImageRequest>(new
            {
                OrderId = x.Message.OrderId,
                SceneName = x.Message.SceneName,
                Coords = x.Message.Coords
            })).TransitionTo(GetRenderedImage.Pending);
        }

        private static async Task RespondFromSaga<T>(BehaviorContext<RenderState, T> context, string error) where T : class
        {
            var endpoint = await context.GetSendEndpoint(context.Saga.ResponseAddress);
            switch (context.Message)
            {
                case IGetRenderedImageReply getRenderedImageReply:
                    await endpoint.Send(
                        new GetRenderedImageReply()
                        {
                            OrderId = context.Saga.CorrelationId,
                            Data = getRenderedImageReply.Data,
                            SceneName = getRenderedImageReply.SceneName

                        }, r => r.RequestId = context.Saga.RequestId);
                    break;
                case Fault<IGetRenderedImageRequest>:
                    await endpoint.Send(
                        new GetRenderedImageReply()
                        {
                            OrderId = context.Saga.CorrelationId,
                            ErrorMsg = error
                        }, r => r.RequestId = context.Saga.RequestId);
                    break;
                case RequestTimeoutExpired<IGetRenderedImageRequest>:
                    await endpoint.Send(new GetRenderedImageReply()
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
}
