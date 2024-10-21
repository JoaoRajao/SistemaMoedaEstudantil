"use client";

import { useState, useEffect } from "react";
import { addAluno, updateAluno, getAlunoById } from "@/services/alunosService";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface AlunoFormProps {
  alunoId?: number; // Para identificar se estamos editando um aluno ou criando um novo
}

const AlunoForm: React.FC<AlunoFormProps> = ({ alunoId }) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [curso, setCurso] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (alunoId) {
      // Carrega os dados do aluno se estiver editando
      getAlunoById(alunoId).then((aluno) => {
        if (aluno) {
          setNome(aluno.nome);
          setEmail(aluno.email);
          setCurso(aluno.curso);
        }
      });
    }
  }, [alunoId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (alunoId) {
        await updateAluno(alunoId, { nome, email, curso });
      } else {
        await addAluno({ nome, email, curso });
      }
      router.push("/alunos"); // Redireciona para a página de alunos
    } catch (err) {
      setError("Ocorreu um erro ao salvar o aluno.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-center">
        {alunoId ? "Editar Aluno" : "Adicionar Aluno"}
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
};

export default AlunoForm;
