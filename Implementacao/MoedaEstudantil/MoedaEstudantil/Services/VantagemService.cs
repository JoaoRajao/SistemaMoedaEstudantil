using Microsoft.EntityFrameworkCore;
using MoedaEstudantil.Data;
using MoedaEstudantil.DTOs;
using MoedaEstudantil.Entities;

namespace MoedaEstudantil.Services
{
    public class VantagemService
    {
        private readonly MeritSystemContext _context;

        public VantagemService(MeritSystemContext context)
        {
            _context = context;
        }

        public Vantagem CadastrarVantagem(VantagemDTO vantagemDto)
        {
            var vantagem = Vantagem.FromDTO(vantagemDto);
            _context.Vantagens.Add(vantagem);
            _context.SaveChanges();
            return vantagem;
        }

        public Vantagem GetVantagemById(Guid id)
        {
            return _context.Vantagens
                .Include(v => v.EmpresaId)
                .FirstOrDefault(v => v.Id == id);
        }

        public bool AtualizarVantagem(Vantagem atualizado)
        {
            var vantagem = _context.Vantagens.Find(atualizado.Id);
            if (vantagem == null)
                return false;

            // Atualizar propriedades
            vantagem.Descricao = atualizado.Descricao;
            vantagem.Custo = atualizado.Custo;

            _context.SaveChanges();
            return true;
        }

        public bool DeletarVantagem(Guid id)
        {
            var vantagem = _context.Vantagens.Find(id);
            if (vantagem == null)
                return false;

            _context.Vantagens.Remove(vantagem);
            _context.SaveChanges();
            return true;
        }

        public List<Vantagem> ListarVantagens()
        {
            return _context.Vantagens.Include(v => v.EmpresaId).ToList();
        }
    }
}
