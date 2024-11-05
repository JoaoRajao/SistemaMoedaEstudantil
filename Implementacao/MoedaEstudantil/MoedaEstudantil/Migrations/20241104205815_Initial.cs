using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MoedaEstudantil.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Alunos",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    Endereco = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    InstituicaoEnsino = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    Curso = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    Nome = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    Documento = table.Column<string>(type: "varchar(11)", maxLength: 11, nullable: false),
                    Email = table.Column<string>(type: "longtext", nullable: false),
                    Senha = table.Column<string>(type: "longtext", nullable: false),
                    SaldoMoedas = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Alunos", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Empresas",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    Nome = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    Documento = table.Column<string>(type: "varchar(11)", maxLength: 11, nullable: false),
                    Email = table.Column<string>(type: "longtext", nullable: false),
                    Senha = table.Column<string>(type: "longtext", nullable: false),
                    SaldoMoedas = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Empresas", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Professores",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    Departamento = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    Instituicao = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    Nome = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    Documento = table.Column<string>(type: "varchar(11)", maxLength: 11, nullable: false),
                    Email = table.Column<string>(type: "longtext", nullable: false),
                    Senha = table.Column<string>(type: "longtext", nullable: false),
                    SaldoMoedas = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Professores", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Vantagens",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    Nome = table.Column<Guid>(type: "char(100)", maxLength: 100, nullable: false),
                    EmpresaId = table.Column<Guid>(type: "char(36)", nullable: false),
                    Descricao = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    Custo = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vantagens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Vantagens_Empresas_EmpresaId",
                        column: x => x.EmpresaId,
                        principalTable: "Empresas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Transacoes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    AlunoId = table.Column<Guid>(type: "char(36)", nullable: false),
                    ProfessorId = table.Column<Guid>(type: "char(36)", nullable: false),
                    TipoTransacao = table.Column<int>(type: "int", nullable: false),
                    Valor = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Data = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Mensagem = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transacoes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Transacoes_Alunos_AlunoId",
                        column: x => x.AlunoId,
                        principalTable: "Alunos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Transacoes_Professores_ProfessorId",
                        column: x => x.ProfessorId,
                        principalTable: "Professores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Transacoes_AlunoId",
                table: "Transacoes",
                column: "AlunoId");

            migrationBuilder.CreateIndex(
                name: "IX_Transacoes_ProfessorId",
                table: "Transacoes",
                column: "ProfessorId");

            migrationBuilder.CreateIndex(
                name: "IX_Vantagens_EmpresaId",
                table: "Vantagens",
                column: "EmpresaId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Transacoes");

            migrationBuilder.DropTable(
                name: "Vantagens");

            migrationBuilder.DropTable(
                name: "Alunos");

            migrationBuilder.DropTable(
                name: "Professores");

            migrationBuilder.DropTable(
                name: "Empresas");
        }
    }
}
