using MoedaEstudantil.Entities;
using MoedaEstudantil.Services;
using Microsoft.AspNetCore.Mvc;

namespace MoedaEstudantil.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AlunoController : ControllerBase
    {
        private readonly AlunoService _alunoService;

        public AlunoController(AlunoService alunoService)
        {
            _alunoService = alunoService;
        }

        /// <summary>
        /// Cadastrar um novo aluno.
        /// </summary>
        /// <param name="aluno">Dados do aluno a ser cadastrado.</param>
        /// <returns>Confirmação de cadastro do aluno.</returns>
        [HttpPost("cadastro")]
        [ProducesResponseType(typeof(Aluno), 200)]
        [ProducesResponseType(400)]
        public IActionResult CadastrarAluno([FromBody] Aluno aluno)
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
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(Aluno), 200)]
        [ProducesResponseType(404)]
        public IActionResult ObterAluno(int id)
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
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(Aluno), 200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        public IActionResult AtualizarAluno(int id, [FromBody] Aluno alunoAtualizado)
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
        [HttpDelete("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public IActionResult DeletarAluno(int id)
        {
            var sucesso = _alunoService.DeletarAluno(id);
            if (!sucesso) return NotFound("Aluno não encontrado.");
            return Ok("Aluno deletado com sucesso.");
        }

        /// <summary>
        /// Obter todos os alunos cadastrados.
        /// </summary>
        /// <returns>Lista de alunos.</returns>
        [HttpGet("todos")]
        [ProducesResponseType(typeof(List<Aluno>), 200)]
        public IActionResult ObterTodosAlunos()
        {
            var alunos = _alunoService.ObterTodosAlunos();
            return Ok(alunos);
        }
    }
}