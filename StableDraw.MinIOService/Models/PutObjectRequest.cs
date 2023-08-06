using Minio.DataModel;

namespace StableDraw.MinIOService.Models;

public class PutObjectRequest
{
    public string Bucket { get; set; }
    public byte[] Data { get; set; }
}