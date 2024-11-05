"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "../../../components/forms/InputField";
import ConfirmationModal from "../../../components/modals/ConfirmationModal";
import { fetchData } from "../../../services/apiService";
import { z } from "zod";

const alunoSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  curso: z.string().min(1, "Curso é obrigatório"),
  instituicao: z.string().min(1, "Instituição é obrigatória"),
  cpf: z.string().min(11, "CPF deve ter 11 dígitos"),
  rg: z.string().min(1, "RG é obrigatório"),
  endereco: z.string().min(1, "Endereço é obrigatório"),
  rendimento: z.string().min(1, "Rendimento é obrigatório"),
});

export default function CadastroAluno() {
  const router = useRouter();
  const [aluno, setAluno] = useState({
    nome: "",
    curso: "",
    instituicao: "",
    cpf: "",
    rg: "",
    endereco: "",
    rendimento: "",
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAluno({ ...aluno, [name]: value });
    setFieldErrors({ ...fieldErrors, [name]: "" });
  };

  const handleCadastro = async () => {
    try {
      alunoSchema.parse(aluno); // Validação com Zod
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
      const response = await fetchData("/Aluno/cadastro", {
        method: "POST",
        body: JSON.stringify(aluno),
      });

      if (!response.ok) {
        throw new Error("Erro ao realizar o cadastro do aluno.");
      }

      alert("Aluno cadastrado com sucesso!");
      router.push("/alunos/todos"); // Redireciona para a lista de alunos
    } catch (error) {
      console.error("Erro ao cadastrar aluno:", error);
      alert(
        "Não foi possível realizar o cadastro. Verifique os dados e tente novamente."
      );
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Cadastro de Aluno</h1>
      <InputField
        label="Nome"
        name="nome"
        value={aluno.nome}
        onChange={handleChange}
        error={fieldErrors.nome}
      />
      <InputField
        label="Curso"
        name="curso"
        value={aluno.curso}
        onChange={handleChange}
        error={fieldErrors.curso}
      />
      <InputField
        label="Instituição"
        name="instituicao"
        value={aluno.instituicao}
        onChange={handleChange}
        error={fieldErrors.instituicao}
      />
      <InputField
        label="CPF"
        name="cpf"
        value={aluno.cpf}
        onChange={handleChange}
        error={fieldErrors.cpf}
      />
      <InputField
        label="RG"
        name="rg"
        value={aluno.rg}
        onChange={handleChange}
        error={fieldErrors.rg}
      />
      <InputField
        label="Endereço"
        name="endereco"
        value={aluno.endereco}
        onChange={handleChange}
        error={fieldErrors.endereco}
      />
      <InputField
        label="Rendimento"
        name="rendimento"
        value={aluno.rendimento}
        onChange={handleChange}
        error={fieldErrors.rendimento}
      />
      <button
        onClick={handleCadastro}
        className="bg-blue-600 text-white px-6 py-2 rounded mt-4"
      >
        Cadastrar
      </button>
      {showConfirmationModal && (
        <ConfirmationModal
          message="Confirma o cadastro deste aluno?"
          onConfirm={confirmCadastro}
          onCancel={() => setShowConfirmationModal(false)}
        />
      )}
    </div>
  );
}
