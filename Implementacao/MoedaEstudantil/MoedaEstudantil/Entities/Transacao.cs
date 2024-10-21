using MoedaEstudantil.Enums;
using System.ComponentModel.DataAnnotations;

namespace MoedaEstudantil.Entities
{
    public class Transacao
    {
        [Key]
        public Guid Id { get; set; }
        public Guid AlunoId { get; set; }
        public Guid VantagemId { get; set; }
        public Guid ProfessorId { get; set; }
        public TipoTransacao TipoTransacao { get; set; } 
        public decimal Valor { get; set; }
        public DateTime Data { get; set; }
        public string Mensagem { get; set; }
        public string Participante { get; set; }
        public string Codigo { get; set;}
    } 

}
