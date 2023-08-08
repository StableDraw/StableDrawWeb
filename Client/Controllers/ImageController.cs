using System;
using System.IO;
using Microsoft.AspNetCore.Mvc;

namespace StableDraw.Image.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ImageController : Controller
{
	private string dirPath;

	public ImageController()
	{
		dirPath = Path.Combine(Directory.GetCurrentDirectory(), "images");
		if(!Directory.Exists(dirPath))
		{
			Directory.CreateDirectory(dirPath);
		}
	}

    [HttpGet("{id}")]
    public IActionResult Get(Guid id)
    {
        var path = Path.Combine(dirPath, id.ToString());
        var data = System.IO.File.ReadAllBytes(path);
        var type = "image/jpeg";
        return File(data, type);
    }

    [HttpDelete("{id}")]

    public IActionResult Delete(Guid id)
    {
	    var path = Path.Combine(dirPath, id.ToString());
	    System.IO.File.Delete(path);
	    return Ok("File Delete: " + id);
    }

    [HttpGet]
    public IActionResult Get()
    {
        var files = Directory.GetFiles(dirPath);
		var ids = files.Select(f => f.Split("\\")[^1]);
        return Ok(ids);
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