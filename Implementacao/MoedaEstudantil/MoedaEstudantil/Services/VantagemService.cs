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

            var empresa = _context.Empresas.Find(vantagemDto.EmpresaID);

            if (empresa == null) 
                throw new Exception("Empresa não encontrada.");

            empresa.VantagensOferecidas.Add(vantagem);

            _context.SaveChanges();
            return vantagem;
        }

        public Vantagem GetVantagemById(Guid id)
        {
            var vantagem = _context.Vantagens
                .Include(v => v.EmpresaId)
                .FirstOrDefault(v => v.Id == id);

            return vantagem == null ? throw new Exception("Vantagem não encontrada.") : vantagem;
        }

        public List<Vantagem> ListarVantagens()
        {
            return _context.Vantagens.ToList();
        }
    }
}
