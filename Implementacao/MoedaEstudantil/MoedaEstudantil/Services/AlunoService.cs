using MoedaEstudantil.Data;
using MoedaEstudantil.DTOs;
using MoedaEstudantil.Entities;
using MoedaEstudantil.Models;
using Microsoft.EntityFrameworkCore;
using MoedaEstudantil.Enums;
using MoedaEstudantil.Interfaces.Services;

namespace MoedaEstudantil.Services
{
    public class AlunoService : PessoaService
    {
        private readonly MeritSystemContext _context;

        public AlunoService(MeritSystemContext context, EmailService emailService)
            : base(context, emailService)
        {
            _context = context;
        }

        public Aluno CadastrarAluno(AlunoDTO alunoDto)
        {
            var aluno = Aluno.FromDto(alunoDto);
            if (_context.Alunos.Any(a => a.Documento == aluno.Documento))
            {
                throw new Exception("Aluno já cadastrado.");
            }

            _context.Alunos.Add(aluno);
            _context.SaveChanges();
            return aluno;
        }

        public Aluno ObterAluno(Guid id)
        {
            return _context.Alunos.Find(id) ?? throw new Exception("Não foi encontrado aluno com esse ID");
        }

        public Aluno AtualizarAluno(Guid id, AlunoDTO alunoAtualizado)
        {
            var aluno = _context.Alunos.Find(id) ?? throw new Exception("Não foi encontrado aluno com esse ID");

            aluno.Nome = alunoAtualizado.Nome;
            aluno.Email = alunoAtualizado.Email;
            aluno.Documento = alunoAtualizado.Documento;
            aluno.Endereco = alunoAtualizado.Endereco;
            aluno.InstituicaoEnsino = alunoAtualizado.InstituicaoEnsino;
            aluno.Curso = alunoAtualizado.Curso;

            _context.SaveChanges();
            return aluno;
        }

        public bool DeletarAluno(Guid id)
        {
            var aluno = _context.Alunos.Find(id);
            if (aluno == null) return false;

            _context.Alunos.Remove(aluno);
            _context.SaveChanges();
            return true;
        }

        public List<Aluno> ObterTodosAlunos()
        {
            return _context.Alunos.ToList();
        }

        public Extrato GetExtrato(Guid alunoId)
        {
            var aluno = _context.Alunos.Find(alunoId);
            if (aluno == null) return null;

            var transacoes = _context.Transacoes
                .Where(t => t.AlunoId == alunoId)
                .OrderByDescending(t => t.Data)
                .ToList();

            return new Extrato
            {
                TotalMoedas = aluno.SaldoMoedas,
                Transacoes = transacoes
            };
        }
    }
}
