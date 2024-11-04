using MoedaEstudantil.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MoedaEstudantil.Entities
{
    public class Transacao
    {
        [Key]
        public required Guid Id { get; set; }

        [ForeignKey("Aluno")]
        public required Guid AlunoId { get; set; }

        [ForeignKey("Professor")]
        public Guid ProfessorId { get; set; }
               
        public required TipoTransacao TipoTransacao { get; set; }

        [Required]
        [Column(TypeName = "decimal(18, 2)")]
        public required decimal Valor { get; set; }
        
        public required DateTime Data { get; set; }

        [Required]
        [StringLength(100)]
        public string Mensagem { get; set; }
    } 

}
