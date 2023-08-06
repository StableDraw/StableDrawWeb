using StableDraw.MinIOService.Models;

namespace StableDraw.MinIOService.Services;

public interface IMinIOService
{
    public Task<string> PutObj(PutObjectRequest request);
    public Task<GetObjectReply> GetObj(string bucket, string objectName);
}