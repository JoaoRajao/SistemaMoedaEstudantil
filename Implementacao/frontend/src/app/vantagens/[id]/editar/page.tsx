"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import InputField from "../../../../components/forms/InputField";
import { fetchData } from "../../../../services/apiService";
import { z } from "zod";

const vantagemSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  descricao: z.string().min(1, "Descrição é obrigatória"),
  custo: z.number().positive("Custo deve ser positivo"),
});

interface Vantagem {
  id: string;
  nome: string;
  descricao: string;
  custo: number;
}

export default function EditarVantagem() {
  const router = useRouter();
  const { id } = router.query;
  const [vantagem, setVantagem] = useState<Vantagem | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadVantagem() {
      try {
        const data = await fetchData(`/Vantagem/${id}`);
        setVantagem(data);
      } catch (error) {
        console.error("Erro ao buscar dados da vantagem:", error);
      }
    }
    if (id) loadVantagem();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (vantagem) {
      const { name, value } = e.target;
      setVantagem({ ...vantagem, [name]: value });
    }
  };

  const handleUpdate = async () => {
    try {
      if (vantagem) {
        vantagemSchema.parse(vantagem);
        await fetchData(`/api/Vantagem/${id}`, {
          method: "PUT",
          body: JSON.stringify(vantagem),
        });
        alert("Vantagem atualizada com sucesso!");
        router.push("/vantagens");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrorMessage(error.errors.map((err) => err.message).join(", "));
      } else {
        console.error("Erro ao atualizar vantagem:", error);
        setErrorMessage("Erro ao atualizar vantagem.");
      }
    }
  };

  if (!vantagem) return <p>Carregando...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Editar Vantagem</h1>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <InputField
        label="Nome"
        name="nome"
        value={vantagem.nome}
        onChange={handleChange}
      />
      <InputField
        label="Descrição"
        name="descricao"
        value={vantagem.descricao}
        onChange={handleChange}
      />
      <InputField
        label="Custo"
        name="custo"
        type="number"
        value={vantagem.custo.toString()}
        onChange={handleChange}
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
