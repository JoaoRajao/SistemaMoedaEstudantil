"use client";

import { useState, useEffect } from "react";
import { getProfessores, deleteProfessor } from "@/services/professoresService";
import { Table } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Define o tipo Professor
interface Professor {
  id: number;
  nome: string;
  email: string;
}

export default function ProfessoresPage() {
  const router = useRouter();
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfessores() {
      const data = await getProfessores();
      setProfessores(data);
      setLoading(false);
    }

    fetchProfessores();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir este professor?")) {
      await deleteProfessor(id);
      setProfessores((prevProfessores) =>
        prevProfessores.filter((professor) => professor.id !== id)
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="px-4 max-w-4xl mx-auto mt-8">
        <div className="border border-gray-300 rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-semibold text-center mb-6">
            Gerenciamento de Professores
          </h1>

          {loading ? (
            <p>Carregando professores...</p>
          ) : (
            <Table className="w-full border-separate border-spacing-y-2">
              <thead>
                <tr className="text-center text-lg font-medium">
                  <th className="pb-2 px-4">ID</th>
                  <th className="pb-2 px-4">Nome</th>
                  <th className="pb-2 px-4">Email</th>
                  <th className="pb-2 px-4">Ações</th>
                </tr>
              </thead>
              <tbody>
                {professores.map((professor) => (
                  <tr key={professor.id} className="border-b text-center">
                    <td className="px-4 text-sm">{professor.id}</td>
                    <td className="px-4 text-sm">{professor.nome}</td>
                    <td className="px-4 text-sm">{professor.email}</td>
                    <td className="flex justify-center space-x-2 py-2">
                      <Link href={`/professores/${professor.id}`}>
                        <Button className="bg-black text-white text-xs px-3 py-1">
                          Detalhes
                        </Button>
                      </Link>
                      <Link href={`/professores/${professor.id}/edit`}>
                        <Button className="bg-black text-white text-xs px-3 py-1">
                          Editar
                        </Button>
                      </Link>
                      <Button
                        onClick={() => handleDelete(professor.id)}
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
            <Link href="/professores/novo">
              <Button className="bg-black text-white px-6 py-2">
                Adicionar Professor
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
