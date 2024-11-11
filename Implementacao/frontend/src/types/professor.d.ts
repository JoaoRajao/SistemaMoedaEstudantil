export interface Professor {
  id: string;
  nome: string;
  disciplina: string;
  instituicao: string;
  cpf: string;
  rg: string;
  endereco: string;
  salario: string;
  saldoMoedas: number;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ProfessorCreateInput = Omit<
  Professor,
  "id" | "saldoMoedas" | "createdAt" | "updatedAt"
>;
