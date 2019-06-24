using MailKit.Net.Smtp;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Voter.ApiServices.ApiServiceInterfaces;

namespace Voter.ApiServices
{
    public class EmailSender : IEmailSender
    {
        MimeMessage _emailSender;
        public EmailSender()
        {
            _emailSender = new MimeMessage();
            _emailSender.From.Add(new MailboxAddress("yourVoterr@gmail.com"));
        }

        public void SendLoginAndPassword(string login, string password, string userEmail)
        {
            _emailSender.To.Add(new MailboxAddress(userEmail));
            _emailSender.Subject = "New account in voter application";
            _emailSender.Body = new TextPart("plain")
            {
                Text = $"Your login is {login} and password {password}"
            };

            using (var client = new SmtpClient())
            {
                client.Connect("smtp.gmail.com", 587, false);
                client.Authenticate("yourVoterr@gmail.com", "yourVoter4321");
                client.Send(_emailSender);
                client.Disconnect(true);
            }
        }

    }

}

