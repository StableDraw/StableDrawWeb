using MediatR;
using MassTransit.Mediator;
using StableDraw.Contracts.MInIoContracts.Replies;
using StableDraw.Contracts.MInIoContracts.Requests;

namespace StableDraw.Application.Commands.ObjectStorage;

//public class DeleteImageCommandHandler : MediatorRequestHandler<DeleteObjectMinIoRequest, DeleteObjectMinIoReply>

// public class DeleteImageCommand : IRequest<int>
// {
//     public string ImageName { get; set; }
// }
//
// public class DeleteImageCommandHandler : IRequestHandler<DeleteImageCommand, int>
// {
//     public Task<int> Handle(DeleteImageCommand request, CancellationToken cancellationToken)
//     {
//         throw new NotImplementedException();
//     }
// }