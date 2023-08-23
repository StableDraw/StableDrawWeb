namespace StableDraw.MinIOService.Settings;

public class EndpointConfig
{
    public string RequestPutObjectQueue { get; set; }
    public string RequestGetObjectQueue { get; set; }
    public string RequestDelObjectQueue { get; set; }
    public string ReplyImageQueue { get; set; }
    public string ReplyStatusQueue { get; set; }
}