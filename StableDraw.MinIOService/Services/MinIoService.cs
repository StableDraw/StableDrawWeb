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
    //private readonly Logger<MinIoService> _logger;
    private readonly MinIOSettings _minIoSettings;
    private readonly IConfiguration _configuration;
    
    public MinIoService(IOptions<MinIOSettings> minIoSettings, IConfiguration configuration)
    {
        _configuration = configuration;
        //_logger = logger;
        _minIoSettings = minIoSettings.Value;
        _minio = new MinioClient()
            .WithEndpoint(_minIoSettings.Address, 9000)
            .WithCredentials(_minIoSettings.AccessKey,
                _minIoSettings.SecretKey)
            .WithSSL(true)
            .Build();
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
            Console.WriteLine(e.Message);
            return await Task.FromResult(new PutObjectsResult() { ErrorMsg = e.Message });
        }
    }

    public async Task<GetObjectsResult> GetObjects(IGetObjectsRequest request)
    {
        try
        {
            
            
            GetObjectsResult result = new GetObjectsResult
            {
                DataDictionary = new Dictionary<Guid, byte[]>()
            };

            foreach (var item in request.ObjectsId)
            {
                var img = await GetImage(item);
                result.DataDictionary.Add(item, img);
            }

            return await Task.FromResult(result);
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
            return await Task.FromResult(new GetObjectsResult() { ErrorMsg = e.Message });
        }
    }

    public async Task<DeleteObjectsResult> DeleteObjects(IDeleteObjectsRequest request)
    {
        try
        {
            var result = new DeleteObjectsResult();
            var resultsId = new List<Guid>();

            foreach (var item in request.ObjectsId)
                resultsId.Add(await DeleteImage(item)); 
            
            result.ObjectsId = resultsId;
            return await Task.FromResult(result);
        }
        catch (Exception e)
        {
            //_logger.LogError(e.Message);
            return await Task.FromResult(new DeleteObjectsResult() { ErrorMsg = e.Message });
        }
    }

    public async Task<IGetBabylonDataReply> GetBabylonData(IGetBabylonDataRequest request)
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

            var result = new IGetBabylonDataReply
            {
                OrderId = request.OrderId,
                Scenes = _configuration.GetSection("Babylon:Scenes").Get<IEnumerable<SceneDto>>(),
                Models = _configuration.GetSection("Babylon:Models").Get<IEnumerable<ModelDto>>(),
                EnvMaps = _configuration.GetSection("Babylon:EnvMaps").Get<IEnumerable<EnvMapDto>>()
            };

            PresignedGetObjectArgs args = new PresignedGetObjectArgs()
                .WithBucket(_minIoSettings.BucketName)
                .WithExpiry(60 * 60 * 24);
            
            foreach (var scene in result.Scenes)
            {
                args.WithObject(scene.Scene);
                scene.Scene = await _minio.PresignedGetObjectAsync(args);

                args.WithObject(scene.Preview);
                scene.Preview = await _minio.PresignedGetObjectAsync(args);
            }

            foreach (var model in result.Models)
            {
                foreach (var keyVal in model.ModelsDict)
                {
                    if(!string.IsNullOrEmpty(keyVal.Value))
                    {
                        args.WithObject(keyVal.Value);
                        model.ModelsDict[keyVal.Key] = await _minio.PresignedGetObjectAsync(args);
                    }                    
                }

                args.WithObject(model.Preview);
                model.Preview = await _minio.PresignedGetObjectAsync(args);
            }

            foreach (var env in result.EnvMaps)
            {
                args.WithObject(env.Data);
                env.Data = await _minio.PresignedGetObjectAsync(args);
                args.WithObject(env.Preview);
                env.Preview = await _minio.PresignedGetObjectAsync(args);
            }

            return result;
        }
        catch (Exception e)
        {
            return await Task.FromResult(new IGetBabylonDataReply() { ErrorMsg = e.Message });
        }
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
            //_logger.LogError(e.Message);
            return await Task.FromResult(new PutObjectResult() { ErrorMsg = e.Message });
        }
    }

    public async Task<GetObjectResult> GetObj(IGetObjectRequest request)
    {
        try
        {
            // Get object
            var result = await GetImage(request.ObjectId);
            return await Task.FromResult(new GetObjectResult()
            {
                ObjectId = request.ObjectId,
                Data = result.ToArray()
            });
        }
        catch (Exception e)
        {
            //_logger.LogError(e.Message);
            return await Task.FromResult(new GetObjectResult() { ErrorMsg = e.Message });
        }
    }
    
    public async Task<DeleteObjectResult> DelObj(IDeleteObjectRequest request)
    {
        try
        {
            var result = await DeleteImage(request.ObjectId);
            return await Task.FromResult(new DeleteObjectResult() {ObjectId = result});
        }
        catch (Exception e)
        {
            //_logger.LogError(e.Message);
            return await Task.FromResult(new DeleteObjectResult() { ErrorMsg = e.Message });
        }
    }

    private async Task<Guid> PutImage(Guid imageId, byte[] data)
    {
        using (var filMemoryStream = new MemoryStream(data))
        {
            await _minio.PutObjectAsync(new PutObjectArgs()
                .WithBucket(_minIoSettings.BucketName)
                .WithObject(imageId.ToString())
                .WithStreamData(filMemoryStream)
                .WithObjectSize(filMemoryStream.Length)
                .WithContentType("application/octet-stream")
            );
        }
        return await Task.FromResult(imageId);
    }

    private async Task<byte[]> GetImage(dynamic imageId)
    {
        using MemoryStream memoryStream = new MemoryStream();
        // Check Exists object
        var objstatreply= await _minio.StatObjectAsync(new StatObjectArgs()
            .WithBucket(_minIoSettings.BucketName)
            .WithObject(imageId.ToString())            
        );
        
        if (objstatreply == null || objstatreply.DeleteMarker)
            throw new Exception("object not found or Deleted");
        
        // Get object
        if(imageId is Guid id)
            await _minio.GetObjectAsync(new GetObjectArgs()
                .WithBucket(_minIoSettings.BucketName)
                .WithObject(id.ToString())
                .WithCallbackStream((stream) =>
                {
                    stream.CopyTo(memoryStream);
                }));
        if(imageId is string str)
            await _minio.GetObjectAsync(new GetObjectArgs()
                .WithBucket(_minIoSettings.BucketName)
                .WithObject(str)
                .WithCallbackStream((stream) =>
                {
                    stream.CopyTo(memoryStream);
                }));
        return await Task.FromResult(memoryStream.ToArray());
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