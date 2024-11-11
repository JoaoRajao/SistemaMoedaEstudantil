"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { alunoService } from "@/services/api/aluno-service";
import { Aluno } from "@/types/aluno";
import { Transaction } from "@/types/transaction";
import PageContainer from "@/components/layout/PageContainer";
import TransactionTable from "@/components/tables/TransactionTable";
import AlunoDetailsCard from "@/components/cards/AlunoDetailsCard";
import { toast } from "react-toastify";

export default function AlunoDetailsPage() {
  const { id } = useParams();
  const [aluno, setAluno] = useState<Aluno | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchAlunoDetails = async () => {
      try {
        const [alunoData, extratoData] = await Promise.all([
          alunoService.getAluno(id as string),
          alunoService.getExtrato(id as string),
        ]);
        if (
          alunoData?.success &&
          extratoData?.success &&
          alunoData.data &&
          extratoData.data
        ) {
          setAluno(alunoData.data as unknown as Aluno);
          setTransactions(extratoData.data as unknown as Transaction[]);
        } else {
          const errorMessage =
            alunoData.message ||
            extratoData.message ||
            "Erro ao carregar dados do aluno";
          console.error(errorMessage);
          console.error("Erro ao carregar dados:", errorMessage);
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Erro ao carregar detalhes do aluno";
        toast.error(errorMessage);
        console.error("Erro ao carregar detalhes do aluno:", error);
      }
    };

    if (id) {
      fetchAlunoDetails();
    }
  }, [id]);

  if (!aluno) {
    return <div>Carregando...</div>;
  }

  return (
    <PageContainer title={`Perfil do Aluno - ${aluno.nome}`} backButton>
      <div className="space-y-6">
        <AlunoDetailsCard aluno={aluno} />
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
