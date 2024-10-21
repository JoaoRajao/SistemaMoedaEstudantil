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
    return <div className="text-center">Aluno não encontrado</div>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div>
        <h1 className="text-3xl font-bold text-center">Detalhes do Aluno</h1>
        <div className="mt-4">
          <p>ID: {aluno.id}</p>
          <p>Nome: {aluno.nome}</p>
          <p>Email: {aluno.email}</p>
        </div>
        <Link href="/alunos">
          <Button className="bg-black text-white mt-4">Voltar</Button>
        </Link>
      </div>
    </div>
  );
}
