using MoedaEstudantil.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MoedaEstudantil.Entities
{
    public class Professor : Pessoa
    {
        [Required]
        [StringLength(100)]
        public string Departamento { get; set; }

        [Required]
        [StringLength(100)]
        public string Instituicao { get; set; }

        [Required]
        [Column(TypeName = "decimal(18, 2)")]
        public decimal SaldoMoedas { get; set; }

        public List<Transacao> Transacoes { get; set; }

        public Professor()
        {
            Transacoes = new List<Transacao>();
            SaldoMoedas = 1000; // Inicia com 1000 moedas por semestre
        }
    }

}
