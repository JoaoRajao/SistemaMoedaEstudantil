"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import VantagemCard from "../../../components/cards/VantagemCard";
import { fetchData } from "../../../services/apiService";

interface Vantagem {
  id: string;
  nome: string;
  descricao: string;
  custo: number;
}

export default function DetalhesVantagem() {
  const router = useRouter();
  const { id } = router.query;
  const [vantagem, setVantagem] = useState<Vantagem | null>(null);

  useEffect(() => {
    async function loadVantagem() {
      try {
        const data = await fetchData(`/Vantagem/${id}`);
        setVantagem(data);
      } catch (error) {
        console.error("Erro ao buscar detalhes da vantagem:", error);
      }
    }
    if (id) loadVantagem();
  }, [id]);

  if (!vantagem) return <p>Carregando...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Detalhes da Vantagem</h1>
      <VantagemCard
        nome={vantagem.nome}
        descricao={vantagem.descricao}
        custo={vantagem.custo}
      />
    </div>
  );
}
