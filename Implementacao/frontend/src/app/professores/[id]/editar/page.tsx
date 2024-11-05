"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import InputField from "../../../../components/forms/InputField";
import { fetchData } from "../../../../services/apiService";
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

interface Professor {
  id: string;
  nome: string;
  disciplina: string;
  instituicao: string;
  cpf: string;
  rg: string;
  endereco: string;
  salario: string;
}

export default function EditarProfessor() {
  const router = useRouter();
  const { id } = router.query;
  const [professor, setProfessor] = useState<Professor | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadProfessor() {
      try {
        const data = await fetchData(`/Professor/${id}`);
        setProfessor(data);
      } catch (error) {
        console.error("Erro ao buscar dados do professor:", error);
      }
    }
    if (id) loadProfessor();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (professor) {
      const { name, value } = e.target;
      setProfessor({ ...professor, [name]: value });
    }
  };

  const handleUpdate = async () => {
    try {
      if (professor) {
        professorSchema.parse(professor); // Validação com Zod
        await fetchData(`/Professor/${id}`, {
          method: "PUT",
          body: JSON.stringify(professor),
        });
        alert("Professor atualizado com sucesso!");
        router.push("/professores");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrorMessage(error.errors.map((err) => err.message).join(", "));
      } else {
        console.error("Erro ao atualizar professor:", error);
        setErrorMessage("Erro ao atualizar professor.");
      }
    }
  };

  if (!professor) return <p>Carregando...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Editar Professor</h1>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <InputField
        label="Nome"
        name="nome"
        value={professor.nome}
        onChange={handleChange}
      />
      <InputField
        label="Disciplina"
        name="disciplina"
        value={professor.disciplina}
        onChange={handleChange}
      />
      <InputField
        label="Instituição"
        name="instituicao"
        value={professor.instituicao}
        onChange={handleChange}
      />
      <InputField
        label="CPF"
        name="cpf"
        value={professor.cpf}
        onChange={handleChange}
      />
      <InputField
        label="RG"
        name="rg"
        value={professor.rg}
        onChange={handleChange}
      />
      <InputField
        label="Endereço"
        name="endereco"
        value={professor.endereco}
        onChange={handleChange}
      />
      <InputField
        label="Salário"
        name="salario"
        value={professor.salario}
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
