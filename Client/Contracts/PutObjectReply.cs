using System.Net;

namespace CLI.Contracts;

public record PutObjectReply
{
    public HttpStatusCode Status { get; set; }
    public string ObjectId { get; set; }
}