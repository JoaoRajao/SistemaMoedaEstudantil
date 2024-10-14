using Microsoft.EntityFrameworkCore;
using MoedaEstudantil.Entities;

namespace MoedaEstudantil.Data
{
    public class MeritSystemContext : DbContext
    {
        public DbSet<Aluno> Alunos { get; set; }
        public DbSet<Professor> Professores { get; set; }
        public DbSet<Empresa> Empresas { get; set; }
        public DbSet<Vantagem> Vantagens { get; set; }
        public DbSet<Transacao> Transacoes { get; set; }

        public MeritSystemContext(DbContextOptions<MeritSystemContext> options) : base(options) { }
    }

}
