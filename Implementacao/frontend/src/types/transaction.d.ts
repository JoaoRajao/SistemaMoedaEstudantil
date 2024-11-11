export interface Transaction {
  id: string;
  descricao: string;
  valor: number;
  data: string;
  tipo: "Crédito" | "Débito";
  alunoId?: string;
  professorId?: string;
  vantagemId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type TransactionCreateInput = Omit<
  Transaction,
  "id" | "createdAt" | "updatedAt"
>;
