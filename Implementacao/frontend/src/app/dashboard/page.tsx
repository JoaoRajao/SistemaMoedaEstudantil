// src/app/dashboard/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import DataTable from "../../components/tables/DataTable";

export default function Dashboard() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, router]);

  const headers = ["Tipo", "Total"];
  const rows = [
    ["Alunos", "120"],
    ["Professores", "30"],
    ["Empresas", "10"],
    ["Transações", "500"],
    ["Vantagens", "15"],
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Resumo do Sistema</h1>
      <DataTable headers={headers} rows={rows} />
    </div>
  );
}
