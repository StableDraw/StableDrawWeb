using System.Text.Json.Serialization;

namespace StableDraw.Core.Models;

public class PaymentDTO
{
    [JsonPropertyName("amount")]
    public Amount Amount { get; set; }

    [JsonPropertyName("capture")]
    public bool Capture { get; set; }

    [JsonPropertyName("confirmation")]
    public Confirmation Confirmation { get; set; }

    [JsonPropertyName("description")]
    public string Description { get; set; }
}

public class Amount
{
    [JsonPropertyName("value")]
    public string Value { get; set; }
    [JsonPropertyName("currency")]
    public string Currency { get; set; }
}

public class Confirmation
{
    [JsonPropertyName("type")]
    public string Type { get; set; }
    [JsonPropertyName("return_url")]
    public string ReturnUrl { get; set; }
}

public class Metadata
{
}

public class Recipient
{
    public string AccountId { get; set; }

    public string GatewayId { get; set; }
}

public class Payment
{
    public string Id { get; set; }

    public string Status { get; set; }

    public Amount Amount { get; set; }

    public string Description { get; set; }

    public Recipient Recipient { get; set; }

    public DateTime CreatedAt { get; set; }

    public Confirmation Confirmation { get; set; }

    public bool Test { get; set; }

    public bool Paid { get; set; }

    public bool Refundable { get; set; }

    public Metadata Metadata { get; set; }
}

public class AuthorizationDetails
{
    public string Rrn { get; set; }

    public string AuthCode { get; set; }

    public ThreeDSecure ThreeDSecure { get; set; }
}

public class Card
{
    public string First6 { get; set; }

    public string Last4 { get; set; }

    public string ExpiryMonth { get; set; }

    public string ExpiryYear { get; set; }

    public string CardType { get; set; }

    public string IssuerCountry { get; set; }

    public string IssuerName { get; set; }
}

public class IncomeAmount
{
    public string Value { get; set; }

    public string Currency { get; set; }
}

public class PaymentMethod
{
    public string Type { get; set; }

    public string Id { get; set; }

    public bool Saved { get; set; }

    public Card Card { get; set; }

    public string Title { get; set; }
}

public class PaymentStatus
{
    public string Id { get; set; }

    public string Status { get; set; }

    public bool Paid { get; set; }

    public Amount Amount { get; set; }

    public AuthorizationDetails AuthorizationDetails { get; set; }

    public DateTime CreatedAt { get; set; }

    public string Description { get; set; }

    public DateTime ExpiresAt { get; set; }

    public Metadata Metadata { get; set; }

    public PaymentMethod PaymentMethod { get; set; }

    public Recipient Recipient { get; set; }

    public bool Refundable { get; set; }

    public bool Test { get; set; }

    public IncomeAmount IncomeAmount { get; set; }
}

public class ThreeDSecure
{
    public bool Applied { get; set; }
}