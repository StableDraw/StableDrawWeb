using System;
using System.IO;
using Microsoft.AspNetCore.Mvc;

namespace StableDraw.Image.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ImageController : Controller
{
    [HttpGet("{id}")]
    public IActionResult Get(Guid id)
    {
        var path = $"images/{id}";
        var data = System.IO.File.ReadAllBytes(path);
        var type = "image/jpeg";
        return File(data, type);
    }

    [HttpGet]
    public IActionResult Get()
    {
        var files = Directory.GetFiles("/images");

        return Ok(files);
    }

    [HttpPost]
    public IActionResult Post(IFormFile file)
    {
        var stream = file.OpenReadStream();
        var ms = new MemoryStream();
        stream.CopyTo(ms);
        var data = ms.ToArray();
        var id = Guid.NewGuid();
        var path = $"images/{id}";
        System.IO.File.WriteAllBytes(path, data);

        return Ok(path);
    }
}