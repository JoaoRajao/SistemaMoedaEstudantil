using MoedaEstudantil.Data;
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

        public Empresa CadastrarEmpresa(Empresa empresa)
        {
            _context.Empresas.Add(empresa);
            _context.SaveChanges();
            return empresa;
        }

        public Empresa ObterEmpresa(int id)
        {
            return _context.Empresas.Find(id);
        }

        public Empresa AtualizarEmpresa(int id, Empresa empresaAtualizada)
        {
            var empresa = _context.Empresas.Find(id);
            if (empresa == null) return null;

            empresa.Nome = empresaAtualizada.Nome;
            empresa.CPF = empresaAtualizada.CPF;
            empresa.Email = empresaAtualizada.Email;
            empresa.Senha = empresaAtualizada.Senha;

            _context.SaveChanges();
            return empresa;
        }

        public bool DeletarEmpresa(int id)
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
