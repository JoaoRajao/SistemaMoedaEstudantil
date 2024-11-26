using Microsoft.EntityFrameworkCore;
using MoedaEstudantil.Entities;
using MoedaEstudantil.Enums;
using System;

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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            Guid alunoId = Guid.NewGuid();
            Guid empresaId = Guid.NewGuid();
            Guid professorId = Guid.NewGuid();
            Guid vantagemId = Guid.NewGuid();

            modelBuilder.Entity<Aluno>().HasData(
                new Aluno
                {
                    Id = alunoId,
                    Nome = "João Silva",
                    Documento = "12345678901",
                    Email = "joao.silva@example.com",
                    Senha = "Senha123", // Considere fazer o hash desta senha
                    Endereco = "Rua das Flores, 123",
                    InstituicaoEnsino = "Universidade XYZ",
                    Curso = "Engenharia",
                    SaldoMoedas = 100
                }
            );

            modelBuilder.Entity<Professor>().HasData(
                new Professor
                {
                    Id = professorId,
                    Nome = "Dr. Carlos Pereira",
                    Documento = "11223344556",
                    Email = "carlos.pereira@example.com",
                    Senha = "Senha789", // Considere fazer o hash desta senha
                    Departamento = "Ciências Exatas",
                    Instituicao = "Universidade XYZ",
                    SaldoMoedas = 500
                }
            );

            modelBuilder.Entity<Empresa>().HasData(
                new Empresa
                {
                    Id = empresaId,
                    Nome = "Empresa Tech",
                    Documento = "33445566778",
                    Email = "contato@empresatech.com",
                    Senha = "SenhaEmp123", // Considere fazer o hash desta senha
                    SaldoMoedas = 1000
                }
            );

            modelBuilder.Entity<Vantagem>().HasData(
                new Vantagem
                {
                    Id = vantagemId,
                    Nome = "Desconto em Curso Online",
                    Descricao = "10% de desconto em qualquer curso online da Empresa Tech.",
                    Custo = 50,
                    EmpresaId = empresaId
                }
            );

            // Configuração da conversão do enum TipoTransacao
            modelBuilder.Entity<Transacao>()
                .Property(t => t.TipoTransacao)
                .HasConversion<int>();

            modelBuilder.Entity<Transacao>().HasData(
                new Transacao
                {
                    Id = Guid.NewGuid(),
                    AlunoId = alunoId,
                    ProfessorId = professorId,
                    TipoTransacao = TipoTransacao.ENVIO,
                    Valor = 100,
                    Data = DateTime.UtcNow,
                    Mensagem = "Participação em projeto de pesquisa"
                },
                new Transacao
                {
                    Id = Guid.NewGuid(),
                    AlunoId = alunoId,
                    VantagemId = vantagemId,
                    TipoTransacao = TipoTransacao.RESGATE,
                    Valor = 50,
                    Data = DateTime.UtcNow,
                    Mensagem = "Para melhorar minhas habilidades"
                }
            );
            modelBuilder.Entity<Transacao>()
                .Property(t => t.TipoTransacao)
                .HasConversion<int>();

            modelBuilder.Entity<Empresa>()
                .HasMany(e => e.VantagensOferecidas);

            base.OnModelCreating(modelBuilder);
        }
    }
}
