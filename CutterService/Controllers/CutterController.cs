using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Drawing;
using Cutter.Models;

namespace Cutter.Controllers
{
    [ApiController]
    [Route("/")]
    public class CutterController : Controller
    {
        [HttpGet]
        public async Task<IActionResult> CutterPhoto()
        {
            var client = new HttpClient();

            // get json with id and binarfile | must be change with Ioptions!!
            var requestJson = await client.GetStringAsync($"https://localhost:7050/post");

            RequestData requestData = JsonConvert.DeserializeObject<RequestData>(requestJson);

            //RequestData requestData = requestJson; // вот так без Deserialize???

            Cutterclass cutterfun = new Cutterclass();

            var sendReply = cutterfun.CutterFunc(requestData);

            ReplyData replydata = new ReplyData()
            {
                id = sendReply.id,
                //success = succes, //whats succes code??
                bitmap = sendReply.bitmap
            };

            return Ok(replydata);
        }
    }
}
