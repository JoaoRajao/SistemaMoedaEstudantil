"use client";

import DashboardCard from "@/components/cards/DashboardCard";
import PageContainer from "@/components/layout/PageContainer";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import IconButton from "@/components/buttons/IconButton";
import { FiLogOut, FiHelpCircle } from "react-icons/fi";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const dashboardCards = [
    {
      title: "Saldo de Moedas",
      description: "Consulte seu saldo atual e histórico de transações",
      action: () => router.push("/dashboard/moedas"),
      icon: <i className="fas fa-coins" />,
    },
    {
      title: "Vantagens Disponíveis",
      description: "Explore e resgate vantagens exclusivas",
      action: () => router.push("/dashboard/vantagens"),
      icon: <i className="fas fa-gift" />,
    },
    {
      title: "Distribuir Moedas",
      description: "Reconheça o mérito de seus alunos",
      action: () => router.push("/dashboard/moedas/distribuir"),
      icon: <i className="fas fa-award" />,
    },
    {
      title: "Extrato de Transações",
      description: "Acompanhe suas distribuições de moedas",
      action: () => router.push("/dashboard/moedas/extrato"),
      icon: <i className="fas fa-list" />,
    },
    {
      title: "Gerenciar Vantagens",
      description: "Cadastre e gerencie suas vantagens oferecidas",
      action: () => router.push("/dashboard/vantagens"),
      icon: <i className="fas fa-store" />,
    },
    {
      title: "Validar Cupons",
      description: "Confira e valide cupons resgatados",
      action: () => router.push("/dashboard/vantagens/cupons/validar"),
      icon: <i className="fas fa-ticket-alt" />,
    },
  ];

  const handleLogout = async () => {
    await logout();
    router.push("/auth/login");
  };

  return (
    <PageContainer
      title={`Bem-vindo(a), ${user?.name || "Usuário"}!`}
      actions={
        <div className="flex space-x-4">
          <IconButton
            icon={<FiHelpCircle />}
            ariaLabel="Ajuda"
            variant="secondary"
            size="sm"
            onClick={() => router.push("/help")}
          />
          <IconButton
            icon={<FiLogOut />}
            ariaLabel="Logout"
            variant="secondary"
            size="sm"
            onClick={handleLogout}
          />
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardCards.map((card) => (
          <DashboardCard
            key={card.title}
            title={card.title}
            description={card.description}
            onClick={card.action}
            icon={card.icon}
            value={""}
          />
        ))}
      </div>
    </PageContainer>
  );
}
