using MoedaEstudantil.Enums;

namespace MoedaEstudantil.Models
{
    public class TrocaMoedas
    {
        public Guid VantagemId { get; set; }
        public Guid AlunoId { get; set; }
        public TipoTransacao TipoTransacao { get; set; }
    }
}
