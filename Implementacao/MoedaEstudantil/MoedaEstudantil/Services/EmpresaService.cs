using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using MoedaEstudantil.Data;
using MoedaEstudantil.DTOs;
using MoedaEstudantil.Entities;
using System.Reflection.Metadata.Ecma335;

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

        public Empresa? ObterEmpresa(Guid id)
        {
            return _context.Empresas
                .Include(e => e.VantagensOferecidas)
                .FirstOrDefault(e => e.Id == id);
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
            return _context.Empresas
                .Include(e => e.VantagensOferecidas).ToList();
        }

        public Vantagem CadastrarVantagem(VantagemDTO vantagemDto, Guid empresaId)
        {
            var vantagem = Vantagem.FromDTO(vantagemDto, empresaId);
            _context.Vantagens.Add(vantagem);

            var empresa = _context.Empresas.Find(empresaId) ?? throw new Exception("Empresa não encontrada.");

            empresa.VantagensOferecidas.Add(vantagem);

            _context.SaveChanges();
            return vantagem;
        }
    }
}
