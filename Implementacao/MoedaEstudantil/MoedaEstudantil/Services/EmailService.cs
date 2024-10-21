using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace MoedaEstudantil.Services
{
    public class EmailService
    {
        private readonly string _smtpHost;
        private readonly int _smtpPort;
        private readonly string _smtpUsername;
        private readonly string _smtpPassword;

        public EmailService(string smtpHost, int smtpPort, string smtpUsername, string smtpPassword)
        {
            _smtpHost = smtpHost;
            _smtpPort = smtpPort;
            _smtpUsername = smtpUsername;
            _smtpPassword = smtpPassword;
        }

        public async Task EnviarEmailAsync(string destinatario, string assunto, string mensagem)
        {
            var mailMessage = new MailMessage
            {
                From = new MailAddress(_smtpUsername),
                Subject = assunto,
                Body = mensagem,
                IsBodyHtml = true
            };

            mailMessage.To.Add(destinatario);

            using (var client = new SmtpClient(_smtpHost, _smtpPort))
            {
                client.Credentials = new NetworkCredential(_smtpUsername, _smtpPassword);
                client.EnableSsl = true;

                await client.SendMailAsync(mailMessage);
            }
        }
    }
}
