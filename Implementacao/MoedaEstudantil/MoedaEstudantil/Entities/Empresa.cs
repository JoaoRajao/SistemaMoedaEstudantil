namespace MoedaEstudantil.Entities
{
    public class Empresa : Pessoa
    {
        public List<Vantagem> VantagensOferecidas { get; set; }

        public Empresa()
        {
            VantagensOferecidas = new List<Vantagem>();
        }

        public void CadastrarVantagem(string descricao, decimal custo, string foto)
        {
            var vantagem = new Vantagem
            {
                Descricao = descricao,
                Custo = custo,
                Foto = foto
            };

            VantagensOferecidas.Add(vantagem);
        }
    }

}
