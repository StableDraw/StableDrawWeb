using Microsoft.Extensions.Options;
using Minio;
using StableDraw.Contracts.MInIoContracts.Requests;
using StableDraw.Core.Models;
using StableDraw.MinIOService.Data.UnitsOfWork;
using StableDraw.MinIOService.Models;
using StableDraw.MinIOService.Settings;
using DeleteObjectsResult = StableDraw.MinIOService.Models.DeleteObjectsResult;

namespace StableDraw.MinIOService.Services;

public class MinIoService : IMinIoService
{
    private readonly MinioClient _minio;
    private readonly MinIOSettings _minIoSettings;
    private readonly UnitOfWork _unitOfWork;

    public MinIoService(IOptions<MinIOSettings> minIoSettings, UnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
        _minIoSettings = minIoSettings.Value;
        _minio = new MinioClient()
            .WithEndpoint(_minIoSettings.Address, 9000)
            .WithCredentials(_minIoSettings.AccessKey,
                _minIoSettings.SecretKey)
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
                try
                {
                    Image image = new()
                    {
                        Oid = Guid.NewGuid(),
                        ImageName = item.Key,
                        ContentType = item.Key[(item.Key.LastIndexOf('.') + 1)..],
                        UserId = request.UserId.ToString()
                    };

                    _unitOfWork.Images.CreateImage(image);

                    await PutImage(image.Oid, item.Value);

                    await _unitOfWork.CommitAsync();
                }
                catch
                {
                    _unitOfWork.Dispose();
                }
            }

            return await Task.FromResult(new PutObjectsResult());
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
                DataDictionary = new Dictionary<string, byte[]>()
            };
            
            var images = await _unitOfWork.Images.GetImagesAsync(request.UserId, request.ObjectNames);

            foreach (var item in images)
            {
                var img = await GetImage(item.Oid);
                result.DataDictionary.Add(item.ImageName, img);
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
            var resultNames = new List<string>();

            var images = await _unitOfWork.Images.GetImagesAsync(request.UserId, request.ObjectNames);

            foreach (var item in images)
            {
                try
                {
                    _unitOfWork.Images.Delete(item);
                    await DeleteImage(item.Oid);
                    await _unitOfWork.CommitAsync();
                    resultNames.Add(item.ImageName);
                }
                catch
                {
                    _unitOfWork.Dispose();
                }
            }

            result.ImagesNames = resultNames;
            return await Task.FromResult(result);
        }
        catch (Exception e)
        {
            //_logger.LogError(e.Message);
            return await Task.FromResult(new DeleteObjectsResult() { ErrorMsg = e.Message });
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

    private async Task<byte[]> GetImage(Guid imageId)
    {
        using MemoryStream memoryStream = new MemoryStream();
        // Check Exists object
        var objstatreply = await _minio.StatObjectAsync(new StatObjectArgs()
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