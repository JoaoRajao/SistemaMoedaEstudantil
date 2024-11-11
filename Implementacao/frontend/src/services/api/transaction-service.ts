import { fetchWithAuth } from "../http-client";
import { Transaction, TransactionCreateInput } from "@/types/transaction";

export const transactionService = {
  criar: (data: TransactionCreateInput) =>
    fetchWithAuth<Transaction>("/api/transacoes", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  listar: () => fetchWithAuth<Transaction[]>("/transacoes"),

  getById: (id: string) => fetchWithAuth<Transaction>(`/transacoes/${id}`),
};
