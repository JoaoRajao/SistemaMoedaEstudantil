using MoedaEstudantil.DTOs;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MoedaEstudantil.Entities
{
    public class Vantagem
    {
        [Key]
        public Guid Id { get; set; }

        [ForeignKey("Empresa")]
        public Guid EmpresaId { get; set; }

        [Required]
        [StringLength(100)]
        public string Descricao { get; set; }

        [Required]
        [StringLength(100)]
        public string Foto { get; set; }

        [Required]
        [Column(TypeName = "decimal(18, 2)")]
        public decimal Custo { get; set; }

        public static Vantagem FromDTO(VantagemDTO dto)
        {
            return new Vantagem
            {
                Id = Guid.NewGuid(),
                EmpresaId = dto.EmpresaID,
                Descricao = dto.Descricao,
                Custo = dto.Custo,
                Foto = dto.Foto
            };
        }
    }

}
