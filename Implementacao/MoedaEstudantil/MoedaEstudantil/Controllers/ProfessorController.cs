using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MoedaEstudantil.Entities;
using MoedaEstudantil.Services;

namespace MoedaEstudantil.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Professor")]
    public class ProfessorController : ControllerBase
    {
        private readonly ProfessorService _professorService;

        public ProfessorController(ProfessorService professorService) => _professorService = professorService;

        /// <summary>
        /// Cadastrar um novo professor.
        /// </summary>
        /// <param name="professor">Dados do professor a ser cadastrado.</param>
        /// <returns>Confirmação de cadastro do professor.</returns>
        /// <response code="200">Professor cadastrado com sucesso.</response>
        /// <response code="400">Dados inválidos.</response>
        [HttpPost("cadastro")]
        [ProducesResponseType(typeof(Professor), 200)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult CadastrarProfessor([FromBody] Professor professor)
        {
            if (professor == null) return BadRequest("Dados inválidos.");

            var professorCadastrado = _professorService.CadastrarProfessor(professor);
            return Ok(professorCadastrado);
        }

        /// <summary>
        /// Obter um professor pelo ID.
        /// </summary>
        /// <param name="id">ID do professor.</param>
        /// <returns>Dados do professor.</returns>
        /// <response code="200">Professor encontrado com sucesso.</response>
        /// <response code="404">Professor não encontrado.</response>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(Professor), 200)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetProfessor(Guid id)
        {
            var professor = _professorService.GetProfessorById(id);
            if (professor == null)
                return NotFound();

            return Ok(professor);
        }

        /// <summary>
        /// Atualizar dados de um professor.
        /// </summary>
        /// <param name="id">ID do professor.</param>
        /// <param name="atualizado">Dados atualizados do professor.</param>
        /// <returns>Confirmação de atualização do professor.</returns>
        /// <response code="204">Professor atualizado com sucesso.</response>
        /// <response code="400">ID do professor inválido.</response>
        /// <response code="404">Professor não encontrado.</response>
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult AtualizarProfessor(Guid id, [FromBody] Professor atualizado)
        {
            if (id != atualizado.Id)
                return BadRequest("ID inválido.");

            var resultado = _professorService.AtualizarProfessor(atualizado);
            if (!resultado)
                return NotFound("Professor não encontrado.");

            return NoContent();
        }

        /// <summary>
        /// Deletar um professor pelo ID.
        /// </summary>
        /// <param name="id">ID do professor.</param>
        /// <returns>Confirmação de exclusão do professor.</returns>
        /// <response code="204">Professor deletado com sucesso.</response>
        /// <response code="404">Professor não encontrado.</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult DeletarProfessor(Guid id)
        {
            var resultado = _professorService.DeletarProfessor(id);
            if (!resultado)
                return NotFound("Professor não encontrado.");

            return NoContent();
        }
    }
}
