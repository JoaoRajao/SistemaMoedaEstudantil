using MoedaEstudantil.DTOs;
using MoedaEstudantil.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MoedaEstudantil.Entities
{
    public class Professor : Pessoa
    {
        [Required]
        [StringLength(100)]
        public required string Departamento { get; set; }

        [Required]
        [StringLength(100)]
        public required string Instituicao { get; set; }
               
        public List<Transacao> Transacoes { get; set; }

        public Professor()
        {
            Transacoes = new List<Transacao>();
            SaldoMoedas = 1000;
        }

        public static Professor FromDto(ProfessorDTO professorDTO)
        {
            return new Professor
            {
                Nome = professorDTO.Nome,
                Email = professorDTO.Email,
                Departamento = professorDTO.Departamento,
                Instituicao = professorDTO.Instituicao,
                Documento = professorDTO.Documento,
                Senha = professorDTO.Senha
            };
        }
    }

}
