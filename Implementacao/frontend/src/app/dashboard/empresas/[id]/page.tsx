"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { empresaService } from "@/services/api/empresa-service";
import { Empresa } from "@/types/empresa";
import { Vantagem } from "@/types/vantagem";
import PageContainer from "@/components/layout/PageContainer";
import EmpresaDetailsCard from "@/components/cards/EmpresaDetailsCard";
import VantagemCard from "@/components/cards/VantagemCard";
import Button from "@/components/buttons/Button";
import { toast } from "react-toastify";

export default function EmpresaDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [empresa, setEmpresa] = useState<Empresa | null>(null);
  const [vantagens, setVantagens] = useState<Vantagem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmpresaDetails = async () => {
      try {
        const [empresaData, vantagensData] = await Promise.all([
          empresaService.getById(id as string),
          empresaService.getVantagens(id as string),
        ]);
        if (empresaData.success && vantagensData.success) {
          if (empresaData.data && vantagensData.data) {
            setEmpresa(empresaData.data as unknown as Empresa);
            setVantagens(vantagensData.data as unknown as Vantagem[]);
          } else {
            toast.error("Dados da empresa não encontrados");
          }
        } else {
          toast.error("Erro ao carregar dados da empresa");
        }
      } catch (error) {
        console.error("Erro ao carregar detalhes da empresa:", error);
        toast.error("Erro ao carregar detalhes da empresa");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEmpresaDetails();
    }
  }, [id]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!empresa) {
    return <div>Empresa não encontrada</div>;
  }

  return (
    <PageContainer title={`Perfil da Empresa - ${empresa.nome}`} backButton>
      <div className="space-y-6">
        <EmpresaDetailsCard empresa={empresa} />

        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">
            Vantagens Oferecidas
          </h2>
          <Button
            onClick={() =>
              router.push(`/dashboard/empresas/${id}/vantagens/cadastrar`)
            }
          >
            Nova Vantagem
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vantagens.map((vantagem) => (
            <VantagemCard
              key={vantagem.id}
              nome={vantagem.nome}
              descricao={vantagem.descricao}
              custo={vantagem.custo}
              empresa={empresa.nome}
              disponivel={vantagem.disponivel}
              onClick={() => router.push(`/dashboard/vantagens/${vantagem.id}`)}
            />
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
