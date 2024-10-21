import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, senha } = await req.json();
  if (email === "admin@exemplo.com" && senha === "123456") {
    return NextResponse.json({
      token: "mock-jwt-token",
      user: {
        id: 1,
        name: "Admin",
        email: "admin@exemplo.com",
      },
    });
  } else {
    return NextResponse.json(
      { message: "Credenciais inválidas" },
      { status: 401 }
    );
  }
}
