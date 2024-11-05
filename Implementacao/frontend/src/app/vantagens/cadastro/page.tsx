"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "../../../components/forms/InputField";
import ConfirmationModal from "../../../components/modals/ConfirmationModal";
import { fetchData } from "../../../services/apiService";
import { z } from "zod";

const vantagemSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  descricao: z.string().min(1, "Descrição é obrigatória"),
  custo: z.number().positive("Custo deve ser positivo"),
});

export default function CadastroVantagem() {
  const router = useRouter();
  const [vantagem, setVantagem] = useState({
    nome: "",
    descricao: "",
    custo: 0,
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVantagem({ ...vantagem, [name]: value });

    try {
      (
        vantagemSchema.shape[name as keyof typeof vantagemSchema.shape] as any
      ).parse(value);
      setFieldErrors({ ...fieldErrors, [name]: "" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        setFieldErrors({ ...fieldErrors, [name]: error.errors[0].message });
      }
    }
  };

  const handleCadastro = async () => {
    try {
      vantagemSchema.parse(vantagem);
      setShowConfirmationModal(true);
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

  const confirmCadastro = async () => {
    setShowConfirmationModal(false);
    try {
      await fetchData("/api/Vantagem", {
        method: "POST",
        body: JSON.stringify(vantagem),
      });
      alert("Vantagem cadastrada com sucesso!");
      router.push("/vantagens");
    } catch (error) {
      console.error("Erro ao cadastrar vantagem:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Cadastro de Vantagem</h1>
      <InputField
        label="Nome"
        name="nome"
        value={vantagem.nome}
        onChange={handleChange}
        error={fieldErrors.nome}
      />
      <InputField
        label="Descrição"
        name="descricao"
        value={vantagem.descricao}
        onChange={handleChange}
        error={fieldErrors.descricao}
      />
      <InputField
        label="Custo"
        name="custo"
        type="number"
        value={vantagem.custo.toString()}
        onChange={handleChange}
        error={fieldErrors.custo}
      />
      <button
        onClick={handleCadastro}
        className="bg-blue-600 text-white px-6 py-2 rounded mt-4"
      >
        Cadastrar
      </button>
      {showConfirmationModal && (
        <ConfirmationModal
          message="Confirma o cadastro desta vantagem?"
          onConfirm={confirmCadastro}
          onCancel={() => setShowConfirmationModal(false)}
        />
      )}
    </div>
  );
}
