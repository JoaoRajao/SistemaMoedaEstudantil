﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using MoedaEstudantil.Data;

#nullable disable

namespace MoedaEstudantil.Migrations
{
    [DbContext(typeof(MeritSystemContext))]
    [Migration("20241126000024_Initial")]
    partial class Initial
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("MoedaEstudantil.Entities.Aluno", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("Curso")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<string>("Documento")
                        .IsRequired()
                        .HasMaxLength(11)
                        .HasColumnType("varchar(11)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Endereco")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<string>("InstituicaoEnsino")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<decimal>("SaldoMoedas")
                        .HasColumnType("decimal(18, 2)");

                    b.Property<string>("Senha")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Alunos");

                    b.HasData(
                        new
                        {
                            Id = new Guid("d1969a3c-79f9-4e87-a4e2-698acc0311bb"),
                            Curso = "Engenharia",
                            Documento = "12345678901",
                            Email = "joao.silva@example.com",
                            Endereco = "Rua das Flores, 123",
                            InstituicaoEnsino = "Universidade XYZ",
                            Nome = "João Silva",
                            SaldoMoedas = 100m,
                            Senha = "Senha123"
                        });
                });

            modelBuilder.Entity("MoedaEstudantil.Entities.Empresa", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("Documento")
                        .IsRequired()
                        .HasMaxLength(11)
                        .HasColumnType("varchar(11)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<decimal>("SaldoMoedas")
                        .HasColumnType("decimal(18, 2)");

                    b.Property<string>("Senha")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Empresas");

                    b.HasData(
                        new
                        {
                            Id = new Guid("af4131bc-35a7-40dd-8577-17d6170b6183"),
                            Documento = "33445566778",
                            Email = "contato@empresatech.com",
                            Nome = "Empresa Tech",
                            SaldoMoedas = 1000m,
                            Senha = "SenhaEmp123"
                        });
                });

            modelBuilder.Entity("MoedaEstudantil.Entities.Professor", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("Departamento")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<string>("Documento")
                        .IsRequired()
                        .HasMaxLength(11)
                        .HasColumnType("varchar(11)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Instituicao")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<decimal>("SaldoMoedas")
                        .HasColumnType("decimal(18, 2)");

                    b.Property<string>("Senha")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Professores");

                    b.HasData(
                        new
                        {
                            Id = new Guid("fac32b6a-de60-4822-bebc-f689505d1bd7"),
                            Departamento = "Ciências Exatas",
                            Documento = "11223344556",
                            Email = "carlos.pereira@example.com",
                            Instituicao = "Universidade XYZ",
                            Nome = "Dr. Carlos Pereira",
                            SaldoMoedas = 500m,
                            Senha = "Senha789"
                        });
                });

            modelBuilder.Entity("MoedaEstudantil.Entities.Transacao", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<Guid>("AlunoId")
                        .HasColumnType("char(36)");

                    b.Property<DateTime>("Data")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Mensagem")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<Guid?>("ProfessorId")
                        .HasColumnType("char(36)");

                    b.Property<int>("TipoTransacao")
                        .HasColumnType("int");

                    b.Property<decimal>("Valor")
                        .HasColumnType("decimal(18, 2)");

                    b.Property<Guid?>("VantagemId")
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.HasIndex("AlunoId");

                    b.HasIndex("ProfessorId");

                    b.ToTable("Transacoes");

                    b.HasData(
                        new
                        {
                            Id = new Guid("6d46b17f-e904-4a0c-b537-d7c7782f6f87"),
                            AlunoId = new Guid("d1969a3c-79f9-4e87-a4e2-698acc0311bb"),
                            Data = new DateTime(2024, 11, 26, 0, 0, 23, 366, DateTimeKind.Utc).AddTicks(841),
                            Mensagem = "Participação em projeto de pesquisa",
                            ProfessorId = new Guid("fac32b6a-de60-4822-bebc-f689505d1bd7"),
                            TipoTransacao = 0,
                            Valor = 100m
                        },
                        new
                        {
                            Id = new Guid("f67a0830-f1c4-49e9-8ae6-13bfb1db0373"),
                            AlunoId = new Guid("d1969a3c-79f9-4e87-a4e2-698acc0311bb"),
                            Data = new DateTime(2024, 11, 26, 0, 0, 23, 366, DateTimeKind.Utc).AddTicks(847),
                            Mensagem = "Para melhorar minhas habilidades",
                            TipoTransacao = 1,
                            Valor = 50m,
                            VantagemId = new Guid("82825a84-d8bb-4207-8de6-f6f433867fde")
                        });
                });

            modelBuilder.Entity("MoedaEstudantil.Entities.Vantagem", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<decimal>("Custo")
                        .HasColumnType("decimal(18, 2)");

                    b.Property<string>("Descricao")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<Guid>("EmpresaId")
                        .HasColumnType("char(36)");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.HasKey("Id");

                    b.HasIndex("EmpresaId");

                    b.ToTable("Vantagens");

                    b.HasData(
                        new
                        {
                            Id = new Guid("82825a84-d8bb-4207-8de6-f6f433867fde"),
                            Custo = 50m,
                            Descricao = "10% de desconto em qualquer curso online da Empresa Tech.",
                            EmpresaId = new Guid("af4131bc-35a7-40dd-8577-17d6170b6183"),
                            Nome = "Desconto em Curso Online"
                        });
                });

            modelBuilder.Entity("MoedaEstudantil.Entities.Transacao", b =>
                {
                    b.HasOne("MoedaEstudantil.Entities.Aluno", null)
                        .WithMany("Transacoes")
                        .HasForeignKey("AlunoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MoedaEstudantil.Entities.Professor", null)
                        .WithMany("Transacoes")
                        .HasForeignKey("ProfessorId");
                });

            modelBuilder.Entity("MoedaEstudantil.Entities.Vantagem", b =>
                {
                    b.HasOne("MoedaEstudantil.Entities.Empresa", "Empresa")
                        .WithMany("VantagensOferecidas")
                        .HasForeignKey("EmpresaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Empresa");
                });

            modelBuilder.Entity("MoedaEstudantil.Entities.Aluno", b =>
                {
                    b.Navigation("Transacoes");
                });

            modelBuilder.Entity("MoedaEstudantil.Entities.Empresa", b =>
                {
                    b.Navigation("VantagensOferecidas");
                });

            modelBuilder.Entity("MoedaEstudantil.Entities.Professor", b =>
                {
                    b.Navigation("Transacoes");
                });
#pragma warning restore 612, 618
        }
    }
}
