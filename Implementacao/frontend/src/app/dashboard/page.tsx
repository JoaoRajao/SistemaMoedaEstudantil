"use client";

import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useSelector((state: { auth: { user: any } }) => state.auth);
  const router = useRouter();

  if (!user) {
    router.push("/login");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div>
        <h1 className="text-3xl font-bold text-center">Dashboard</h1>
        <p className="mt-4 text-center">Seja bem-vindo!</p>
        <div className="mt-6 space-y-4">
          <Link href="/alunos">
            <Button className="bg-black text-white">Gerenciar Alunos</Button>
          </Link>
          <Link href="/empresas">
            <Button className="bg-black text-white">Gerenciar Empresas</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
