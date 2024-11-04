namespace MoedaEstudantil.DTOs
{
    public class AlunoDTO : PessoaDTO
    {
        public required string Endereco { get; set; }
        public required string InstituicaoEnsino { get; set; }
        public required string Curso { get; set; }
    }
}
