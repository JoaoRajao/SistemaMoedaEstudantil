import { NextResponse } from "next/server";

export const alunosMock = [
  { id: 1, nome: "João Silva", email: "joao@exemplo.com", curso: "Engenharia" },
  { id: 2, nome: "Maria Souza", email: "maria@exemplo.com", curso: "Direito" },
];

export async function GET() {
  return NextResponse.json(alunosMock);
}

export async function POST(req: Request) {
  const { nome, email, curso } = await req.json();
  const novoAluno = { id: alunosMock.length + 1, nome, email, curso };
  alunosMock.push(novoAluno);
  return NextResponse.json(novoAluno, { status: 201 });
}
