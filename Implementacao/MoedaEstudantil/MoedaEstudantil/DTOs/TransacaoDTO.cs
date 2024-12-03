using MoedaEstudantil.Enums;
using System.ComponentModel.DataAnnotations;

namespace MoedaEstudantil.DTOs
{
    public class TransacaoDTO
    {        
        public required Guid AlunoId { get; set; }
        public required Guid ProfessorId { get; set; }
        public required decimal Valor { get; set; }
        public string Mensagem { get; set; }
        public string? Email { get; set; }
    }
}
