"use client";

import { useState, useEffect } from "react";
import {
  addEmpresa,
  updateEmpresa,
  getEmpresaById,
} from "@/services/empresasService";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface EmpresaFormProps {
  empresaId?: number;
}

const EmpresaForm: React.FC<EmpresaFormProps> = ({ empresaId }) => {
  const [nomeEmpresa, setNomeEmpresa] = useState("");
  const [contato, setContato] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (empresaId) {
      getEmpresaById(empresaId).then((empresa) => {
        if (empresa) {
          setNomeEmpresa(empresa.nomeEmpresa);
          setContato(empresa.contato);
        }
      });
    }
  }, [empresaId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (empresaId) {
        await updateEmpresa(empresaId, { nomeEmpresa, contato });
      } else {
        await addEmpresa({ nomeEmpresa, contato });
      }
      router.push("/empresas"); // Redireciona para a página de empresas
    } catch (err) {
      setError("Ocorreu um erro ao salvar a empresa.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-center">
        {empresaId ? "Editar Empresa" : "Adicionar Empresa"}
      </h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="mt-4 space-y-4 w-1/3">
        <input
          className="w-full border p-2"
          type="text"
          placeholder="Nome da Empresa"
          value={nomeEmpresa}
          onChange={(e) => setNomeEmpresa(e.target.value)}
          required
        />
        <input
          className="w-full border p-2"
          type="email"
          placeholder="Contato"
          value={contato}
          onChange={(e) => setContato(e.target.value)}
          required
        />
        <Button className="bg-black text-white w-full">Salvar</Button>
      </form>
    </div>
  );
};

export default EmpresaForm;
