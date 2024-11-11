"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { vantagemService } from "@/services/api/vantagem-service";
import { alunoService } from "@/services/api/aluno-service";
import { Vantagem } from "@/types/vantagem";
import PageContainer from "@/components/layout/PageContainer";
import Button from "@/components/buttons/Button";
import { toast } from "react-toastify";
import { formatters } from "@/utils/formatters";

export default function ResgatarVantagemPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [vantagem, setVantagem] = useState<Vantagem | null>(null);
  const [loading, setLoading] = useState(true);
  const [resgatando, setResgatando] = useState(false);

  useEffect(() => {
    const fetchVantagem = async () => {
      try {
        const response = await vantagemService.getById(id as string);
        if (response.success && response.data) {
          setVantagem(response.data as unknown as Vantagem);
        } else {
          toast.error("Erro ao carregar detalhes da vantagem");
        }
      } catch (error) {
        console.error("Erro ao carregar vantagem:", error);
        toast.error("Erro ao carregar detalhes da vantagem");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchVantagem();
    }
  }, [id]);

  const handleResgatar = async () => {
    if (!user?.id || !vantagem) return;

    try {
      setResgatando(true);
      const response = await alunoService.trocarMoedas(
        user.id.toString(),
        vantagem.id
      );

      if (response.success) {
        toast.success("Vantagem resgatada com sucesso!");
        router.push("/dashboard/vantagens/cupons");
      } else {
        toast.error(response.message || "Erro ao resgatar vantagem");
      }
    } catch (error) {
      console.error("Erro ao resgatar vantagem:", error);
      toast.error("Erro ao resgatar vantagem");
    } finally {
      setResgatando(false);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!vantagem) {
    return <div>Vantagem não encontrada</div>;
  }

  return (
    <PageContainer title="Resgatar Vantagem" backButton>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            {vantagem.nome}
          </h2>
          <p className="text-gray-400 mb-4">{vantagem.descricao}</p>

          <div className="flex justify-between items-center py-4 border-t border-gray-700">
            <div>
              <p className="text-sm text-gray-400">Empresa</p>
              <p className="text-white">{vantagem.empresa.nome}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Custo</p>
              <p className="text-2xl font-bold text-white">
                {formatters.moedas(vantagem.custo)}
              </p>
            </div>
          </div>

          <Button
            onClick={handleResgatar}
            isLoading={resgatando}
            disabled={!vantagem.disponivel}
            className="w-full mt-6"
          >
            Resgatar Vantagem
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}
