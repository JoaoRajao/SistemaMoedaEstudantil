"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaCoins } from "react-icons/fa"; // Ícone de moeda

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/auth/login");
  };

  return (
    <header className="bg-gray-800 border-b border-gray-700 p-4 relative">
      <div className="container mx-auto flex justify-center items-center relative">
        <Link
          href="/dashboard"
          className="text-white flex items-center space-x-2"
        >
          <FaCoins className="text-yellow-400 text-2xl" />{" "}
          {/* Ícone de Moeda */}
        </Link>
        {user && (
          <div className="absolute right-0 flex items-center space-x-4">
            <span className="text-gray-300">Olá, {user.name}</span>
            <button
              onClick={handleLogout}
              className="text-gray-300 hover:text-white"
            >
              Sair
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
