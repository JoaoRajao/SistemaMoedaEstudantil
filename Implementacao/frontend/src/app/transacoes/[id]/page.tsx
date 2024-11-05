"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import TransacaoCard from "../../../components/cards/TransacaoCard";
import { fetchData } from "../../../services/apiService";

interface Transacao {
  id: string;
  descricao: string;
  valor: number;
  data: string;
  tipo: string;
}

export default function DetalhesTransacao() {
  const router = useRouter();
  const { id } = router.query;
  const [transacao, setTransacao] = useState<Transacao | null>(null);

  useEffect(() => {
    async function loadTransacao() {
      try {
        const data = await fetchData(`/Transacao/${id}`);
        setTransacao(data);
      } catch (error) {
        console.error("Erro ao buscar detalhes da transação:", error);
      }
    }
    if (id) loadTransacao();
  }, [id]);

  if (!transacao) return <p>Carregando...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Detalhes da Transação</h1>
      <TransacaoCard
        descricao={transacao.descricao}
        valor={transacao.valor}
        data={transacao.data}
        tipo={transacao.tipo}
      />
    </div>
  );
}
