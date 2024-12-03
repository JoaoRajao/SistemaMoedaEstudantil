using MoedaEstudantil.Data;
using MoedaEstudantil.DTOs;
using MoedaEstudantil.Entities;
using MoedaEstudantil.Enums;
using MoedaEstudantil.Interfaces.Services;
using MoedaEstudantil.Models;
using MoedaEstudantil.Services;

public class PessoaService : IPessoaService
{
    private readonly MeritSystemContext _context;
    private readonly EmailService _emailService;

    public PessoaService(MeritSystemContext context, EmailService emailService)
    {
        _context = context;
        _emailService = emailService;
    }

    public async Task<bool> EnviarMoedas(TransacaoDTO transacao)
    {
        var professor = _context.Professores.Find(transacao.ProfessorId) ?? throw new Exception("Professor não encontrado.");
        var aluno = _context.Alunos.Find(transacao.AlunoId) ?? throw new Exception("Aluno não encontrado.");

        if (professor == null || aluno == null || professor.SaldoMoedas < transacao.Valor)
            return false;

        var novaTransacao = new Transacao
        {
            Id = Guid.NewGuid(),
            ProfessorId = transacao.ProfessorId,
            AlunoId = transacao.AlunoId,
            Valor = transacao.Valor,
            TipoTransacao = TipoTransacao.ENVIO,
            Mensagem = transacao.Mensagem,
            Data = DateTime.UtcNow
        };

        _context.Transacoes.Add(novaTransacao);
        professor.SaldoMoedas -= transacao.Valor;
        aluno.SaldoMoedas += transacao.Valor;
        await _context.SaveChangesAsync();

        var mensagem = $"<p>Você recebeu {transacao.Valor} moedas do professor {professor.Nome}.</p><p>Motivo: {transacao.Mensagem}</p>";
        await _emailService.EnviarEmailAsync(transacao.Email, "Você recebeu moedas!", mensagem);

        return true;
    }

    public async Task<bool> TrocarMoedas(TrocaMoedas troca)
    {
        var aluno = await _context.Alunos.FindAsync(troca.AlunoId) ?? throw new Exception("Aluno não encontrado.");
        var vantagem = await _context.Vantagens.FindAsync(troca.VantagemId) ?? throw new Exception("Vantagem não encontrada.");

        if (aluno.SaldoMoedas < vantagem.Custo)
        {
            aluno.SaldoMoedas -= vantagem.Custo;
            return false;
        }           

        var transacao = new Transacao
        {
            Id = Guid.NewGuid(),
            AlunoId = troca.AlunoId,
            Valor = -vantagem.Custo, 
            TipoTransacao = TipoTransacao.RESGATE,
            Mensagem = $"Troca de moedas pela vantagem: {vantagem.Nome}",
            Data = DateTime.Now
        };

        _context.Transacoes.Add(transacao);

        await _context.SaveChangesAsync();

        var mensagem = $"<p>Voce recebeu a seguinte vantagem: {vantagem.Nome}</p><p>Motivo: {transacao.Mensagem}</p>";
        await _emailService.EnviarEmailAsync(aluno.Email, "Você recebeu moedas!", mensagem);

        return true;
    }

}