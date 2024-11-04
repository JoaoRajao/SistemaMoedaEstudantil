using MoedaEstudantil.DTOs;

namespace MoedaEstudantil.Interfaces.Services
{
    public interface IPessoaService
    {
        Task<bool> EnviarMoedas(TransacaoDTO transação);
    }
}
