using System.Net;
using StableDraw.Contracts;
using StableDraw.MinIOService.Models;

namespace StableDraw.MinIOService.Services;

public interface IMinIoService
{ 
    Task<PutObjectResult> PutObj(IPutObjectRequest request);
    Task<GetObjectResult> GetObj(IGetObjectRequest request);
    Task<DeleteObjectResult> DelObj(IDeleteObjectRequest request);
}