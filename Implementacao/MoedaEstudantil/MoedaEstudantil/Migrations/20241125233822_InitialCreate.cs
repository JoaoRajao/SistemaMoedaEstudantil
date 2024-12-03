using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace MoedaEstudantil.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
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
                    Nome = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
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
                    ProfessorId = table.Column<Guid>(type: "char(36)", nullable: true),
                    VantagemId = table.Column<Guid>(type: "char(36)", nullable: true),
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
                        principalColumn: "Id");
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.InsertData(
                table: "Alunos",
                columns: new[] { "Id", "Curso", "Documento", "Email", "Endereco", "InstituicaoEnsino", "Nome", "SaldoMoedas", "Senha" },
                values: new object[] { new Guid("e78518b6-27ec-46aa-b450-950beb7e0dcd"), "Engenharia", "12345678901", "joao.silva@example.com", "Rua das Flores, 123", "Universidade XYZ", "João Silva", 100m, "Senha123" });

            migrationBuilder.InsertData(
                table: "Empresas",
                columns: new[] { "Id", "Documento", "Email", "Nome", "SaldoMoedas", "Senha" },
                values: new object[] { new Guid("d06df35d-f4f0-4d35-b517-8dff72774957"), "33445566778", "contato@empresatech.com", "Empresa Tech", 1000m, "SenhaEmp123" });

            migrationBuilder.InsertData(
                table: "Professores",
                columns: new[] { "Id", "Departamento", "Documento", "Email", "Instituicao", "Nome", "SaldoMoedas", "Senha" },
                values: new object[] { new Guid("356763df-6948-4619-b6ed-66d457a2670a"), "Ciências Exatas", "11223344556", "carlos.pereira@example.com", "Universidade XYZ", "Dr. Carlos Pereira", 500m, "Senha789" });

            migrationBuilder.InsertData(
                table: "Transacoes",
                columns: new[] { "Id", "AlunoId", "Data", "Mensagem", "ProfessorId", "TipoTransacao", "Valor", "VantagemId" },
                values: new object[,]
                {
                    { new Guid("953d5a83-4d94-4ad2-888a-8c51b4a42057"), new Guid("e78518b6-27ec-46aa-b450-950beb7e0dcd"), new DateTime(2024, 11, 25, 23, 38, 22, 144, DateTimeKind.Utc).AddTicks(5875), "Participação em projeto de pesquisa", new Guid("356763df-6948-4619-b6ed-66d457a2670a"), 0, 100m, null },
                    { new Guid("fc8cbcba-5f79-4760-9e78-b1188419a77d"), new Guid("e78518b6-27ec-46aa-b450-950beb7e0dcd"), new DateTime(2024, 11, 25, 23, 38, 22, 144, DateTimeKind.Utc).AddTicks(5885), "Para melhorar minhas habilidades", null, 1, 50m, new Guid("ef800be2-26e2-4e2f-989d-d079ee5726b5") }
                });

            migrationBuilder.InsertData(
                table: "Vantagens",
                columns: new[] { "Id", "Custo", "Descricao", "EmpresaId", "Nome" },
                values: new object[] { new Guid("ef800be2-26e2-4e2f-989d-d079ee5726b5"), 50m, "10% de desconto em qualquer curso online da Empresa Tech.", new Guid("d06df35d-f4f0-4d35-b517-8dff72774957"), "Desconto em Curso Online" });

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
