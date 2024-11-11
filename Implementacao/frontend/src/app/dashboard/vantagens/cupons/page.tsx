"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { cupomService } from "@/services/api/cupom-service";
import { Cupom } from "@/types/cupom";
import PageContainer from "@/components/layout/PageContainer";
import CupomCard from "@/components/cards/CupomCard";
import { toast } from "react-toastify";
import SearchInput from "@/components/inputs/SearchInput";

export default function CuponsPage() {
  const { user } = useAuth();
  const [cupons, setCupons] = useState<Cupom[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCupons = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        const response = await cupomService.listarPorAluno(user.id.toString());
        if (response.success && response.data) {
          setCupons(response.data.data || []); // Corrigido para acessar response.data.data
        } else {
          toast.error("Erro ao carregar cupons");
        }
      } catch (error) {
        console.error("Erro ao carregar cupons:", error);
        toast.error("Erro ao carregar lista de cupons");
      } finally {
        setLoading(false);
      }
    };

    fetchCupons();
  }, [user]);

  const filteredCupons = cupons.filter((cupom) =>
    cupom.vantagem.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!user || user.role !== "ALUNO") {
    return (
      <PageContainer title="Acesso Negado">
        <div className="text-center text-gray-400">
          Esta página está disponível apenas para alunos.
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      title="Meus Cupons"
      description="Gerencie seus cupons resgatados"
      actions={
        <SearchInput
          placeholder="Buscar cupons..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCupons.map((cupom) => (
          <CupomCard
            key={cupom.id}
            codigo={cupom.codigo}
            status={cupom.status}
            dataResgate={cupom.dataResgate}
            dataValidade={cupom.dataValidade}
            vantagem={cupom.vantagem}
          />
        ))}
      </div>
    </PageContainer>
  );
}
