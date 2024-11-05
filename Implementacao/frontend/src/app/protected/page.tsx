// src/app/protected/page.tsx
"use client";

import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedPage() {
  const { isTokenValid, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isTokenValid()) {
      logout();
      const timer = setTimeout(() => {
        router.push("/auth/login");
      }, 30000); // 30 segundos

      return () => clearTimeout(timer); // Limpa o timer ao desmontar o componente
    }
  }, [isTokenValid, logout, router]);

  return (
    <div>
      Sua sessão expirou ou você não está autenticado. Por favor, faça login
      para acessar o conteúdo.
    </div>
  );
}
