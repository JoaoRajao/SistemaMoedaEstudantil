using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MoedaEstudantil.Entities
{
    public abstract class Pessoa
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        [StringLength(100)]
        public required string Nome { get; set; }

        [Required]
        [StringLength(11)]
        ///RG ou CPF
        public required string Documento { get; set; }

        [Required]
        [EmailAddress]
        public required string Email { get; set; }

        [Required]
        public required string Senha { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal SaldoMoedas { get; set; }
    }
}
