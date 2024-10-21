import { NextResponse } from "next/server";

export const alunosMock = [
  { id: 1, nome: "João Silva", email: "joao@exemplo.com", curso: "Engenharia" },
  { id: 2, nome: "Maria Souza", email: "maria@exemplo.com", curso: "Direito" },
];

// Função para gerar IDs únicos
let nextAlunoId = alunosMock.length
  ? alunosMock[alunosMock.length - 1].id + 1
  : 1;

// Endpoint para obter todos os alunos
export async function GET() {
  return NextResponse.json(alunosMock);
}

// Endpoint para adicionar um novo aluno
export async function POST(req: Request) {
  const { nome, email, curso } = await req.json();
  const novoAluno = { id: nextAlunoId++, nome, email, curso }; // Gera um novo ID único
  alunosMock.push(novoAluno);
  return NextResponse.json(novoAluno, { status: 201 });
}
