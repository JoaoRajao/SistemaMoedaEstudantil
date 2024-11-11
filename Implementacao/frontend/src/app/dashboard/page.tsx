"use client";

import DashboardCard from "@/components/cards/DashboardCard";
import PageContainer from "@/components/layout/PageContainer";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
import {
  FaCoins,
  FaGift,
  FaAward,
  FaList,
  FaStore,
  FaTicketAlt,
} from "react-icons/fa";
import IconButton from "@/components/buttons/IconButton";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const dashboardCards = [
    {
      title: "Saldo de Moedas",
      description: "Consulte seu saldo atual e histórico de transações",
      action: () => router.push("/dashboard/moedas"),
      icon: <FaCoins className="text-yellow-500 text-3xl" />,
    },
    {
      title: "Vantagens Disponíveis",
      description: "Explore e resgate vantagens exclusivas",
      action: () => router.push("/dashboard/vantagens"),
      icon: <FaGift className="text-red-500 text-3xl" />,
    },
    {
      title: "Distribuir Moedas",
      description: "Reconheça o mérito de seus alunos",
      action: () => router.push("/dashboard/moedas/distribuir"),
      icon: <FaAward className="text-blue-500 text-3xl" />,
    },
    {
      title: "Extrato de Transações",
      description: "Acompanhe suas distribuições de moedas",
      action: () => router.push("/dashboard/moedas/extrato"),
      icon: <FaList className="text-green-500 text-3xl" />,
    },
    {
      title: "Gerenciar Vantagens",
      description: "Cadastre e gerencie suas vantagens oferecidas",
      action: () => router.push("/dashboard/vantagens"),
      icon: <FaStore className="text-purple-500 text-3xl" />,
    },
    {
      title: "Validar Cupons",
      description: "Confira e valide cupons resgatados",
      action: () => router.push("/dashboard/vantagens/cupons/validar"),
      icon: <FaTicketAlt className="text-indigo-500 text-3xl" />,
    },
  ];

  const handleLogout = async () => {
    await logout();
    router.push("/"); // Redireciona para a página principal do sistema
  };

  return (
    <PageContainer
      title={`Bem-vindo(a), ${user?.name || "Usuário"}!`}
      actions={
        <div className="flex space-x-4">
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
      <p className="text-lg text-gray-400 mb-6">
        Explore as funcionalidades disponíveis abaixo:
      </p>

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
