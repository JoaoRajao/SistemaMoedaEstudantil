"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AlunoCard from "../../../components/cards/AlunoCard";
import { fetchData } from "../../../services/apiService";

interface Aluno {
  id: string;
  nome: string;
  curso: string;
  instituicao: string;
}

export default function DetalhesAluno() {
  const router = useRouter();
  const { id } = router.query;
  const [aluno, setAluno] = useState<Aluno | null>(null);

  useEffect(() => {
    async function loadAluno() {
      try {
        const data = await fetchData(`/Aluno/${id}`);
        setAluno(data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do aluno:", error);
      }
    }
    if (id) loadAluno();
  }, [id]);

  if (!aluno) return <p>Carregando...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Detalhes do Aluno</h1>
      <AlunoCard
        name={aluno.nome}
        course={aluno.curso}
        institution={aluno.instituicao}
      />
    </div>
  );
}
