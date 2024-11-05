"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import InputField from "../../../../components/forms/InputField";
import { fetchData } from "../../../../services/apiService";
import { z } from "zod";

const empresaSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  cnpj: z.string().min(14, "CNPJ deve ter 14 dígitos"),
  endereco: z.string().min(1, "Endereço é obrigatório"),
  setor: z.string().min(1, "Setor é obrigatório"),
});

interface Empresa {
  id: string;
  nome: string;
  cnpj: string;
  endereco: string;
  setor: string;
}

export default function EditarEmpresa() {
  const router = useRouter();
  const { id } = useParams();
  const [empresa, setEmpresa] = useState<Empresa | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    async function loadEmpresa() {
      try {
        const data = await fetchData(`/empresas/${id}`);
        setEmpresa(data);
      } catch (error) {
        console.error("Erro ao buscar dados da empresa:", error);
      }
    }
    if (id) loadEmpresa();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (empresa) {
      const { name, value } = e.target;
      setEmpresa({ ...empresa, [name]: value });

      try {
        (
          empresaSchema.shape[
            name as keyof typeof empresaSchema.shape
          ] as z.ZodType<any>
        ).parse(value); // Validação em tempo real
        setFieldErrors({ ...fieldErrors, [name]: "" });
      } catch (error) {
        if (error instanceof z.ZodError) {
          setFieldErrors({ ...fieldErrors, [name]: error.errors[0].message });
        }
      }
    }
  };

  const handleUpdate = async () => {
    try {
      if (empresa) {
        empresaSchema.parse(empresa);
        await fetchData(`/api/empresas/${id}`, {
          method: "PUT",
          body: JSON.stringify(empresa),
        });
        alert("Empresa atualizada com sucesso!");
        router.push("/empresas");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.reduce((acc, err) => {
          acc[err.path[0]] = err.message;
          return acc;
        }, {} as Record<string, string>);
        setFieldErrors(errors);
      }
    }
  };

  if (!empresa) return <p>Carregando...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Editar Empresa</h1>
      <InputField
        label="Nome"
        name="nome"
        value={empresa.nome}
        onChange={handleChange}
        error={fieldErrors.nome}
      />
      <InputField
        label="CNPJ"
        name="cnpj"
        value={empresa.cnpj}
        onChange={handleChange}
        error={fieldErrors.cnpj}
      />
      <InputField
        label="Endereço"
        name="endereco"
        value={empresa.endereco}
        onChange={handleChange}
        error={fieldErrors.endereco}
      />
      <InputField
        label="Setor"
        name="setor"
        value={empresa.setor}
        onChange={handleChange}
        error={fieldErrors.setor}
      />
      <button
        onClick={handleUpdate}
        className="bg-blue-600 text-white px-6 py-2 rounded mt-4"
      >
        Atualizar
      </button>
    </div>
  );
}
