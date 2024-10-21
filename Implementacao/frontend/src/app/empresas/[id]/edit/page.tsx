"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getEmpresaById, updateEmpresa } from "@/services/empresasService";
import { Button } from "@/components/ui/button";

interface Props {
  params: {
    id: string;
  };
}

export default function EditEmpresaPage({ params }: Props) {
  const router = useRouter();
  const [empresa, setEmpresa] = useState({
    nomeEmpresa: "",
    contato: "",
  });

  useEffect(() => {
    async function fetchEmpresa() {
      const data = await getEmpresaById(Number(params.id));
      if (data) {
        setEmpresa(data);
      }
    }

    fetchEmpresa();
  }, [params.id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await updateEmpresa(Number(params.id), empresa);
    router.push("/empresas");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmpresa({ ...empresa, [name]: value });
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="px-4 max-w-4xl mx-auto mt-8">
        <div className="border border-gray-300 rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-semibold text-center mb-6">
            Editar Empresa
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium">
                Nome da Empresa
              </label>
              <input
                type="text"
                name="nomeEmpresa"
                value={empresa.nomeEmpresa}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Contato</label>
              <input
                type="text"
                name="contato"
                value={empresa.contato}
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
