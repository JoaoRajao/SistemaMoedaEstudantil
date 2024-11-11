export interface Vantagem {
  empresa: any;
  id: string;
  nome: string;
  descricao: string;
  custo: number;
  empresaId: string;
  foto?: string;
  disponivel: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type VantagemCreateInput = Omit<
  Vantagem,
  "id" | "createdAt" | "updatedAt"
>;
