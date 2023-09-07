using System.Net;
using Microsoft.Extensions.Options;
using Minio;
using Minio.DataModel;
using StableDraw.Contracts;
using StableDraw.Contracts.MInIoContracts.Replies;
using StableDraw.Contracts.MInIoContracts.Requests;
using StableDraw.MinIOService.Models;
using StableDraw.MinIOService.Settings;
using DeleteObjectsResult = StableDraw.MinIOService.Models.DeleteObjectsResult;

namespace StableDraw.MinIOService.Services;

public class MinIoService : IMinIoService
{
    private readonly MinioClient _minio;
    private readonly MinIOSettings _minIoSettings;
    
    public MinIoService(IOptions<MinIOSettings> minIoSettings)
    {
        _minIoSettings = minIoSettings.Value;
        _minio = new MinioClient()
            .WithEndpoint(_minIoSettings.Address, 9000)
            .WithCredentials(_minIoSettings.AccessKey,
                _minIoSettings.SecretKey)
            //.WithSSL()//if Domain is SSL
            .Build();
    }
    
    public async Task<PutObjectResult> PutObj(IPutObjectRequest request)
    {
        try
        {
            // Check Exists bucket
            bool found = await _minio.BucketExistsAsync(new BucketExistsArgs().WithBucket(_minIoSettings.BucketName));
        
            if (!found)
            {
                // if bucket not Exists,make bucket
                await _minio.MakeBucketAsync(new MakeBucketArgs().WithBucket(_minIoSettings.BucketName));
            }

            var result = await PutImage(request.ObjectId, request.Data);
            return await Task.FromResult(new PutObjectResult(){ObjectId = result});
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    public async Task<PutObjectsResult> PutObjects(IPutObjectsRequest request)
    {
        try
        {
            // Check Exists bucket
            bool found = await _minio.BucketExistsAsync(new BucketExistsArgs().WithBucket(_minIoSettings.BucketName));
        
            if (!found)
            {
                // if bucket not Exists,make bucket
                await _minio.MakeBucketAsync(new MakeBucketArgs().WithBucket(_minIoSettings.BucketName));
            }

            foreach (var item in request.DataDictionary)
            {
                await PutImage(item.Key, item.Value);
            }

            return await Task.FromResult<PutObjectsResult>(new PutObjectsResult());
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    public async Task<GetObjectsResult> GetObjects(IGetObjectsRequest request)
    {
        GetObjectsResult result = new GetObjectsResult();
        result.DataDictionary = new Dictionary<Guid, byte[]>();

        foreach (var item in request.ObjectsId)
        {
            var objstatreply= await _minio.StatObjectAsync(new StatObjectArgs()
                .WithBucket(_minIoSettings.BucketName)
                .WithObject(item.ToString())
            );
        
            if (objstatreply == null || objstatreply.DeleteMarker)
                throw new Exception("object not found or Deleted");

            var img = await GetImage(item);
            result.DataDictionary.Add(item, img);
        }

        return await Task.FromResult(result);
    }

    public async Task<DeleteObjectsResult> DeleteObjects(IDeleteObjectsRequest request)
    {
        DeleteObjectsResult result = new DeleteObjectsResult();
        var resultsId = new List<Guid>();

        foreach (var item in request.ObjectsId)
        {
            var objstatreply= await _minio.StatObjectAsync(new StatObjectArgs()
                .WithBucket(_minIoSettings.BucketName)
                .WithObject(item.ToString())
            );
        
            if (objstatreply == null || objstatreply.DeleteMarker)
                throw new Exception("object not found or Deleted");

            resultsId.Add(await DeleteImage(item)); 
        }

        result.ObjectsId = resultsId;
        return await Task.FromResult(result);
    }

    public async Task<GetObjectResult> GetObj(IGetObjectRequest request)
    {
        // Check Exists object
        var objstatreply= await _minio.StatObjectAsync(new StatObjectArgs()
            .WithBucket(_minIoSettings.BucketName)
            .WithObject(request.ObjectId.ToString())
        );
        
        if (objstatreply == null || objstatreply.DeleteMarker)
            throw new Exception("object not found or Deleted");
        
        // Get object
        var result = await GetImage(request.ObjectId);
        return await Task.FromResult(new GetObjectResult()
        {
            ObjectId = request.ObjectId,
            Data = result.ToArray()
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
        var result = await DeleteImage(request.ObjectId);
        return await Task.FromResult(new DeleteObjectResult() {ObjectId = request.ObjectId});
    }

    private async Task<Guid> PutImage(Guid imageId, byte[] data)
    {
        try
        {
            MemoryStream filestream = new System.IO.MemoryStream(data);
            await _minio.PutObjectAsync(new PutObjectArgs()
                .WithBucket(_minIoSettings.BucketName)
                .WithObject(imageId.ToString())
                .WithStreamData(filestream)
                .WithObjectSize(filestream.Length)
                .WithContentType("application/octet-stream")
            );
            return await Task.FromResult(imageId);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    private async Task<byte[]> GetImage(Guid imageId)
    {
        MemoryStream destination = new MemoryStream();
        
        // Check Exists object
        var objstatreply= await _minio.StatObjectAsync(new StatObjectArgs()
            .WithBucket(_minIoSettings.BucketName)
            .WithObject(imageId.ToString())
        );
        
        if (objstatreply == null || objstatreply.DeleteMarker)
            throw new Exception("object not found or Deleted");
        
        // Get object
        await _minio.GetObjectAsync(new GetObjectArgs()
            .WithBucket(_minIoSettings.BucketName)
            .WithObject(imageId.ToString())
            .WithCallbackStream((stream) =>
            {
                stream.CopyTo(destination);
            }));
        
        return await Task.FromResult(destination.ToArray());
    }

    private async Task<Guid> DeleteImage(Guid imageId)
    {
        var objstatreply = await _minio.StatObjectAsync(new StatObjectArgs()
            .WithBucket(_minIoSettings.BucketName)
            .WithObject(imageId.ToString())
        );
        if (objstatreply == null || objstatreply.DeleteMarker) 
            throw new Exception("object not found or Deleted");

        RemoveObjectArgs rmArgs = new RemoveObjectArgs()
            .WithBucket(_minIoSettings.BucketName)
            .WithObject(imageId.ToString());
        await _minio.RemoveObjectAsync(rmArgs);

        return await Task.FromResult(imageId);
    }
}