namespace CLI.Infrastructure;

public static class PaymentHelper
{
    public static string CreatePayment(string baseUri) => $"{baseUri}/v3/payments";

    internal static string GetPaymentStatus(string baseUri, Guid paymentId) => $"{baseUri}/v3/payments/{paymentId}";
}