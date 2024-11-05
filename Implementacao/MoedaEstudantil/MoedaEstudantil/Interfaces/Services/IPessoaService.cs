using MoedaEstudantil.DTOs;
using MoedaEstudantil.Models;

namespace MoedaEstudantil.Interfaces.Services
{
    public interface IPessoaService
    {
        Task<bool> EnviarMoedas(TransacaoDTO transação);

        Task<bool> TrocarMoedas(TrocaMoedas transação);
    }
}
