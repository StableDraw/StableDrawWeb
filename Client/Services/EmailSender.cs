using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc.RazorPages;
using MimeKit;
using MailKit.Net.Smtp;
using static Duende.IdentityServer.Models.IdentityResources;

namespace CLI.Services
{
   public class EmailSender : IEmailSender
   {
      public async Task SendEmailAsync(string email, string subject, string message)
      {
            string MyMail = "support@stabledraw.com";
            string MyPass = "yegaRy5CpEuyrgPkKnHi";
            //subject = "Подтверждение адреса электронной почты";
            //message = "Welcome to StableDraw. To activate your account, visit this URL: \r\n    <a href=\"http://stabledraw.com/login/\">http://stabledraw.com/</a>.\r\n</p>";

            using var emailMessage = new MimeMessage();

            emailMessage.From.Add(new MailboxAddress("StableDraw", MyMail));
            emailMessage.To.Add(new MailboxAddress("", email));
            emailMessage.Subject = subject;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = message
            };
            using (var client = new SmtpClient())
            {
                await client.ConnectAsync("smtp.mail.ru", 25, false);
                await client.AuthenticateAsync(MyMail, MyPass);
                await client.SendAsync(emailMessage);
                await client.DisconnectAsync(true);
            }
      }
   }
}
