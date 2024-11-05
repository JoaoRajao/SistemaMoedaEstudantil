import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isTokenExpired } from "./services/apiService";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token || isTokenExpired(token)) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/alunos/:path*",
    "/professores/:path*",
    "/empresas/:path*",
    "/transacoes/:path*",
    "/vantagens/:path*",
  ],
};
