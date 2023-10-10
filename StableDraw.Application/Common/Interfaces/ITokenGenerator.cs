namespace StableDraw.Application.Common.Interfaces;

public interface ITokenGenerator
{
    string GenerateJwtToken((string userId, string userName, IList<string> roles) userDetails);
}