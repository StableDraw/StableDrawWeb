using CLI.Models;
using CLI.Settings;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace CLI.Services
{
    public class GoogleRecaptchaService
    {
        private readonly GoogleRecaptchaSettings _settings;

        public GoogleRecaptchaService(IOptions<GoogleRecaptchaSettings> settings)
        {
            _settings = settings.Value;
        }

        public async Task<GoogleRecaptchaRespnse> Verefication(string token)
        {
            GoogleRecaptchaData data = new GoogleRecaptchaData()
            {
                Response = token,
                SecretKey = _settings.RecaptchaSecretKey
            };

            var client = new HttpClient();

            var response = await client.GetStringAsync($"https://www.google.com/recaptcha/api/siteverify?secret={data.SecretKey}&response={data.Response}");

            var captchaResponce = JsonConvert.DeserializeObject<GoogleRecaptchaRespnse>(response);

            return captchaResponce;
        }
    }

    public class GoogleRecaptchaData
    {
        public string Response { get; set; }
        public string SecretKey { get; set; }
    }

    public class GoogleRecaptchaRespnse
    {
        public bool success { get; set; }
        public double score { get; set; }
        public string action { get; set; }
        public DateTime chellenge_ts { get; set; }
        public string hostname { get; set; }
    }
}
