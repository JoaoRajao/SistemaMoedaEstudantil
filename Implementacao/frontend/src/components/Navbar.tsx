// src/components/Navbar.tsx
"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const router = useRouter();
  const { logout, isAuthenticated } = useAuth();

  const handleAuthAction = () => {
    if (isAuthenticated) {
      logout();
      router.push("/auth/login");
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <header className="bg-gray-900 text-white shadow-md p-4 flex items-center justify-center">
      <nav className="flex space-x-6">
        <a href="/" className="hover:text-blue-400 transition-colors">
          Home
        </a>
        <a href="/profile" className="hover:text-blue-400 transition-colors">
          Perfil
        </a>
        <button
          onClick={handleAuthAction}
          className="hover:text-blue-400 transition-colors"
        >
          {isAuthenticated ? "Logout" : "Login"}
        </button>
      </nav>
    </header>
  );
}
