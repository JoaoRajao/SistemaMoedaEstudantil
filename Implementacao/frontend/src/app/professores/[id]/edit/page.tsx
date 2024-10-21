"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getProfessorById,
  updateProfessor,
} from "@/services/professoresService";
import { Button } from "@/components/ui/button";

interface Props {
  params: {
    id: string;
  };
}

export default function EditProfessorPage({ params }: Props) {
  const router = useRouter();
  const [professor, setProfessor] = useState({
    nome: "",
    email: "",
  });

  useEffect(() => {
    async function fetchProfessor() {
      const data = await getProfessorById(Number(params.id));
      if (data) {
        setProfessor(data);
      }
    }

    fetchProfessor();
  }, [params.id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await updateProfessor(Number(params.id), professor);
    router.push("/professores");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfessor({ ...professor, [name]: value });
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="px-4 max-w-4xl mx-auto mt-8">
        <div className="border border-gray-300 rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-semibold text-center mb-6">
            Editar Professor
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium">
                Nome do Professor
              </label>
              <input
                type="text"
                name="nome"
                value={professor.nome}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={professor.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="flex justify-center">
              <Button type="submit" className="bg-black text-white px-6 py-2">
                Salvar Alterações
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
