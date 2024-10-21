"use client";

import { useState, useEffect } from "react";
import { getAlunoById } from "@/services/alunosService";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default function AlunoDetalhes({ params }: Props) {
  const [aluno, setAluno] = useState<{
    id: number;
    nome: string;
    email: string;
    curso: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchAluno() {
      try {
        const alunoData = await getAlunoById(Number(params.id));
        if (alunoData) {
          setAluno(alunoData);
        } else {
          setError("Aluno não encontrado");
        }
      } catch (err) {
        setError("Erro ao buscar os dados do aluno");
      }
    }

    fetchAluno();
  }, [params.id]);

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!aluno) {
    return <div className="text-center">Carregando...</div>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div>
        <h1 className="text-3xl font-bold text-center">Detalhes do Aluno</h1>
        <div className="mt-4">
          <p>ID: {aluno.id}</p>
          <p>Nome: {aluno.nome}</p>
          <p>Email: {aluno.email}</p>
          <p>Curso: {aluno.curso}</p>
        </div>
        <Link href="/alunos">
          <Button className="bg-black text-white mt-4">Voltar</Button>
        </Link>
      </div>
    </div>
  );
}
