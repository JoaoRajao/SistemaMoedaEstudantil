"use client";

import { useState, useEffect } from "react";
import { updateAluno, getAlunoById } from "@/services/alunosService";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface EditAlunoFormProps {
  params: {
    id: string;
  };
}

export default function EditAlunoForm({ params }: EditAlunoFormProps) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [curso, setCurso] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const alunoId = Number(params.id);

  // Carregar dados do aluno ao montar o componente
  useEffect(() => {
    async function fetchAluno() {
      const aluno = await getAlunoById(alunoId);
      if (aluno) {
        setNome(aluno.nome);
        setEmail(aluno.email);
        setCurso(aluno.curso);
      } else {
        setError("Aluno não encontrado");
      }
    }
    fetchAluno();
  }, [alunoId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateAluno(alunoId, { nome, email, curso });
      router.push("/alunos"); // Redireciona para a página de listagem após salvar
    } catch (err) {
      setError("Erro ao atualizar o aluno.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-center">Editar Aluno</h1>
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
        <input
          className="w-full border p-2"
          type="text"
          placeholder="Curso"
          value={curso}
          onChange={(e) => setCurso(e.target.value)}
          required
        />
        <Button className="bg-black text-white w-full">Salvar</Button>
      </form>
    </div>
  );
}
