"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "../../../components/forms/InputField";
import ConfirmationModal from "../../../components/modals/ConfirmationModal";
import { fetchData } from "../../../services/apiService";
import { z } from "zod";

const professorSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  disciplina: z.string().min(1, "Disciplina é obrigatória"),
  instituicao: z.string().min(1, "Instituição é obrigatória"),
  cpf: z.string().min(11, "CPF deve ter 11 dígitos"),
  rg: z.string().min(1, "RG é obrigatório"),
  endereco: z.string().min(1, "Endereço é obrigatório"),
  salario: z.string().min(1, "Salário é obrigatório"),
});

export default function CadastroProfessor() {
  const router = useRouter();
  const [professor, setProfessor] = useState({
    nome: "",
    disciplina: "",
    instituicao: "",
    cpf: "",
    rg: "",
    endereco: "",
    salario: "",
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfessor({ ...professor, [name]: value });
    setFieldErrors({ ...fieldErrors, [name]: "" });
  };

  const handleCadastro = async () => {
    try {
      professorSchema.parse(professor); // Validação com Zod
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
      await fetchData("/Professor/cadastro", {
        method: "POST",
        body: JSON.stringify(professor),
      });
      alert("Professor cadastrado com sucesso!");
      router.push("/professores");
    } catch (error) {
      console.error("Erro ao cadastrar professor:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Cadastro de Professor</h1>
      <InputField
        label="Nome"
        name="nome"
        value={professor.nome}
        onChange={handleChange}
        error={fieldErrors.nome}
      />
      <InputField
        label="Disciplina"
        name="disciplina"
        value={professor.disciplina}
        onChange={handleChange}
        error={fieldErrors.disciplina}
      />
      <InputField
        label="Instituição"
        name="instituicao"
        value={professor.instituicao}
        onChange={handleChange}
        error={fieldErrors.instituicao}
      />
      <InputField
        label="CPF"
        name="cpf"
        value={professor.cpf}
        onChange={handleChange}
        error={fieldErrors.cpf}
      />
      <InputField
        label="RG"
        name="rg"
        value={professor.rg}
        onChange={handleChange}
        error={fieldErrors.rg}
      />
      <InputField
        label="Endereço"
        name="endereco"
        value={professor.endereco}
        onChange={handleChange}
        error={fieldErrors.endereco}
      />
      <InputField
        label="Salário"
        name="salario"
        value={professor.salario}
        onChange={handleChange}
        error={fieldErrors.salario}
      />
      <button
        onClick={handleCadastro}
        className="bg-blue-600 text-white px-6 py-2 rounded mt-4"
      >
        Cadastrar
      </button>
      {showConfirmationModal && (
        <ConfirmationModal
          message="Confirma o cadastro deste professor?"
          onConfirm={confirmCadastro}
          onCancel={() => setShowConfirmationModal(false)}
        />
      )}
    </div>
  );
}
