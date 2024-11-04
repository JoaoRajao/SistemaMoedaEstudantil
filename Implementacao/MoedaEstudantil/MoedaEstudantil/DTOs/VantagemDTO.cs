namespace MoedaEstudantil.DTOs
{
    public class VantagemDTO
    {
        public required string Descricao { get; set; }
        public required Guid EmpresaID { get; set; }
        public required decimal Custo { get; set; }
        public required string Foto { get; set; }
    }
}
