"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "../../../components/forms/InputField";
import ConfirmationModal from "../../../components/modals/ConfirmationModal";
import { fetchData } from "../../../services/apiService";
import { z } from "zod";

const empresaSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  cnpj: z.string().min(14, "CNPJ deve ter 14 dígitos"),
  endereco: z.string().min(1, "Endereço é obrigatório"),
  setor: z.string().min(1, "Setor é obrigatório"),
});

export default function CadastroEmpresa() {
  const router = useRouter();
  const [empresa, setEmpresa] = useState({
    nome: "",
    cnpj: "",
    endereco: "",
    setor: "",
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmpresa({ ...empresa, [name]: value });

    try {
      (
        empresaSchema.shape[
          name as keyof typeof empresaSchema.shape
        ] as z.ZodString
      ).parse(value); // Validação em tempo real
      setFieldErrors({ ...fieldErrors, [name]: "" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        setFieldErrors({ ...fieldErrors, [name]: error.errors[0].message });
      }
    }
  };

  const handleCadastro = async () => {
    try {
      empresaSchema.parse(empresa);
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
      await fetchData("/Empresa/cadastro", {
        method: "POST",
        body: JSON.stringify(empresa),
      });
      alert("Empresa cadastrada com sucesso!");
      router.push("/empresas");
    } catch (error) {
      console.error("Erro ao cadastrar empresa:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Cadastro de Empresa</h1>
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
        onClick={handleCadastro}
        className="bg-blue-600 text-white px-6 py-2 rounded mt-4"
      >
        Cadastrar
      </button>
      {showConfirmationModal && (
        <ConfirmationModal
          message="Confirma o cadastro desta empresa?"
          onConfirm={confirmCadastro}
          onCancel={() => setShowConfirmationModal(false)}
        />
      )}
    </div>
  );
}
