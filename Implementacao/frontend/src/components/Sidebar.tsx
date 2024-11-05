// src/components/Sidebar.tsx
"use client";

import Link from "next/link";
import { FiHome, FiUser, FiDollarSign, FiGift } from "react-icons/fi";
import { FaBuilding, FaCoins } from "react-icons/fa";
import { useAuth } from "@/contexts/AuthContext";

const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: FiHome },
  { href: "/alunos", label: "Alunos", icon: FiUser },
  { href: "/professores", label: "Professores", icon: FiUser },
  { href: "/empresas", label: "Empresas", icon: FaBuilding },
  { href: "/transacoes", label: "Transações", icon: FiDollarSign },
  { href: "/vantagens", label: "Vantagens", icon: FiGift },
];

export default function Sidebar() {
  const { isAuthenticated } = useAuth();

  return (
    <aside className="w-64 bg-gray-900 text-white p-4 h-screen fixed">
      <Link
        href="/"
        className="flex items-center justify-center mb-6 hover:text-blue-400 transition-colors duration-200"
      >
        <FaCoins className="text-3xl mr-2" />
      </Link>
      <nav className="flex flex-col space-y-4">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={isAuthenticated ? item.href : "/auth/login"}
            className="flex items-center space-x-2 text-lg hover:text-blue-400"
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
