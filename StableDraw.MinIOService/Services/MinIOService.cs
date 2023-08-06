using Minio;
using StableDraw.MinIOService.Models;

namespace StableDraw.MinIOService.Services;

public class MinIOService : IMinIOService
{
    private MinioClient _minio;

    public MinIOService()
    {
        _minio = new MinioClient()
            .WithEndpoint("Address")
            .WithCredentials("YOUR-ACCESSKEYID",
                "YOUR-SECRETACCESSKEY")
            .WithSSL()//if Domain is SSL
            .Build();
    }
    
    public async Task<string> PutObj(PutObjectRequest request)
    {
        var bucketName = request.Bucket;
        // Check Exists bucket
        bool found = await _minio.BucketExistsAsync(new BucketExistsArgs().WithBucket(bucketName));
        
        if (!found)
        {
            // if bucket not Exists,make bucket
            await _minio.MakeBucketAsync(new MakeBucketArgs().WithBucket(bucketName));
        }
        
        MemoryStream filestream = new System.IO.MemoryStream(request.Data);
        var filename = Guid.NewGuid();
        
        // upload object
        await _minio.PutObjectAsync(new PutObjectArgs()
            .WithBucket(bucketName).WithFileName(filename.ToString())
            .WithStreamData(filestream).WithObjectSize(filestream.Length)
        );
        return await Task.FromResult<string>(filename.ToString());
    }

    public async Task<GetObjectReply> GetObj(string bucket, string objectName)
    {
        MemoryStream destination = new MemoryStream();
        
        // Check Exists object
        var objstatreply= await _minio.StatObjectAsync(new StatObjectArgs()
            .WithBucket(bucket)
            .WithObject(objectName)
        );
        
        if (objstatreply == null || objstatreply.DeleteMarker)
            throw new Exception("object not found or Deleted");
        
        // Get object
        await _minio.GetObjectAsync(new GetObjectArgs()
            .WithBucket(bucket)
            .WithObject(objectName)
            .WithCallbackStream((stream) =>
            {
                stream.CopyTo(destination);
            }));
        
        return await Task.FromResult<GetObjectReply>(new GetObjectReply()
        {
            Data = destination.ToArray(),
            ObjectStat = objstatreply
        });
    }
}