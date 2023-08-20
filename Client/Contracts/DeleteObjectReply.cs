using System.Net;

namespace CLI.Contracts;

public record DeleteObjectReply
{
    public HttpStatusCode Status { get; set; }
    public Guid ObjectId { get; set; }
}