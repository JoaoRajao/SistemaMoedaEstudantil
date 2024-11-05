"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import EmpresaCard from "../../../components/cards/EmpresaCard";
import { fetchData } from "../../../services/apiService";

interface Empresa {
  id: string;
  nome: string;
  cnpj: string;
  endereco: string;
  setor: string;
}

export default function DetalhesEmpresa() {
  const router = useRouter();
  const { id } = router.query;
  const [empresa, setEmpresa] = useState<Empresa | null>(null);

  useEffect(() => {
    async function loadEmpresa() {
      try {
        const data = await fetchData(`/empresas/${id}`);
        setEmpresa(data);
      } catch (error) {
        console.error("Erro ao buscar detalhes da empresa:", error);
      }
    }
    if (id) loadEmpresa();
  }, [id]);

  if (!empresa) return <p>Carregando...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Detalhes da Empresa</h1>
      <EmpresaCard
        name={empresa.nome}
        cnpj={empresa.cnpj}
        address={empresa.endereco}
        sector={empresa.setor}
      />
    </div>
  );
}
