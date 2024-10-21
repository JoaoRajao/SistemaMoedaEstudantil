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
    return <div className="text-center">Empresa não encontrada</div>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div>
        <h1 className="text-3xl font-bold text-center">Detalhes da Empresa</h1>
        <div className="mt-4">
          <p>ID: {empresa.id}</p>
          <p>Nome: {empresa.nomeEmpresa}</p>
          <p>Contato: {empresa.contato}</p>
        </div>
        <Link href="/empresas">
          <Button className="bg-black text-white mt-4">Voltar</Button>
        </Link>
      </div>
    </div>
  );
}
