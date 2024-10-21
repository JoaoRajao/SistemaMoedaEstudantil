using Microsoft.EntityFrameworkCore;
using MoedaEstudantil.Data;
using MoedaEstudantil.Entities;
using MoedaEstudantil.Enums;

namespace MoedaEstudantil.Services
{
    public class ProfessorService
    {
        private readonly MeritSystemContext _context;
        private readonly EmailService _emailService;

        public ProfessorService(MeritSystemContext context, EmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        public Professor CadastrarProfessor(Professor professor)
        {
            _context.Professores.Add(professor);
            _context.SaveChanges();
            return professor;
        }

        public Professor GetProfessorById(Guid id)
        {
            return _context.Professores
                .Include(p => p.Instituicao)
                .FirstOrDefault(p => p.Id == id);
        }

        public bool AtualizarProfessor(Professor atualizado)
        {
            var professor = _context.Professores.Find(atualizado.Id);
            if (professor == null)
                return false;

            professor.Nome = atualizado.Nome;
            professor.Email = atualizado.Email;
            professor.Departamento = atualizado.Departamento;
            professor.Instituicao = atualizado.Instituicao;

            _context.SaveChanges();
            return true;
        }

        public bool DeletarProfessor(Guid id)
        {
            var professor = _context.Professores.Find(id);
            if (professor == null)
                return false;

            _context.Professores.Remove(professor);
            _context.SaveChanges();
            return true;
        }

        public async Task<bool> DistribuirMoedas(Guid professorId, Guid alunoId, int quantidade, string motivo)
        {
            var professor = _context.Professores.Find(professorId);
            var aluno = _context.Alunos.Find(alunoId);

            if (professor == null || aluno == null || professor.SaldoMoedas < quantidade)
                return false;

            // Criar transação
            var transacao = new Transacao
            {
                ProfessorId = professorId,
                AlunoId = alunoId,
                Valor = quantidade,
                TipoTransacao = TipoTransacao.ENVIO,
                Mensagem = motivo,
                Data = DateTime.Now
            };

            _context.Transacoes.Add(transacao);
            professor.SaldoMoedas -= quantidade;
            aluno.SaldoMoedas += quantidade;
            await _context.SaveChangesAsync();

            // Enviar email para o aluno
            var mensagem = $"<p>Você recebeu {quantidade} moedas do professor {professor.Nome}.</p><p>Motivo: {motivo}</p>";
            await _emailService.EnviarEmailAsync(aluno.Email, "Você recebeu moedas!", mensagem);

            return true;
        }
    }
}
