import { NextResponse } from "next/server";
import { alunosMock } from "../route"; // Importa o mock do arquivo principal

type Params = { params: { id: string } };

// Endpoint para obter um aluno específico pelo ID
export async function GET(req: Request, { params }: Params) {
  const aluno = alunosMock.find((aluno) => aluno.id === Number(params.id));

  if (!aluno) {
    return NextResponse.json(
      { error: "Aluno não encontrado" },
      { status: 404 }
    );
  }

  return NextResponse.json(aluno);
}

// Endpoint para editar um aluno existente
export async function PUT(req: Request, { params }: Params) {
  const { nome, email, curso } = await req.json();
  const aluno = alunosMock.find((a) => a.id === Number(params.id));

  if (!aluno) {
    return NextResponse.json(
      { error: "Aluno não encontrado" },
      { status: 404 }
    );
  }

  aluno.nome = nome;
  aluno.email = email;
  aluno.curso = curso;

  return NextResponse.json(aluno);
}
