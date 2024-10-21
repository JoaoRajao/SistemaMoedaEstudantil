using MoedaEstudantil.Data;
using MoedaEstudantil.DTOs;
using MoedaEstudantil.Entities;
using MoedaEstudantil.Enums;
using MoedaEstudantil.Models;

namespace MoedaEstudantil.Services
{
    public class AlunoService
    {
        private readonly MeritSystemContext _context;
        private readonly EmailService _emailService;

        public AlunoService(MeritSystemContext context, EmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        public Aluno CadastrarAluno(AlunoDTO alunoDto)
        {
            var aluno = Aluno.FromDto(alunoDto);           

            _context.Alunos.Add(aluno);
            _context.SaveChanges();
            return aluno;
        }

        public Aluno ObterAluno(Guid id)
        {
            return _context.Alunos.Find(id);
        }

        public Aluno AtualizarAluno(Guid id, AlunoDTO alunoAtualizado)
        {
            var aluno = _context.Alunos.Find(id);
            if (aluno == null) return null;

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
            if (aluno == null)
                return null;

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

        public async Task<bool> TrocarMoedas(Guid alunoId, Guid vantagemId)
        {
            var aluno = _context.Alunos.Find(alunoId);
            var vantagem = _context.Vantagens.Find(vantagemId);

            if (aluno == null || vantagem == null || aluno.SaldoMoedas < vantagem.Custo)
                return false;

            // Criar transação de troca
            var transacao = new Transacao
            {
                AlunoId = alunoId,
                VantagemId = vantagemId,
                Valor = vantagem.Custo,
                TipoTransacao = TipoTransacao.TROCA,
                Codigo = GenerateCodigoTroca()
            };

            _context.Transacoes.Add(transacao);
            aluno.SaldoMoedas -= vantagem.Custo;
            await _context.SaveChangesAsync();

            // Enviar email com cupom para o aluno
            var mensagemAluno = $"<p>Você trocou {vantagem.Custo} moedas por {vantagem.Descricao}.</p><p>Use o código <strong>{transacao.Codigo}</strong> na troca presencial.</p>";
            await _emailService.EnviarEmailAsync(aluno.Email, "Troca de Moedas Realizada", mensagemAluno);

            // Enviar email para a empresa parceira  
            var empresa = _context.Empresas.Find(vantagem.EmpresaId);
            var mensagemEmpresa = $"<p>O aluno {aluno.Nome} trocou {vantagem.Custo} moedas por {vantagem.Descricao}.</p><p>Código da Troca: <strong>{transacao.Codigo}</strong></p>";
            await _emailService.EnviarEmailAsync(empresa.Email, "Troca de Moedas Concretizada", mensagemEmpresa);

            return true;
        }

        private string GenerateCodigoTroca() => Guid.NewGuid().ToString()[..8].ToUpper();
    }
}

