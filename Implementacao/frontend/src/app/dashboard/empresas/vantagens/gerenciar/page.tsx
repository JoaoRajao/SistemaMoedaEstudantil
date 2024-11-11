"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { vantagemService } from "@/services/api/vantagem-service";
import { Vantagem } from "@/types/vantagem";
import PageContainer from "@/components/layout/PageContainer";
import VantagemCard from "@/components/cards/VantagemCard";
import Button from "@/components/buttons/Button";
import SearchInput from "@/components/inputs/SearchInput";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function GerenciarVantagensPage() {
  const [vantagens, setVantagens] = useState<Vantagem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchVantagens = async () => {
      if (!user?.empresaId) return;

      try {
        const response = await vantagemService.listarPorEmpresa(
          String(user.empresaId)
        );
        if (response.success) {
          if (response.data) {
            setVantagens(response.data.data || []);
          }
        } else {
          toast.error("Erro ao carregar vantagens");
        }
      } catch (error) {
        console.error("Erro ao carregar vantagens:", error);
        toast.error("Erro ao carregar lista de vantagens");
      } finally {
        setLoading(false);
      }
    };

    fetchVantagens();
  }, [user?.empresaId]);

  const filteredVantagens = vantagens.filter((vantagem) =>
    vantagem.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageContainer
      title="Gerenciar Vantagens"
      description="Gerencie as vantagens oferecidas pela sua empresa"
      actions={
        <>
          <SearchInput
            placeholder="Buscar vantagens..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            onClick={() =>
              router.push("/dashboard/empresas/vantagens/cadastrar")
            }
          >
            Nova Vantagem
          </Button>
        </>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVantagens.map((vantagem) => (
          <VantagemCard
            key={vantagem.id}
            nome={vantagem.nome}
            descricao={vantagem.descricao}
            custo={vantagem.custo}
            empresa={vantagem.empresaId}
            disponivel={vantagem.disponivel}
            onClick={() => router.push(`/dashboard/vantagens/${vantagem.id}`)}
          />
        ))}
      </div>
    </PageContainer>
  );
}
