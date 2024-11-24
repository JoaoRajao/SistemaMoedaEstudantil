using Microsoft.AspNetCore.Mvc;
using MoedaEstudantil.DTOs;
using MoedaEstudantil.Entities;
using MoedaEstudantil.Services;

namespace MoedaEstudantil.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmpresaController : ControllerBase
    {
        private readonly EmpresaService _empresaService;

        public EmpresaController(EmpresaService empresaService)
        {
            _empresaService = empresaService;
        }

        /// <summary>
        /// Cadastrar uma nova empresa parceira.
        /// </summary>
        /// <param name="empresa">Dados da empresa a ser cadastrada.</param>
        /// <returns>Confirmação de cadastro da empresa.</returns>
        [HttpPost("cadastro")]
        [ProducesResponseType(typeof(Empresa), 200)]
        [ProducesResponseType(400)]
        public IActionResult CadastrarEmpresa([FromBody] EmpresaDTO empresa)
        {
            if (empresa == null) return BadRequest("Dados inválidos.");

            var empresaCadastrada = _empresaService.CadastrarEmpresa(empresa);
            return Ok(empresaCadastrada);
        }

        /// <summary>
        /// Obter uma empresa parceira pelo ID.
        /// </summary>
        /// <param name="id">ID da empresa.</param>
        /// <returns>Dados da empresa parceira.</returns>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(Empresa), 200)]
        [ProducesResponseType(404)]
        public IActionResult ObterEmpresa(Guid id)
        {
            var empresa = _empresaService.ObterEmpresa(id);
            if (empresa == null) return NotFound("Empresa não encontrada.");
            return Ok(empresa);
        }

        /// <summary>
        /// Atualizar os dados de uma empresa parceira.
        /// </summary>
        /// <param name="id">ID da empresa.</param>
        /// <param name="empresaAtualizada">Dados atualizados da empresa.</param>
        /// <returns>Confirmação de atualização da empresa.</returns>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(Empresa), 200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        public IActionResult AtualizarEmpresa(Guid id, [FromBody] Empresa empresaAtualizada)
        {
            if (empresaAtualizada == null) return BadRequest("Dados inválidos.");

            var empresa = _empresaService.AtualizarEmpresa(id, empresaAtualizada);
            if (empresa == null) return NotFound("Empresa não encontrada.");

            return Ok(empresa);
        }

        /// <summary>
        /// Deletar uma empresa parceira pelo ID.
        /// </summary>
        /// <param name="id">ID da empresa.</param>
        /// <returns>Confirmação de exclusão da empresa.</returns>
        [HttpDelete("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public IActionResult DeletarEmpresa(Guid id)
        {
            var sucesso = _empresaService.DeletarEmpresa(id);
            if (!sucesso) return NotFound("Empresa não encontrada.");
            return Ok("Empresa deletada com sucesso.");
        }

        /// <summary>
        /// Obter todas as empresas parceiras cadastradas.
        /// </summary>
        /// <returns>Lista de empresas parceiras.</returns>
        [HttpGet("todas")]
        [ProducesResponseType(typeof(List<Empresa>), 200)]
        public IActionResult ObterTodasEmpresas()
        {
            var empresas = _empresaService.ObterTodasEmpresas();
            return Ok(empresas);
        }

        /// <summary>
        /// Obter todas as vantagens de uma empresa pelo ID.
        /// </summary>
        /// <param name="empresaId">ID da empresa.</param>
        /// <returns>Lista de vantagens da empresa.</returns>
        [HttpGet("{empresaId}/vantagens")]
        [ProducesResponseType(typeof(List<Vantagem>), 200)]
        [ProducesResponseType(404)]
        public IActionResult ObterVantagensDaEmpresa(Guid empresaId)
        {
            var empresa = _empresaService.ObterEmpresa(empresaId);
            if (empresa == null)
                return NotFound("Empresa não encontrada.");

            var vantagens = empresa.VantagensOferecidas;
            return Ok(vantagens);
        }

        /// <summary>
        /// Cadastrar uma nova vantagem para uma empresa.
        /// </summary>
        /// <param name="empresaId">ID da empresa.</param>
        /// <param name="vantagemDto">Dados da vantagem a ser cadastrada.</param>
        /// <returns>Retorna a vantagem criada com o status 201 (Created).</returns>
        [HttpPost("{empresaId}/vantagens")]
        [ProducesResponseType(typeof(Vantagem), 201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public IActionResult CadastrarVantagemParaEmpresa(Guid empresaId, [FromBody] VantagemDTO vantagemDto)
        {
            var empresa = _empresaService.ObterEmpresa(empresaId);
            if (empresa == null)
                return NotFound("Empresa não encontrada.");

            if (vantagemDto == null)
                return BadRequest("Dados inválidos.");

            var vantagemCadastrada = _empresaService.CadastrarVantagem(vantagemDto, empresaId);

            return CreatedAtAction(nameof(ObterVantagensDaEmpresa), new { empresaId = empresaId }, vantagemCadastrada);
        }

    }
}
