using Grpc.Core;
using Minio;
using Minio.Exceptions;
using StableDraw.MinIOService.Models;
using StableDraw.MinIOService.Settings;

namespace StableDraw.MinIOService.Services;

public class MinIOService : IMinIOService
{
    private MinioClient _minio;
    private readonly MinIOSettings _minIoSettings;
    
    public MinIOService(MinIOSettings minIoSettings)
    {
        _minIoSettings = minIoSettings;
        _minio = new MinioClient()
            .WithEndpoint(_minIoSettings.Address)
            .WithCredentials(_minIoSettings.AccessKey,
                _minIoSettings.SecretKey)
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

    public async Task<StatusCode> DelObj(DeleteObjectRequest request)
    {
        var objstatreply = await _minio.StatObjectAsync(new StatObjectArgs()
                .WithBucket(request.Bucket)
                .WithObject(request.ObjectName)
            );
        if (objstatreply == null || objstatreply.DeleteMarker) 
            throw new Exception("object not found or Deleted");

        RemoveObjectArgs rmArgs = new RemoveObjectArgs()
            .WithBucket(request.Bucket)
            .WithObject(request.ObjectName);
        await _minio.RemoveObjectAsync(rmArgs);

        return await Task.FromResult(StatusCode.OK);
    }
}