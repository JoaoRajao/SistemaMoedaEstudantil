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
    <div className="p-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="mt-4">Bem-vindo, {user?.email}!</p>

      <div className="mt-6 space-y-4">
        <Link href="/alunos">
          <Button>Gerenciar Alunos</Button>
        </Link>
        <Link href="/empresas">
          <Button>Gerenciar Empresas</Button>
        </Link>
      </div>
    </div>
  );
}
