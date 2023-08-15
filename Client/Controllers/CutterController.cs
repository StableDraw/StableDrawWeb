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
        public async Task<IActionResult> CutterPhoto([FromBody] string body)
        {
            var client = new HttpClient();

            RequestData requestData = JsonConvert.DeserializeObject<RequestData>(body);

            Cutter cutterfun = new Cutter();

            var sendReply = cutterfun.CutterFunc(requestData);

            ReplyData replydata = new ReplyData()
            {
                Id = sendReply.Id,
                Bitmap = sendReply.Bitmap
            };

            return Ok(replydata);
        }
    }




}
