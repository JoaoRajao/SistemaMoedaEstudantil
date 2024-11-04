using Microsoft.AspNetCore.Mvc;
using MoedaEstudantil.Services;
using MoedaEstudantil.Entities;
using MoedaEstudantil.DTOs;
using MoedaEstudantil.Models;

namespace MoedaEstudantil.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransacaoController : ControllerBase
    {
        private readonly AlunoService _alunoService;
        private readonly PessoaService _pessoaService;

        public TransacaoController(AlunoService alunoService, PessoaService pessoaService)
        {
            _alunoService = alunoService;
            _pessoaService = pessoaService;
        }

        // Endpoint para trocar moedas por uma vantagem
        [HttpPost("trocar-moedas")]
        public async Task<IActionResult> TrocarMoedas([FromBody] TrocaMoedas trocaMoedas)
        {
            try
            {
                var sucesso = await _pessoaService.TrocarMoedas(trocaMoedas);
                if (sucesso)
                {
                    return Ok(new { Mensagem = "Troca realizada com sucesso." });
                }
                return BadRequest(new { Mensagem = "Saldo insuficiente para realizar a troca." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Mensagem = $"Erro ao realizar a troca: {ex.Message}" });
            }
        }

        // Endpoint para enviar moedas de um professor para um aluno
        [HttpPost("enviar-moedas")]
        public async Task<IActionResult> EnviarMoedas([FromBody] TransacaoDTO transacao)
        {
            try
            {
                var sucesso = await _pessoaService.EnviarMoedas(transacao);
                if (sucesso)
                {
                    return Ok(new { Mensagem = "Moedas enviadas com sucesso." });
                }
                return BadRequest(new { Mensagem = "Falha no envio: saldo insuficiente ou dados inválidos." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Mensagem = $"Erro ao enviar moedas: {ex.Message}" });
            }
        }
    }
}
