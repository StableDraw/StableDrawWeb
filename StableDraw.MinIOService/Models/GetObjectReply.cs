using Minio.DataModel;

namespace StableDraw.MinIOService.Models;

public class GetObjectReply
{
    public ObjectStat ObjectStat { get; set; }
    public byte[] Data { get; set; }
}