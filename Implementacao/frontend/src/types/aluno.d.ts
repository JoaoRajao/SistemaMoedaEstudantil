export interface Aluno {
  id: string;
  nome: string;
  curso: string;
  instituicao: string;
  cpf: string;
  rg: string;
  endereco: string;
  rendimento: string;
  saldoMoedas: number;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export type AlunoCreateInput = Omit<
  Aluno,
  "id" | "saldoMoedas" | "createdAt" | "updatedAt"
>;
