import { getAlunos } from "@/services/alunosService";
import { Table } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Esta função será chamada no lado do servidor (Server Component)
export default async function AlunosPage() {
  console.log(process.env.NEXT_PUBLIC_API_URL);
  const alunos = await getAlunos();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Gerenciamento de Alunos</h1>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno: { id: number; nome: string; email: string }) => (
            <tr key={aluno.id}>
              <td>{aluno.id}</td>
              <td>{aluno.nome}</td>
              <td>{aluno.email}</td>
              <td>
                <Link href={`/alunos/${aluno.id}`}>
                  <Button>Ver Detalhes</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
