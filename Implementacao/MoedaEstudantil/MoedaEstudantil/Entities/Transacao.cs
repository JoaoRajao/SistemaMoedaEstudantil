using MoedaEstudantil.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace MoedaEstudantil.Entities
{
    public class Transacao
    {
        [Key]
        [Required]
        public required Guid Id { get; set; }

        [ForeignKey("Aluno")]
        public required Guid AlunoId { get; set; }

        [ForeignKey("Professor")]
        public Guid? ProfessorId { get; set; }

        [ForeignKey("Vantagem")]
        public Guid? VantagemId { get; set; }

        [Required]
        public required TipoTransacao TipoTransacao { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal Valor { get; set; }

        [Required]
        public required DateTime Data { get; set; }

        [Required]
        [StringLength(100)]
        public required string Mensagem { get; set; }
    }

}
