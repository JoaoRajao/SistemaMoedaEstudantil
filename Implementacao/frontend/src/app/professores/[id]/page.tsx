"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProfessorCard from "../../../components/cards/ProfessorCard";
import { fetchData } from "../../../services/apiService";

interface Professor {
  id: string;
  nome: string;
  disciplina: string;
  instituicao: string;
}

export default function DetalhesProfessor() {
  const router = useRouter();
  const { id } = router.query;
  const [professor, setProfessor] = useState<Professor | null>(null);

  useEffect(() => {
    async function loadProfessor() {
      try {
        const data = await fetchData(`/Professor/${id}`);
        setProfessor(data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do professor:", error);
      }
    }
    if (id) loadProfessor();
  }, [id]);

  if (!professor) return <p>Carregando...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Detalhes do Professor</h1>
      <ProfessorCard
        name={professor.nome}
        discipline={professor.disciplina}
        institution={professor.instituicao}
      />
    </div>
  );
}
