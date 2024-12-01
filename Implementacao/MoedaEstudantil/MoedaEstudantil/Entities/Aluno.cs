using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using MoedaEstudantil.DTOs;

namespace MoedaEstudantil.Entities
{
    public class Aluno : Pessoa
    {
        [Required]
        [StringLength(100)]
        public required string Endereco { get; set; }

        [Required]
        [StringLength(100)]
        public required string InstituicaoEnsino { get; set; }

        [Required]
        [StringLength(100)]
        public required string Curso { get; set; }

        public List<Transacao> Transacoes { get; set; }

        public Aluno()
        {
            Transacoes = new List<Transacao>();
        }

        public static Aluno FromDto(AlunoDTO alunoDto)
        {
            return new Aluno
            {
                Nome = alunoDto.Nome,
                Senha = alunoDto.Senha,
                Email = alunoDto.Email,
                Documento = alunoDto.Documento,
                Endereco = alunoDto.Endereco,
                InstituicaoEnsino = alunoDto.InstituicaoEnsino,
                Curso = alunoDto.Curso,
                SaldoMoedas = alunoDto.SaldoMoedas,
                Transacoes = new List<Transacao>()
            };
        }
    }
}
