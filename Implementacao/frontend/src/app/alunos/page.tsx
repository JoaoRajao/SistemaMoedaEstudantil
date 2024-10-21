import { getAlunos } from "@/services/alunosService";
import { Table } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Esta função será chamada no lado do servidor (Server Component)
export default async function AlunosPage() {
  const alunos = await getAlunos();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div>
        <h1 className="text-3xl font-bold text-center">
          Gerenciamento de Alunos
        </h1>
        <Table className="mt-6 w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {alunos.map(
              (aluno: { id: number; nome: string; email: string }) => (
                <tr key={aluno.id}>
                  <td>{aluno.id}</td>
                  <td>{aluno.nome}</td>
                  <td>{aluno.email}</td>
                  <td>
                    <Link href={`/alunos/${aluno.id}`}>
                      <Button className="bg-black text-white">
                        Ver Detalhes
                      </Button>
                    </Link>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
