using MoedaEstudantil.DTOs;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MoedaEstudantil.Entities
{
    public class Vantagem
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        [StringLength(100)]
        public required string Nome { get; set; }

        [ForeignKey("Empresa")]
        public Guid EmpresaId { get; set; }

        [Required]
        [StringLength(100)]
        public required string Descricao { get; set; }

        [Required]
        [Column(TypeName = "decimal(18, 2)")]
        public required decimal Custo { get; set; }

        public static Vantagem FromDTO(VantagemDTO dto, Guid empresaId)
        {
            return new Vantagem
            {
                Id = Guid.NewGuid(),
                EmpresaId = empresaId,
                Nome = dto.Nome,
                Descricao = dto.Descricao,
                Custo = dto.Custo
            };
        }
    }

}
