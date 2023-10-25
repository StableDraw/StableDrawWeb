using MassTransit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StableDraw.Contracts.RenderContracts.Replies;
using StableDraw.Contracts.RenderContracts.Requests;
using StableDraw.Core.Models;

namespace CLI.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]/")]
    public class RenderController : Controller
    {
        private readonly IBus _bus;
        private readonly ILogger<ImageController> _logger;

        public RenderController(ILogger<ImageController> logger, IBus bus)
        {
            _logger = logger;
            _bus = bus;
        }

        //[HttpGet]
        //public async Task<IActionResult> GetRenderedImage(double[] coords, string sceneName)
        //{
        //    var response = await _bus.Request<GetRenderedImageRequest, GetRenderedImageReply>
        //        (new GetRenderedImageRequestModel()
        //        {
        //            OrderId = NewId.NextGuid(),
        //            SceneName = sceneName,
        //            Coords = coords
        //        });

        //    if (string.IsNullOrEmpty(response.Message.ErrorMsg))
        //        throw new Exception(response.Message.ErrorMsg);

        //    return Ok(new { response.Message.Data, response.Message.SceneName });
        //}
    }
}
