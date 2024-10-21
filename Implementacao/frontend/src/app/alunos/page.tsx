"use client";

import { useState, useEffect } from "react";
import { getAlunos, deleteAluno } from "@/services/alunosService";
import { Table } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Define o tipo Aluno
interface Aluno {
  id: number;
  nome: string;
  email: string;
}

export default function AlunosPage() {
  const router = useRouter();
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAlunos() {
      const data = await getAlunos();
      setAlunos(data);
      setLoading(false); // Certifica que os dados foram carregados
    }

    fetchAlunos();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir este aluno?")) {
      await deleteAluno(id);
      setAlunos((prevAlunos) => prevAlunos.filter((aluno) => aluno.id !== id));
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="px-4 max-w-4xl mx-auto mt-8">
        <div className="border border-gray-300 rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-semibold text-center mb-6">
            Gerenciamento de Alunos
          </h1>

          {loading ? (
            <p>Carregando alunos...</p>
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
                {alunos.map((aluno) => (
                  <tr key={aluno.id} className="border-b text-center">
                    <td className="px-4 text-sm">{aluno.id}</td>
                    <td className="px-4 text-sm">{aluno.nome}</td>
                    <td className="px-4 text-sm">{aluno.email}</td>
                    <td className="flex justify-center space-x-2 py-2">
                      <Link href={`/alunos/${aluno.id}`}>
                        <Button className="bg-black text-white text-xs px-3 py-1">
                          Detalhes
                        </Button>
                      </Link>
                      <Link href={`/alunos/${aluno.id}/edit`}>
                        <Button className="bg-black text-white text-xs px-3 py-1">
                          Editar
                        </Button>
                      </Link>
                      <Button
                        onClick={() => handleDelete(aluno.id)}
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
            <Link href="/alunos/novo">
              <Button className="bg-black text-white px-6 py-2">
                Adicionar Aluno
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
