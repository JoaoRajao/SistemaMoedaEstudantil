using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MoedaEstudantil.DTOs
{
    public class ProfessorDTO : PessoaDTO
    {
        public required string Departamento { get; set; }
        
        public required string Instituicao { get; set; }      
    }
}
