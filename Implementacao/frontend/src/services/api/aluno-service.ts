import { fetchWithAuth } from "../http-client";
import { Aluno, AlunoCreateInput } from "@/types/aluno";
import { ApiResponse } from "@/types/response";
import { Transaction } from "@/types/transaction";

export const alunoService = {
  cadastrar: (data: AlunoCreateInput) =>
    fetchWithAuth<ApiResponse<Aluno>>("/api/alunos/cadastrar", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getExtrato: (id: string) =>
    fetchWithAuth<ApiResponse<Transaction[]>>(`/api/alunos/${id}/extrato`),

  trocarMoedas: (id: string, vantagemId: string) =>
    fetchWithAuth<ApiResponse<void>>(`/api/alunos/${id}/trocar`, {
      method: "POST",
      body: JSON.stringify({ vantagemId }),
    }),

  listarAlunos: () => fetchWithAuth<ApiResponse<Aluno[]>>("/api/alunos"),

  getAluno: (id: string) =>
    fetchWithAuth<ApiResponse<Aluno>>(`/api/alunos/${id}`),

  getSaldoInfo: (id: string) =>
    fetchWithAuth<
      ApiResponse<{
        saldoAtual: number;
        totalRecebido: number;
        totalGasto: number;
      }>
    >(`/api/alunos/${id}/saldo-info`),
};
