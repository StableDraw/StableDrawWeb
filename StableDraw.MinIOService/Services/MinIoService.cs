using System.Net;
using Microsoft.Extensions.Options;
using Minio;
using StableDraw.Contracts;
using StableDraw.MinIOService.Models;
using StableDraw.MinIOService.Settings;

namespace StableDraw.MinIOService.Services;

public class MinIoService : IMinIoService
{
    private readonly MinioClient _minio;
    private readonly MinIOSettings _minIoSettings;
    
    public MinIoService(IOptions<MinIOSettings> minIoSettings)
    {
        _minIoSettings = minIoSettings.Value;
        _minio = new MinioClient()
            .WithEndpoint(_minIoSettings.Address)
            .WithCredentials(_minIoSettings.AccessKey,
                _minIoSettings.SecretKey)
            //.WithSSL()//if Domain is SSL
            .Build();
    }
    
    public async Task<PutObjectResult> PutObj(IPutObjectRequest request)
    {
        // Check Exists bucket
        bool found = await _minio.BucketExistsAsync(new BucketExistsArgs().WithBucket(_minIoSettings.BucketName));
        
        if (!found)
        {
            // if bucket not Exists,make bucket
            await _minio.MakeBucketAsync(new MakeBucketArgs().WithBucket(_minIoSettings.BucketName));
        }
        
        MemoryStream filestream = new System.IO.MemoryStream(request.Data);
        var filename = Guid.NewGuid();
        
        // upload object
        await _minio.PutObjectAsync(new PutObjectArgs()
            .WithBucket(_minIoSettings.BucketName).WithFileName(filename.ToString())
            .WithStreamData(filestream).WithObjectSize(filestream.Length)
        );
        return await Task.FromResult(new PutObjectResult()
        {
            ObjectId = request.ObjectId
        });
    }

    public async Task<GetObjectResult> GetObj(IGetObjectRequest request)
    {
        MemoryStream destination = new MemoryStream();
        
        // Check Exists object
        var objstatreply= await _minio.StatObjectAsync(new StatObjectArgs()
            .WithBucket(_minIoSettings.BucketName)
            .WithObject(request.ObjectId.ToString())
        );
        
        if (objstatreply == null || objstatreply.DeleteMarker)
            throw new Exception("object not found or Deleted");
        
        // Get object
        await _minio.GetObjectAsync(new GetObjectArgs()
            .WithBucket(_minIoSettings.BucketName)
            .WithObject(request.ObjectId.ToString())
            .WithCallbackStream((stream) =>
            {
                stream.CopyTo(destination);
            }));
        
        return await Task.FromResult(new GetObjectResult()
        {
            ObjectId = request.ObjectId,
            Data = destination.ToArray()
        });
    }

    public async Task<DeleteObjectResult> DelObj(IDeleteObjectRequest request)
    {
        var objstatreply = await _minio.StatObjectAsync(new StatObjectArgs()
                .WithBucket(_minIoSettings.BucketName)
                .WithObject(request.ObjectId.ToString())
            );
        if (objstatreply == null || objstatreply.DeleteMarker) 
            throw new Exception("object not found or Deleted");

        RemoveObjectArgs rmArgs = new RemoveObjectArgs()
            .WithBucket(_minIoSettings.BucketName)
            .WithObject(request.ObjectId.ToString());
        await _minio.RemoveObjectAsync(rmArgs);

        return await Task.FromResult(new DeleteObjectResult() {ObjectId = request.ObjectId});
    }
}