using System.Net.Http.Headers;
using System.Text;
using CLI.Infrastructure;
using CLI.Settings;
using MassTransit;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using StableDraw.Core.Models;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace CLI.Services;

public class YookassaService : IPaymentService
{
    private readonly HttpClient _client;
    private readonly string _yookassaUrl;

    public YookassaService(HttpClient httpClient, IOptions<PaymentSettings> settings)
    {
        _client = httpClient;
        _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(Encoding.ASCII.GetBytes("246780:test_FuroCtHsLvCabqYgPMg4htUZpk14WqA-OOdqu2B9Tik")));
        _client.DefaultRequestHeaders.Add("Idempotence-Key", NewId.NextGuid().ToString());
        _yookassaUrl = settings.Value.YookassaUrl;
    }

    public async Task<Payment> CreatePayment(PaymentDTO paymentDTO)
    {
        var uri = PaymentHelper.CreatePayment(_yookassaUrl);
        var content = new StringContent(JsonSerializer.Serialize(paymentDTO), Encoding.UTF8, "application/json");

        var response = await _client.PostAsync(uri, content);
        response.EnsureSuccessStatusCode();

        var payment = JsonSerializer.Deserialize<Payment>(await response.Content.ReadAsStringAsync());

        return payment!;
    }

    public async Task<string> GetPaymentStatus(Guid paymentId)
    {
        var uri = PaymentHelper.GetPaymentStatus(_yookassaUrl, paymentId);

        var response = await _client.GetAsync(uri);
        response.EnsureSuccessStatusCode();

        var status = JsonSerializer.Deserialize<PaymentStatus>(await response.Content.ReadAsStringAsync());

        return status!.Status;
    }
}