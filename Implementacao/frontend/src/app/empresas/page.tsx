import { getEmpresas } from "@/services/empresasService";
import { Table } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function EmpresasPage() {
  const empresas = await getEmpresas();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div>
        <h1 className="text-3xl font-bold text-center">
          Gerenciamento de Empresas
        </h1>
        <Table className="mt-6 w-full">
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
                    <Button className="bg-black text-white">
                      Ver Detalhes
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
