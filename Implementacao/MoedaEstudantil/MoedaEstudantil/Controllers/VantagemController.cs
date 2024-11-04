using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MoedaEstudantil.DTOs;
using MoedaEstudantil.Entities;
using MoedaEstudantil.Services;

namespace MoedaEstudantil.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Empresa")]
    public class VantagemController : ControllerBase
    {
        private readonly VantagemService _vantagemService;

        public VantagemController(VantagemService vantagemService)
        {
            _vantagemService = vantagemService;
        }

        /// <summary>
        /// Cadastra uma nova vantagem no sistema.
        /// </summary>
        /// <param name="vantagem">Dados da vantagem a ser cadastrada.</param>
        /// <returns>Retorna a vantagem criada com o status 201 (Created).</returns>
        /// <response code="201">Se a vantagem foi criada com sucesso.DTO</response>
        /// <response code="400">Se houve erro ao cadastrar a vantagem.</response>
        [HttpPost]
        [ProducesResponseType(typeof(Vantagem), 201)]
        [ProducesResponseType(400)]
        public IActionResult CadastrarVantagem([FromBody] VantagemDTO vantagem)
        {
            if (vantagem == null)
                return BadRequest("Dados Invalidos.");

            var vantagemCadastrada = _vantagemService.CadastrarVantagem(vantagem);

            return CreatedAtAction(nameof(GetVantagem), new { id = vantagemCadastrada.Id }, vantagemCadastrada);
        }

        /// <summary>
        /// Obtém uma vantagem pelo ID.
        /// </summary>
        /// <param name="id">ID da vantagem.</param>
        /// <returns>Retorna os dados da vantagem correspondente.</returns>
        /// <response code="200">Se a vantagem foi encontrada.</response>
        /// <response code="404">Se a vantagem não foi encontrada.</response>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(Vantagem), 200)]
        [ProducesResponseType(404)]
        public IActionResult GetVantagem(Guid id)
        {
            var vantagem = _vantagemService.GetVantagemById(id);
            if (vantagem == null)
                return NotFound("Vantagem não encontrada.");

            return Ok(vantagem);
        }

        [HttpGet]
        [ProducesResponseType(typeof(List<Vantagem>), 200)]
        [ProducesResponseType(404)]
        public IActionResult GetAll()
        {
            var vantagem = _vantagemService.ListarVantagens();

            if (vantagem == null)
                return NotFound("Vantagem não encontrada.");

            return Ok(vantagem);
        }
    }
}
