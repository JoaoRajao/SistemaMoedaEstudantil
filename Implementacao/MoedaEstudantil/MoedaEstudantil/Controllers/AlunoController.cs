using MoedaEstudantil.Entities;
using MoedaEstudantil.Services;
using Microsoft.AspNetCore.Mvc;
using MoedaEstudantil.Models;
using MoedaEstudantil.DTOs;

namespace MoedaEstudantil.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AlunoController : ControllerBase
    {
        private readonly AlunoService _alunoService;

        public AlunoController(AlunoService alunoService) => _alunoService = alunoService;

        /// <summary>
        /// Cadastrar um novo aluno.
        /// </summary>
        /// <param name="aluno">Dados do aluno a ser cadastrado.</param>
        /// <returns>Confirmação de cadastro do aluno.</returns>
        /// <response code="200">Aluno cadastrado com sucesso.</response>
        /// <response code="400">Dados do aluno inválidos.</response>
        [HttpPost("cadastro")]
        [ProducesResponseType(typeof(Aluno), 200)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult CadastrarAluno([FromBody] AlunoDTO aluno)
        {
            if (aluno == null) return BadRequest("Dados inválidos.");

            var alunoCadastrado = _alunoService.CadastrarAluno(aluno);
            return Ok(alunoCadastrado);
        }

        /// <summary>
        /// Obter um aluno pelo ID.
        /// </summary>
        /// <param name="id">ID do aluno.</param>
        /// <returns>Dados do aluno.</returns>
        /// <response code="200">Aluno encontrado com sucesso.</response>
        /// <response code="404">Aluno não encontrado.</response>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(Aluno), 200)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult ObterAluno(Guid id)
        {
            var aluno = _alunoService.ObterAluno(id);
            if (aluno == null) return NotFound("Aluno não encontrado.");
            return Ok(aluno);
        }

        /// <summary>
        /// Atualizar dados de um aluno.
        /// </summary>
        /// <param name="id">ID do aluno.</param>
        /// <param name="alunoAtualizado">Dados atualizados do aluno.</param>
        /// <returns>Confirmação de atualização do aluno.</returns>
        /// <response code="200">Aluno atualizado com sucesso.</response>
        /// <response code="400">Dados inválidos.</response>
        /// <response code="404">Aluno não encontrado.</response>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(Aluno), 200)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult AtualizarAluno(Guid id, [FromBody] AlunoDTO alunoAtualizado)
        {
            if (alunoAtualizado == null) return BadRequest("Dados inválidos.");

            var aluno = _alunoService.AtualizarAluno(id, alunoAtualizado);
            if (aluno == null) return NotFound("Aluno não encontrado.");

            return Ok(aluno);
        }

        /// <summary>
        /// Deletar um aluno pelo ID.
        /// </summary>
        /// <param name="id">ID do aluno.</param>
        /// <returns>Confirmação de exclusão do aluno.</returns>
        /// <response code="200">Aluno deletado com sucesso.</response>
        /// <response code="404">Aluno não encontrado.</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult DeletarAluno(Guid id)
        {
            var sucesso = _alunoService.DeletarAluno(id);
            if (!sucesso) return NotFound("Aluno não encontrado.");
            return Ok("Aluno deletado com sucesso.");
        }

        /// <summary>
        /// Obter todos os alunos cadastrados.
        /// </summary>
        /// <returns>Lista de alunos.</returns>
        /// <response code="200">Lista de alunos retornada com sucesso.</response>
        [HttpGet("todos")]
        [ProducesResponseType(typeof(List<AlunoDTO>), 200)]
        public IActionResult ObterTodosAlunos()
        {
            var alunos = _alunoService.ObterTodosAlunos();
            return Ok(alunos);
        }

        /// <summary>
        /// Obter o extrato de transações de um aluno.
        /// </summary>
        /// <param name="id">ID do aluno.</param>
        /// <returns>Extrato de transações do aluno.</returns>
        /// <response code="200">Extrato de transações retornado com sucesso.</response>
        /// <response code="404">Extrato de transações não encontrado.</response>
        [HttpGet("{id}/extrato")]
        [ProducesResponseType(typeof(List<Transacao>), 200)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetExtrato(Guid id)
        {
            var extrato = _alunoService.GetExtrato(id);
            if (extrato == null)
                return NotFound();

            return Ok(extrato);
        }

        /// <summary>
        /// Realiza a troca de moedas de um aluno por uma vantagem específica. 
        /// O aluno deve ter saldo suficiente para realizar a troca.
        /// </summary>
        /// <param name="id">Id do aluno que está realizando a troca.</param>
        /// <param name="model">Modelo que contém o Id da vantagem a ser trocada.</param>
        /// <returns>Retorna uma resposta indicando o sucesso ou falha da operação.</returns>
        /// <response code="200">Se a troca foi realizada com sucesso.</response>
        /// <response code="400">Se houve erro durante a troca (ex: saldo insuficiente).</response>
        [HttpPost("{id}/trocar")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> TrocarMoedas(Guid id, [FromBody] TrocaMoedas model)
        {
            var sucesso = await _alunoService.TrocarMoedas(id, model.VantagemId);
            if (!sucesso)
                return BadRequest("Erro ao trocar moedas.");

            return Ok("Moedas trocadas com sucesso.");
        }
    }
}
