using Microsoft.AspNetCore.Mvc;
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
        public IActionResult CadastrarEmpresa([FromBody] Empresa empresa)
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
        public IActionResult ObterEmpresa(int id)
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
        public IActionResult AtualizarEmpresa(int id, [FromBody] Empresa empresaAtualizada)
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
        public IActionResult DeletarEmpresa(int id)
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
    }
}
