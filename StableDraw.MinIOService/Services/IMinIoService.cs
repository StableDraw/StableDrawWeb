using System.Net;
using StableDraw.Contracts;
using StableDraw.Contracts.MInIoContracts.Replies;
using StableDraw.Contracts.MInIoContracts.Requests;
using StableDraw.MinIOService.Models;

namespace StableDraw.MinIOService.Services;

public interface IMinIoService
{ 
    Task<PutObjectResult> PutObj(IPutObjectRequest request);
    Task<GetObjectResult> GetObj(IGetObjectRequest request);
    Task<DeleteObjectResult> DelObj(IDeleteObjectRequest request);
    Task<PutObjectsResult> PutObjects(IPutObjectsRequest request);
    Task<GetObjectsResult> GetObjects(IGetObjectsRequest request);
    Task<DeleteObjectsResult> DeleteObjects(IDeleteObjectsRequest request);
    Task<IGetBabylonDataReply> GetBabylonData(IGetBabylonDataRequest request);
}