"use client";

import { useState, useEffect } from "react";
import { getEmpresas, deleteEmpresa } from "@/services/empresasService";
import { Table } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Define o tipo Empresa
interface Empresa {
  id: number;
  nomeEmpresa: string;
  contato: string;
}

export default function EmpresasPage() {
  const router = useRouter();
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEmpresas() {
      const data = await getEmpresas();
      setEmpresas(data);
      setLoading(false);
    }

    fetchEmpresas();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir esta empresa?")) {
      await deleteEmpresa(id);
      setEmpresas((prevEmpresas) =>
        prevEmpresas.filter((empresa) => empresa.id !== id)
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="px-4 max-w-4xl mx-auto mt-8">
        <div className="border border-gray-300 rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-semibold text-center mb-6">
            Gerenciamento de Empresas
          </h1>

          {loading ? (
            <p>Carregando empresas...</p>
          ) : (
            <Table className="w-full border-separate border-spacing-y-2">
              <thead>
                <tr className="text-center text-lg font-medium">
                  <th className="pb-2 px-4">ID</th>
                  <th className="pb-2 px-4">Nome</th>
                  <th className="pb-2 px-4">Contato</th>
                  <th className="pb-2 px-4">Ações</th>
                </tr>
              </thead>
              <tbody>
                {empresas.map((empresa) => (
                  <tr key={empresa.id} className="border-b text-center">
                    <td className="px-4 text-sm">{empresa.id}</td>
                    <td className="px-4 text-sm">{empresa.nomeEmpresa}</td>
                    <td className="px-4 text-sm">{empresa.contato}</td>
                    <td className="flex justify-center space-x-2 py-2">
                      <Link href={`/empresas/${empresa.id}`}>
                        <Button className="bg-black text-white text-xs px-3 py-1">
                          Detalhes
                        </Button>
                      </Link>
                      <Link href={`/empresas/${empresa.id}/edit`}>
                        <Button className="bg-black text-white text-xs px-3 py-1">
                          Editar
                        </Button>
                      </Link>
                      <Button
                        onClick={() => handleDelete(empresa.id)}
                        className="bg-black text-white text-xs px-3 py-1"
                      >
                        Excluir
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}

          <div className="flex justify-center mt-4">
            <Link href="/empresas/novo">
              <Button className="bg-black text-white px-6 py-2">
                Adicionar Empresa
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}