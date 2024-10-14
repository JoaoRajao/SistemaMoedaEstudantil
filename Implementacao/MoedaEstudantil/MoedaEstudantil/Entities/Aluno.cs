namespace MoedaEstudantil.Entities
{
    public class Aluno : Pessoa
    {
        public string RG { get; set; }
        public string Endereco { get; set; }
        public string InstituicaoEnsino { get; set; }
        public string Curso { get; set; }
        public decimal SaldoMoedas { get; set; }

        public List<Transacao> Transacoes { get; set; }

        public Aluno()
        {
            Transacoes = new List<Transacao>();
        }
    }

}
