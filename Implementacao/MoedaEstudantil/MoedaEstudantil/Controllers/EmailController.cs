using Microsoft.AspNetCore.Mvc;
using MoedaEstudantil.Models;
using MoedaEstudantil.Services;

namespace MoedaEstudantil.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly EmailService _emailService;

        public EmailController(EmailService emailService)
        {
            _emailService = emailService;
        }

        [HttpPost("enviar")]
        public async Task<IActionResult> EnviarEmail([FromBody] EmailRequest request)
        {
            if (string.IsNullOrEmpty(request.Destinatario) || string.IsNullOrEmpty(request.Assunto) || string.IsNullOrEmpty(request.Mensagem))
            {
                return BadRequest("Todos os campos são obrigatórios.");
            }

            try
            {
                await _emailService.EnviarEmailAsync(request.Destinatario, request.Assunto, request.Mensagem);
                return Ok("E-mail enviado com sucesso.");
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, $"Erro ao enviar e-mail: {ex}");
            }
        }
    }
}
