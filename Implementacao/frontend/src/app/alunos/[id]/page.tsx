import { getAlunoById } from "@/services/alunosService";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  params: {
    id: string;
  };
}

export default async function AlunoDetalhes({ params }: Props) {
  const aluno = await getAlunoById(Number(params.id));
  if (!aluno) {
    return <div>Aluno não encontrado</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Detalhes do Aluno</h1>
      <div className="mt-4">
        <p>ID: {aluno.id}</p>
        <p>Nome: {aluno.nome}</p>
        <p>Email: {aluno.email}</p>
      </div>
      <Link href="/alunos">
        <Button>Voltar</Button>
      </Link>
    </div>
  );
}
