using MoedaEstudantil.Enums;

namespace MoedaEstudantil.Entities
{
    public class Professor : Pessoa
    {
        public string Departamento { get; set; }
        public string Instituicao { get; set; }
        public decimal SaldoMoedas { get; set; }

        public List<Transacao> Transacoes { get; set; }

        public Professor()
        {
            Transacoes = new List<Transacao>();
            SaldoMoedas = 1000; // Inicia com 1000 moedas por semestre
        }

        public void EnviarMoedas(Aluno aluno, decimal quantidade, string mensagem)
        {
            if (SaldoMoedas >= quantidade)
            {
                SaldoMoedas -= quantidade;
                aluno.SaldoMoedas += quantidade;

                var transacao = new Transacao
                {
                    TipoTransacao = TipoTransacao.ENVIO,
                    Valor = quantidade,
                    Data = DateTime.Now,
                    Mensagem = mensagem,
                    Participante = aluno.Nome
                };

                Transacoes.Add(transacao);
                aluno.Transacoes.Add(transacao);

                // Enviar notificação para o aluno por email
            }
            else
            {
                throw new Exception("Saldo insuficiente.");
            }
        }
    }

}
