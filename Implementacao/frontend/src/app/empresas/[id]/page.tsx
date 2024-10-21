import { getEmpresaById } from "@/services/empresasService";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  params: {
    id: string;
  };
}

export default async function EmpresaDetalhes({ params }: Props) {
  const empresa = await getEmpresaById(Number(params.id));

  if (!empresa) {
    return <div>Empresa não encontrada</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Detalhes da Empresa</h1>
      <div className="mt-4">
        <p>ID: {empresa.id}</p>
        <p>Nome: {empresa.nome}</p>
        <p>Contato: {empresa.contato}</p>
      </div>
      <Link href="/empresas">
        <Button>Voltar</Button>
      </Link>
    </div>
  );
}
