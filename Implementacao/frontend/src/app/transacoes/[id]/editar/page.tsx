"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import InputField from "../../../../components/forms/InputField";
import SelectField from "../../../../components/forms/SelectField";
import { fetchData } from "../../../../services/apiService";
import { z } from "zod";

const transacaoSchema = z.object({
  descricao: z.string().min(1, "Descrição é obrigatória"),
  valor: z.number().positive("Valor deve ser positivo"),
  data: z.string().min(1, "Data é obrigatória"),
  tipo: z.enum(["Crédito", "Débito"]),
});

interface Transacao {
  id: string;
  descricao: string;
  valor: number;
  data: string;
  tipo: string;
}

export default function EditarTransacao() {
  const router = useRouter();
  const { id } = router.query;
  const [transacao, setTransacao] = useState<Transacao | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadTransacao() {
      try {
        const data = await fetchData(`/Transacao/${id}`);
        setTransacao(data);
      } catch (error) {
        console.error("Erro ao buscar dados da transação:", error);
      }
    }
    if (id) loadTransacao();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (transacao) {
      const { name, value } = e.target;
      setTransacao({ ...transacao, [name]: value });
    }
  };

  const handleUpdate = async () => {
    try {
      if (transacao) {
        transacaoSchema.parse(transacao);
        await fetchData(`/api/Transacao/${id}`, {
          method: "PUT",
          body: JSON.stringify(transacao),
        });
        alert("Transação atualizada com sucesso!");
        router.push("/transacoes");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrorMessage(error.errors.map((err) => err.message).join(", "));
      } else {
        console.error("Erro ao atualizar transação:", error);
        setErrorMessage("Erro ao atualizar transação.");
      }
    }
  };

  if (!transacao) return <p>Carregando...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Editar Transação</h1>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <InputField
        label="Descrição"
        name="descricao"
        value={transacao.descricao}
        onChange={handleChange}
      />
      <InputField
        label="Valor"
        name="valor"
        type="number"
        value={transacao.valor.toString()}
        onChange={handleChange}
      />
      <InputField
        label="Data"
        name="data"
        type="date"
        value={transacao.data}
        onChange={handleChange}
      />
      <SelectField
        label="Tipo"
        options={[
          { value: "Crédito", label: "Crédito" },
          { value: "Débito", label: "Débito" },
        ]}
        value={transacao.tipo}
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
