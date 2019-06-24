using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Options;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Voter.ApiServices.ApiServiceInterfaces;
using Voter.AppSettings;

namespace Voter.ApiServices
{
    public class EmailSender : IEmailSender
    {
        private readonly EmailSettings _emailSettings;
        private readonly IHostingEnvironment _env;
        public EmailSender(IOptions<EmailSettings> emailSettings,
        IHostingEnvironment env)
        {
            _emailSettings = emailSettings.Value;
            _env = env;
        }

        public async Task SendLoginAndPassword(string login, string password, string userEmail)
        {
            try
            {
                var mimeMessage = new MimeMessage();
                mimeMessage.From.Add(new MailboxAddress(_emailSettings.Sender));
                mimeMessage.To.Add(new MailboxAddress(userEmail));
                mimeMessage.Subject = "Your account for voter application has been created";
                mimeMessage.Body = new TextPart("html")
                {
                    Text = $"Login: {login} Password: {password}"
                };

                using (var client = new SmtpClient())
                {
                    client.ServerCertificateValidationCallback = (s, c, h, e) => true;
                    if (_env.IsDevelopment())
                    {
                        await client.ConnectAsync(_emailSettings.MailServer, _emailSettings.MailPort, false);
                    }
                    else
                    {
                        await client.ConnectAsync(_emailSettings.MailServer);
                    }
                    await client.AuthenticateAsync(_emailSettings.Sender, _emailSettings.Password);
                    await client.SendAsync(mimeMessage);
                    await client.DisconnectAsync(true);
                }

            }
            catch (Exception ex)
            {
                // TODO: handle exception
                throw new InvalidOperationException(ex.Message);
            }

        }
    }
}

