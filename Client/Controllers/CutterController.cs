using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Drawing;
using CLI.Services;


namespace CLI.Controllers
{
    [ApiController]
    [Route("/")]
    public class CutterController : Controller
    {
        [HttpGet]
        public async Task<ReplyData> CutterPhoto([FromBody] string body)
        {
            RequestData requestData = JsonConvert.DeserializeObject<RequestData>(body);

            CutterService cutterfun = new();

            var sendReply = await cutterfun.CutterFunc(requestData);

            return Ok(sendReply);
        }
    }
}
