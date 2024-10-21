using MoedaEstudantil.Entities;

namespace MoedaEstudantil.Models
{
    public class Extrato
    {
        public decimal TotalMoedas { get; set; }
        public List<Transacao> Transacoes { get; set; }
    }
}
