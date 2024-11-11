"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { vantagemService } from "@/services/api/vantagem-service";
import { Vantagem } from "@/types/vantagem";
import PageContainer from "@/components/layout/PageContainer";
import VantagemCard from "@/components/cards/VantagemCard";
import SearchInput from "@/components/inputs/SearchInput";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function VantagensDisponiveisPage() {
  const [vantagens, setVantagens] = useState<Vantagem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchVantagens = async () => {
      try {
        const response = await vantagemService.listarPorEmpresa("");
        if (response.success && response.data) {
          setVantagens(response.data.filter((v) => v.disponivel));
        } else {
          toast.error("Erro ao carregar vantagens disponíveis");
        }
      } catch (error) {
        console.error("Erro ao carregar vantagens:", error);
        toast.error("Erro ao carregar lista de vantagens");
      } finally {
        setLoading(false);
      }
    };

    fetchVantagens();
  }, []);

  const filteredVantagens = vantagens.filter((vantagem) =>
    vantagem.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <PageContainer
      title="Vantagens Disponíveis"
      description="Explore e resgate vantagens exclusivas"
      actions={
        <SearchInput
          placeholder="Buscar vantagens..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVantagens.map((vantagem) => (
          <VantagemCard
            key={vantagem.id}
            nome={vantagem.nome}
            descricao={vantagem.descricao}
            custo={vantagem.custo}
            empresa={vantagem.empresa.nome}
            disponivel={vantagem.disponivel}
            onClick={() =>
              router.push(`/dashboard/vantagens/resgatar/${vantagem.id}`)
            }
          />
        ))}
      </div>
    </PageContainer>
  );
}
