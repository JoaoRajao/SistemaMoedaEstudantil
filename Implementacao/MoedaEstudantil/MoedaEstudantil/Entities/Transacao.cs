using MoedaEstudantil.Enums;

namespace MoedaEstudantil.Entities
{
    public class Transacao
    {
        public int Id { get; set; }
        public TipoTransacao TipoTransacao { get; set; } 
        public decimal Valor { get; set; }
        public DateTime Data { get; set; }
        public string Mensagem { get; set; }
        public string Participante { get; set; }
    }

}
