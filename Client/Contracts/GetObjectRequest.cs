namespace CLI.Contracts;

public class GetObjectRequest : IMinIORequest
{
    public Guid ObjectId { get; set; }
    public string UserToken { get; set; }
}