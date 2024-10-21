"use client";

import { useState, useEffect } from "react";
import {
  addProfessor,
  updateProfessor,
  getProfessorById,
} from "@/services/professoresService";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface ProfessorFormProps {
  professorId?: number;
}

const ProfessorForm: React.FC<ProfessorFormProps> = ({ professorId }) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (professorId) {
      getProfessorById(professorId).then((professor) => {
        if (professor) {
          setNome(professor.nome);
          setEmail(professor.email);
        }
      });
    }
  }, [professorId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (professorId) {
        await updateProfessor(professorId, { nome, email });
      } else {
        await addProfessor({ nome, email });
      }
      router.push("/professores");
    } catch (err) {
      setError("Ocorreu um erro ao salvar o professor.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-center">
        {professorId ? "Editar Professor" : "Adicionar Professor"}
      </h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="mt-4 space-y-4 w-1/3">
        <input
          className="w-full border p-2"
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          className="w-full border p-2"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button className="bg-black text-white w-full">Salvar</Button>
      </form>
    </div>
  );
};

export default ProfessorForm;
