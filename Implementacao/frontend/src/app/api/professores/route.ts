import { NextResponse } from "next/server";

export const professoresMock = [
  { id: 1, nome: "Carlos da Silva", email: "carlos@exemplo.com" },
  { id: 2, nome: "Ana Souza", email: "ana@exemplo.com" },
];

// Função para gerar IDs únicos
let nextProfessorId = professoresMock.length
  ? professoresMock[professoresMock.length - 1].id + 1
  : 1;

// Endpoint para obter todos os professores
export async function GET() {
  return NextResponse.json(professoresMock);
}

// Endpoint para adicionar um novo professor
export async function POST(req: Request) {
  const { nome, email } = await req.json();
  const novoProfessor = { id: nextProfessorId++, nome, email }; // Gera um novo ID único
  professoresMock.push(novoProfessor);
  return NextResponse.json(novoProfessor, { status: 201 });
}
