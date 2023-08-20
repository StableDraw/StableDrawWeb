using System.Net;

namespace CLI.Contracts;

public record GetObjectReply
{
    public string ObjectId { get; set; }
    public byte[] Data { get; set; }
    public HttpStatusCode Status { get; set; }
}