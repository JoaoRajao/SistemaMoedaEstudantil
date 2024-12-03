using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace MoedaEstudantil.Migrations
{
    /// <inheritdoc />
    public partial class Initial2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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
                values: new object[] { new Guid("4cd712a9-bfc0-49f4-9b0e-b5484328f71a"), "Engenharia", "12345678901", "joao.silva@example.com", "Rua das Flores, 123", "Universidade XYZ", "João Silva", 100m, "Senha123" });

            migrationBuilder.InsertData(
                table: "Empresas",
                columns: new[] { "Id", "Documento", "Email", "Nome", "SaldoMoedas", "Senha" },
                values: new object[] { new Guid("378ea818-d886-4693-8327-5e3ddb2f6aad"), "33445566778", "contato@empresatech.com", "Empresa Tech", 1000m, "SenhaEmp123" });

            migrationBuilder.InsertData(
                table: "Professores",
                columns: new[] { "Id", "Departamento", "Documento", "Email", "Instituicao", "Nome", "SaldoMoedas", "Senha" },
                values: new object[] { new Guid("32e52797-2f80-4227-8392-bcea9986eced"), "Ciências Exatas", "11223344556", "carlos.pereira@example.com", "Universidade XYZ", "Dr. Carlos Pereira", 500m, "Senha789" });

            migrationBuilder.InsertData(
                table: "Transacoes",
                columns: new[] { "Id", "AlunoId", "Data", "Mensagem", "ProfessorId", "TipoTransacao", "Valor", "VantagemId" },
                values: new object[,]
                {
                    { new Guid("148aa5f8-46b5-44b1-b905-34aa5c3f6c1b"), new Guid("4cd712a9-bfc0-49f4-9b0e-b5484328f71a"), new DateTime(2024, 11, 26, 0, 5, 36, 446, DateTimeKind.Utc).AddTicks(7541), "Para melhorar minhas habilidades", null, 1, 50m, new Guid("328ea459-04b0-460f-b415-f19614a555da") },
                    { new Guid("e7a0c0d4-1914-45a1-9345-55b255fd0a76"), new Guid("4cd712a9-bfc0-49f4-9b0e-b5484328f71a"), new DateTime(2024, 11, 26, 0, 5, 36, 446, DateTimeKind.Utc).AddTicks(7534), "Participação em projeto de pesquisa", new Guid("32e52797-2f80-4227-8392-bcea9986eced"), 0, 100m, null }
                });

            migrationBuilder.InsertData(
                table: "Vantagens",
                columns: new[] { "Id", "Custo", "Descricao", "EmpresaId", "Nome" },
                values: new object[] { new Guid("328ea459-04b0-460f-b415-f19614a555da"), 50m, "10% de desconto em qualquer curso online da Empresa Tech.", new Guid("378ea818-d886-4693-8327-5e3ddb2f6aad"), "Desconto em Curso Online" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Transacoes",
                keyColumn: "Id",
                keyValue: new Guid("148aa5f8-46b5-44b1-b905-34aa5c3f6c1b"));

            migrationBuilder.DeleteData(
                table: "Transacoes",
                keyColumn: "Id",
                keyValue: new Guid("e7a0c0d4-1914-45a1-9345-55b255fd0a76"));

            migrationBuilder.DeleteData(
                table: "Vantagens",
                keyColumn: "Id",
                keyValue: new Guid("328ea459-04b0-460f-b415-f19614a555da"));

            migrationBuilder.DeleteData(
                table: "Alunos",
                keyColumn: "Id",
                keyValue: new Guid("4cd712a9-bfc0-49f4-9b0e-b5484328f71a"));

            migrationBuilder.DeleteData(
                table: "Empresas",
                keyColumn: "Id",
                keyValue: new Guid("378ea818-d886-4693-8327-5e3ddb2f6aad"));

            migrationBuilder.DeleteData(
                table: "Professores",
                keyColumn: "Id",
                keyValue: new Guid("32e52797-2f80-4227-8392-bcea9986eced"));

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
    }
}
