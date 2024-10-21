import { getEmpresas } from "@/services/empresasService";
import { Table } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  params: {
    id: string;
  };
}

export default async function EmpresasPage({ params }: Props) {
  const empresas = await getEmpresas();
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Gerenciamento de Empresas</h1>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Contato</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {empresas.map((empresa) => (
            <tr key={empresa.id}>
              <td>{empresa.id}</td>
              <td>{empresa.nome}</td>
              <td>{empresa.contato}</td>
              <td>
                <Link href={`/empresas/${empresa.id}`}>
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
