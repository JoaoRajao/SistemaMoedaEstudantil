"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "../../../components/forms/InputField";
import SelectField from "../../../components/forms/SelectField";
import ConfirmationModal from "../../../components/modals/ConfirmationModal";
import { fetchData } from "../../../services/apiService";
import { z } from "zod";

const transacaoSchema = z.object({
  descricao: z.string().min(1, "Descrição é obrigatória"),
  valor: z.number().positive("Valor deve ser positivo"),
  data: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Data deve estar no formato YYYY-MM-DD"),
  tipo: z.enum(["Crédito", "Débito"]),
});

export default function CadastroTransacao() {
  const router = useRouter();
  const [transacao, setTransacao] = useState({
    descricao: "",
    valor: 0,
    data: "",
    tipo: "Crédito",
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTransacao({ ...transacao, [name]: value });

    try {
      (
        transacaoSchema.shape[name as keyof typeof transacaoSchema.shape] as any
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
      transacaoSchema.parse(transacao);
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
      await fetchData("/Transacao", {
        method: "POST",
        body: JSON.stringify(transacao),
      });
      alert("Transação cadastrada com sucesso!");
      router.push("/transacoes");
    } catch (error) {
      console.error("Erro ao cadastrar transação:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Cadastro de Transação</h1>
      <InputField
        label="Descrição"
        name="descricao"
        value={transacao.descricao}
        onChange={handleChange}
        error={fieldErrors.descricao}
      />
      <InputField
        label="Valor"
        name="valor"
        type="number"
        value={transacao.valor.toString()}
        onChange={handleChange}
        error={fieldErrors.valor}
      />
      <InputField
        label="Data"
        name="data"
        type="date"
        value={transacao.data}
        onChange={handleChange}
        error={fieldErrors.data}
      />
      <SelectField
        label="Tipo"
        options={[
          { value: "Crédito", label: "Crédito" },
          { value: "Débito", label: "Débito" },
        ]}
        value={transacao.tipo}
        onChange={handleChange}
        error={fieldErrors.tipo}
      />
      <button
        onClick={handleCadastro}
        className="bg-blue-600 text-white px-6 py-2 rounded mt-4"
      >
        Cadastrar
      </button>
      {showConfirmationModal && (
        <ConfirmationModal
          message="Confirma o cadastro desta transação?"
          onConfirm={confirmCadastro}
          onCancel={() => setShowConfirmationModal(false)}
        />
      )}
    </div>
  );
}
