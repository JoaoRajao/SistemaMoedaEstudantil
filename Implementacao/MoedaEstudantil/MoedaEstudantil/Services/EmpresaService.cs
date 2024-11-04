using MoedaEstudantil.Data;
using MoedaEstudantil.DTOs;
using MoedaEstudantil.Entities;

namespace MoedaEstudantil.Services
{
    public class EmpresaService
    {
        private readonly MeritSystemContext _context;

        public EmpresaService(MeritSystemContext context)
        {
            _context = context;
        }

        public Empresa CadastrarEmpresa(EmpresaDTO empresa)
        {
            var empresaCadastrada = Empresa.FromDto(empresa);

            _context.Empresas.Add(empresaCadastrada);
            _context.SaveChanges();
            return empresaCadastrada;
        }

        public Empresa ObterEmpresa(Guid id)
        {
            return _context.Empresas.Find(id);
        }

        public Empresa AtualizarEmpresa(Guid id, Empresa empresaAtualizada)
        {
            var empresa = _context.Empresas.Find(id);
            if (empresa == null) return null;

            empresa.Nome = empresaAtualizada.Nome;
            empresa.Documento = empresaAtualizada.Documento;
            empresa.Email = empresaAtualizada.Email;
            empresa.Senha = empresaAtualizada.Senha;

            _context.SaveChanges();
            return empresa;
        }

        public bool DeletarEmpresa(Guid id)
        {
            var empresa = _context.Empresas.Find(id);
            if (empresa == null) return false;

            _context.Empresas.Remove(empresa);
            _context.SaveChanges();
            return true;
        }

        public List<Empresa> ObterTodasEmpresas()
        {
            return _context.Empresas.ToList();
        }
    }
}
