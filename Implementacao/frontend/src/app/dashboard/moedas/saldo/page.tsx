"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import PageContainer from "@/components/layout/PageContainer";
import { alunoService } from "@/services/api/aluno-service";
import { toast } from "react-toastify";
import { FaCoins, FaExchangeAlt, FaGift } from "react-icons/fa";
import { formatters } from "@/utils/formatters";

interface SaldoInfo {
  saldoAtual: number;
  totalRecebido: number;
  totalGasto: number;
}

export default function SaldoPage() {
  const { user } = useAuth();
  const [saldoInfo, setSaldoInfo] = useState<SaldoInfo>({
    saldoAtual: 0,
    totalRecebido: 0,
    totalGasto: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSaldoInfo = async () => {
      if (!user?.id || user.role !== "ALUNO") {
        setLoading(false);
        return;
      }

      try {
        const response = await alunoService.getSaldoInfo(user.id.toString());
        if (response.success && response.data) {
          setSaldoInfo({
            saldoAtual: response.data.saldoAtual,
            totalRecebido: response.data.totalRecebido,
            totalGasto: response.data.totalGasto,
          });
        } else {
          toast.error("Erro ao carregar informações do saldo");
        }
      } catch (error) {
        console.error("Erro ao carregar saldo:", error);
        toast.error("Erro ao carregar informações do saldo");
      } finally {
        setLoading(false);
      }
    };

    fetchSaldoInfo();
  }, [user]);

  const cards = [
    {
      title: "Saldo Atual",
      value: formatters.moedas(saldoInfo.saldoAtual),
      icon: <FaCoins className="text-yellow-500 text-3xl" />,
      bgColor: "bg-yellow-500/10",
    },
    {
      title: "Total Recebido",
      value: formatters.moedas(saldoInfo.totalRecebido),
      icon: <FaExchangeAlt className="text-green-500 text-3xl" />,
      bgColor: "bg-green-500/10",
    },
    {
      title: "Total Gasto",
      value: formatters.moedas(saldoInfo.totalGasto),
      icon: <FaGift className="text-red-500 text-3xl" />,
      bgColor: "bg-red-500/10",
    },
  ];

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
      title="Saldo de Moedas"
      description="Acompanhe seu saldo e movimentações de moedas"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg ${card.bgColor} border border-gray-700`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">{card.title}</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {card.value}
                </p>
              </div>
              {card.icon}
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
