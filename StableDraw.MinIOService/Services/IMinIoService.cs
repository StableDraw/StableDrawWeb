using System.Net;
using StableDraw.Contracts;
using StableDraw.Contracts.MInIoContracts.Requests;
using StableDraw.MinIOService.Models;

namespace StableDraw.MinIOService.Services;

public interface IMinIoService
{ 
    Task<PutObjectsResult> PutObjects(IPutObjectsRequest request);
    Task<GetObjectsResult> GetObjects(IGetObjectsRequest request);
    Task<DeleteObjectsResult> DeleteObjects(IDeleteObjectsRequest request);
}