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
    [Migration("20241126000537_Initial2")]
    partial class Initial2
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
                            Id = new Guid("4cd712a9-bfc0-49f4-9b0e-b5484328f71a"),
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
                            Id = new Guid("378ea818-d886-4693-8327-5e3ddb2f6aad"),
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
                            Id = new Guid("32e52797-2f80-4227-8392-bcea9986eced"),
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
                            Id = new Guid("e7a0c0d4-1914-45a1-9345-55b255fd0a76"),
                            AlunoId = new Guid("4cd712a9-bfc0-49f4-9b0e-b5484328f71a"),
                            Data = new DateTime(2024, 11, 26, 0, 5, 36, 446, DateTimeKind.Utc).AddTicks(7534),
                            Mensagem = "Participação em projeto de pesquisa",
                            ProfessorId = new Guid("32e52797-2f80-4227-8392-bcea9986eced"),
                            TipoTransacao = 0,
                            Valor = 100m
                        },
                        new
                        {
                            Id = new Guid("148aa5f8-46b5-44b1-b905-34aa5c3f6c1b"),
                            AlunoId = new Guid("4cd712a9-bfc0-49f4-9b0e-b5484328f71a"),
                            Data = new DateTime(2024, 11, 26, 0, 5, 36, 446, DateTimeKind.Utc).AddTicks(7541),
                            Mensagem = "Para melhorar minhas habilidades",
                            TipoTransacao = 1,
                            Valor = 50m,
                            VantagemId = new Guid("328ea459-04b0-460f-b415-f19614a555da")
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
                            Id = new Guid("328ea459-04b0-460f-b415-f19614a555da"),
                            Custo = 50m,
                            Descricao = "10% de desconto em qualquer curso online da Empresa Tech.",
                            EmpresaId = new Guid("378ea818-d886-4693-8327-5e3ddb2f6aad"),
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
                    b.HasOne("MoedaEstudantil.Entities.Empresa", null)
                        .WithMany("VantagensOferecidas")
                        .HasForeignKey("EmpresaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
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
