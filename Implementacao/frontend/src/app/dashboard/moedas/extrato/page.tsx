"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Transaction } from "@/types/transaction";
import PageContainer from "@/components/layout/PageContainer";
import TransactionTable from "@/components/tables/TransactionTable";
import { toast } from "react-toastify";
import { alunoService } from "@/services/api/aluno-service";
import { professorService } from "@/services/api/professor-service";

export default function ExtratoPage() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        let response;
        if (user.role === "ALUNO") {
          response = await alunoService.getExtrato(user.id.toString());
        } else if (user.role === "PROFESSOR") {
          response = await professorService.getExtrato(user.id.toString());
        }
        if (response?.success && response.data) {
          setTransactions(response.data as Transaction[]);
        } else {
          toast.error("Erro ao carregar extrato");
        }
      } catch (error) {
        console.error("Erro ao carregar transações:", error);
        toast.error("Erro ao carregar extrato de moedas");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [user]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!user || !["ALUNO", "PROFESSOR"].includes(user.role)) {
    return (
      <PageContainer title="Acesso Negado">
        <div className="text-center text-gray-400">
          Esta página está disponível apenas para alunos e professores.
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      title="Extrato de Moedas"
      description="Histórico de todas as suas transações de moedas"
    >
      <div className="space-y-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Histórico de Transações
          </h2>
          <TransactionTable transactions={transactions} />
        </div>
      </div>
    </PageContainer>
  );
}
