import { getProfessorById } from "@/services/professoresService";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  params: {
    id: string;
  };
}

export default async function ProfessorDetalhes({ params }: Props) {
  const professor = await getProfessorById(Number(params.id));

  if (!professor) {
    return <div className="text-center">Professor não encontrado</div>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div>
        <h1 className="text-3xl font-bold text-center">
          Detalhes do Professor
        </h1>
        <div className="mt-4">
          <p>ID: {professor.id}</p>
          <p>Nome: {professor.nome}</p>
          <p>Email: {professor.email}</p>
        </div>
        <Link href="/professores">
          <Button className="bg-black text-white mt-4">Voltar</Button>
        </Link>
      </div>
    </div>
  );
}
