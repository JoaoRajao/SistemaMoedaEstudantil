// src/app/profile/page.tsx
"use client";

import { useAuth } from "@/contexts/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Perfil do Usuário</h1>
      <p>Nome: {user?.name}</p>
      <p>Email: {user?.email}</p>
      {/* Adicione mais informações do usuário aqui */}
    </div>
  );
}
