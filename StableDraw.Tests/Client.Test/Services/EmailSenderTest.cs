//using Moq;
using MailKit.Net.Smtp;
using static Duende.IdentityServer.Models.IdentityResources;
using MailKit.Net.Smtp;
using MimeKit;

namespace CLI.Services;

public class EmailSenderTest
{
    private EmailSender CreateDefaultEmailSender()
    {
        var emailSender = new EmailSender();
        return emailSender;
    }

    private SmtpClient CreateDefaultSmtpClient()
    {
        var smtpClient = new SmtpClient();
        return smtpClient;
    }

    private MimeMessage CreateDefaultMimeMessage(string email, string subject, string message, string MyMail)
    {
        using var emailMessage = new MimeMessage();

        emailMessage.From.Add(new MailboxAddress("StableDraw", MyMail));
        emailMessage.To.Add(new MailboxAddress("", email));
        emailMessage.Subject = subject;
        emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
        {
            Text = message
        };
        return emailMessage;
    }


    [Fact]
    public void SendEmailAsync_ConnectAsync_Returns()
    {
        // Arrange
        var client = CreateDefaultSmtpClient();

        // Act
        client.ConnectAsync("smtp.mail.ru", 25, false);

        // Assert
        Assert.NotNull(client);
    }

    [Theory]
    [InlineData("support@stabledraw.com", "yegaRy5CpEuyrgPkKnHi")]
    public void SendEmailAsync_AuthenticateAsync_Returns(string MyMail, string MyPass)
    {
        // Arrange
        var client = CreateDefaultSmtpClient();

        // Act
        client.AuthenticateAsync(MyMail, MyPass);

        // Assert
        Assert.NotNull(client);
    }

    [Theory]
    [InlineData("support@stabledraw.com", "test", "test", "support@stabledraw.com")]
    public void SendEmailAsync_SendAsync_Returns(string email, string subject, string message, string MyMail)
    {
        // Arrange
        var client = CreateDefaultSmtpClient();
        var emailMessage = CreateDefaultMimeMessage(email, subject, message, MyMail);

        // Act
        client.SendAsync(emailMessage);

        // Assert
        Assert.NotNull(client);
    }

    [Fact]
    public void SendEmailAsync_DisconnectAsync_Returns()
    {
        // Arrange
        string MyMail = "support @stabledraw.com";
        string MyPass = "yegaRy5CpEuyrgPkKnHi";
        var client = CreateDefaultSmtpClient();
        client.AuthenticateAsync(MyMail, MyPass);

        // Act
        client.DisconnectAsync(true);

        // Assert
        Assert.NotNull(client);
    }
}