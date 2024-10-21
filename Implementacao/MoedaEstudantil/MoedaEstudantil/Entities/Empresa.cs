using MoedaEstudantil.DTOs;

namespace MoedaEstudantil.Entities
{
    public class Empresa : Pessoa
    {
        public List<Vantagem> VantagensOferecidas { get; set; }

        public Empresa()
        {
            VantagensOferecidas = new List<Vantagem>();
            Id = Guid.NewGuid();
        }

        public static Empresa FromDto(EmpresaDTO empresa)
        {
            return new Empresa
            {
                Id = Guid.NewGuid(),
                Nome = empresa.Nome,
                Documento = empresa.Documento,
                Email = empresa.Email,
                Senha = empresa.Senha,
                VantagensOferecidas = [],
                SaldoMoedas = 0
            };
        }
    }

}
