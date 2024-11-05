"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import InputField from "../../../../components/forms/InputField";
import { fetchData } from "../../../../services/apiService";
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

interface Aluno {
  id: string;
  nome: string;
  curso: string;
  instituicao: string;
  cpf: string;
  rg: string;
  endereco: string;
  rendimento: string;
}

export default function EditarAluno() {
  const router = useRouter();
  const { id } = router.query;
  const [aluno, setAluno] = useState<Aluno | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadAluno() {
      try {
        const data = await fetchData(`/Aluno/${id}`);
        setAluno(data);
      } catch (error) {
        console.error("Erro ao buscar dados do aluno:", error);
      }
    }
    if (id) loadAluno();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (aluno) {
      const { name, value } = e.target;
      setAluno({ ...aluno, [name]: value });
    }
  };

  const handleUpdate = async () => {
    try {
      if (aluno) {
        alunoSchema.parse(aluno); // Validação com Zod
        await fetchData(`/Aluno/${id}`, {
          method: "PUT",
          body: JSON.stringify(aluno),
        });
        alert("Aluno atualizado com sucesso!");
        router.push("/alunos/todos"); // Redireciona para a lista de alunos
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrorMessage(error.errors.map((err) => err.message).join(", "));
      } else {
        console.error("Erro ao atualizar aluno:", error);
        setErrorMessage("Erro ao atualizar aluno.");
      }
    }
  };

  if (!aluno) return <p>Carregando...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Editar Aluno</h1>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <InputField
        label="Nome"
        name="nome"
        value={aluno.nome}
        onChange={handleChange}
      />
      <InputField
        label="Curso"
        name="curso"
        value={aluno.curso}
        onChange={handleChange}
      />
      <InputField
        label="Instituição"
        name="instituicao"
        value={aluno.instituicao}
        onChange={handleChange}
      />
      <InputField
        label="CPF"
        name="cpf"
        value={aluno.cpf}
        onChange={handleChange}
      />
      <InputField
        label="RG"
        name="rg"
        value={aluno.rg}
        onChange={handleChange}
      />
      <InputField
        label="Endereço"
        name="endereco"
        value={aluno.endereco}
        onChange={handleChange}
      />
      <InputField
        label="Rendimento"
        name="rendimento"
        value={aluno.rendimento}
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
