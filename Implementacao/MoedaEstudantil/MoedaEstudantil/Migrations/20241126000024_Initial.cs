using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace MoedaEstudantil.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Transacoes",
                keyColumn: "Id",
                keyValue: new Guid("953d5a83-4d94-4ad2-888a-8c51b4a42057"));

            migrationBuilder.DeleteData(
                table: "Transacoes",
                keyColumn: "Id",
                keyValue: new Guid("fc8cbcba-5f79-4760-9e78-b1188419a77d"));

            migrationBuilder.DeleteData(
                table: "Vantagens",
                keyColumn: "Id",
                keyValue: new Guid("ef800be2-26e2-4e2f-989d-d079ee5726b5"));

            migrationBuilder.DeleteData(
                table: "Alunos",
                keyColumn: "Id",
                keyValue: new Guid("e78518b6-27ec-46aa-b450-950beb7e0dcd"));

            migrationBuilder.DeleteData(
                table: "Empresas",
                keyColumn: "Id",
                keyValue: new Guid("d06df35d-f4f0-4d35-b517-8dff72774957"));

            migrationBuilder.DeleteData(
                table: "Professores",
                keyColumn: "Id",
                keyValue: new Guid("356763df-6948-4619-b6ed-66d457a2670a"));

            migrationBuilder.InsertData(
                table: "Alunos",
                columns: new[] { "Id", "Curso", "Documento", "Email", "Endereco", "InstituicaoEnsino", "Nome", "SaldoMoedas", "Senha" },
                values: new object[] { new Guid("d1969a3c-79f9-4e87-a4e2-698acc0311bb"), "Engenharia", "12345678901", "joao.silva@example.com", "Rua das Flores, 123", "Universidade XYZ", "João Silva", 100m, "Senha123" });

            migrationBuilder.InsertData(
                table: "Empresas",
                columns: new[] { "Id", "Documento", "Email", "Nome", "SaldoMoedas", "Senha" },
                values: new object[] { new Guid("af4131bc-35a7-40dd-8577-17d6170b6183"), "33445566778", "contato@empresatech.com", "Empresa Tech", 1000m, "SenhaEmp123" });

            migrationBuilder.InsertData(
                table: "Professores",
                columns: new[] { "Id", "Departamento", "Documento", "Email", "Instituicao", "Nome", "SaldoMoedas", "Senha" },
                values: new object[] { new Guid("fac32b6a-de60-4822-bebc-f689505d1bd7"), "Ciências Exatas", "11223344556", "carlos.pereira@example.com", "Universidade XYZ", "Dr. Carlos Pereira", 500m, "Senha789" });

            migrationBuilder.InsertData(
                table: "Transacoes",
                columns: new[] { "Id", "AlunoId", "Data", "Mensagem", "ProfessorId", "TipoTransacao", "Valor", "VantagemId" },
                values: new object[,]
                {
                    { new Guid("6d46b17f-e904-4a0c-b537-d7c7782f6f87"), new Guid("d1969a3c-79f9-4e87-a4e2-698acc0311bb"), new DateTime(2024, 11, 26, 0, 0, 23, 366, DateTimeKind.Utc).AddTicks(841), "Participação em projeto de pesquisa", new Guid("fac32b6a-de60-4822-bebc-f689505d1bd7"), 0, 100m, null },
                    { new Guid("f67a0830-f1c4-49e9-8ae6-13bfb1db0373"), new Guid("d1969a3c-79f9-4e87-a4e2-698acc0311bb"), new DateTime(2024, 11, 26, 0, 0, 23, 366, DateTimeKind.Utc).AddTicks(847), "Para melhorar minhas habilidades", null, 1, 50m, new Guid("82825a84-d8bb-4207-8de6-f6f433867fde") }
                });

            migrationBuilder.InsertData(
                table: "Vantagens",
                columns: new[] { "Id", "Custo", "Descricao", "EmpresaId", "Nome" },
                values: new object[] { new Guid("82825a84-d8bb-4207-8de6-f6f433867fde"), 50m, "10% de desconto em qualquer curso online da Empresa Tech.", new Guid("af4131bc-35a7-40dd-8577-17d6170b6183"), "Desconto em Curso Online" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Transacoes",
                keyColumn: "Id",
                keyValue: new Guid("6d46b17f-e904-4a0c-b537-d7c7782f6f87"));

            migrationBuilder.DeleteData(
                table: "Transacoes",
                keyColumn: "Id",
                keyValue: new Guid("f67a0830-f1c4-49e9-8ae6-13bfb1db0373"));

            migrationBuilder.DeleteData(
                table: "Vantagens",
                keyColumn: "Id",
                keyValue: new Guid("82825a84-d8bb-4207-8de6-f6f433867fde"));

            migrationBuilder.DeleteData(
                table: "Alunos",
                keyColumn: "Id",
                keyValue: new Guid("d1969a3c-79f9-4e87-a4e2-698acc0311bb"));

            migrationBuilder.DeleteData(
                table: "Empresas",
                keyColumn: "Id",
                keyValue: new Guid("af4131bc-35a7-40dd-8577-17d6170b6183"));

            migrationBuilder.DeleteData(
                table: "Professores",
                keyColumn: "Id",
                keyValue: new Guid("fac32b6a-de60-4822-bebc-f689505d1bd7"));

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
        }
    }
}
