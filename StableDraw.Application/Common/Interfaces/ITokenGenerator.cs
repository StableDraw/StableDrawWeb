namespace StableDraw.Infrastructure.Common;

public interface ITokenGenerator
{
    string GenerateJwtToken((string userId, string userName, IList<string> roles) userDetails);
}