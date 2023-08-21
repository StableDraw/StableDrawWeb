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
        public readonly CutterService cutterService;
        public CutterController(CutterService cutterService) 
        {
            this.cutterService = cutterService;
        }

        [HttpGet]
        public async Task<ReplyData> CutterPhoto([FromBody] string body)
        {
            RequestData requestData = JsonConvert.DeserializeObject<RequestData>(body);

            ReplyData sendReply = await cutterService.CutterAsync(requestData);

            return Ok(sendReply.ToString());
        }
    }
}
