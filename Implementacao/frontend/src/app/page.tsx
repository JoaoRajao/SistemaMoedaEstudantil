// src/app/page.tsx
"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-white mb-4">
        Sistema Moeda Estudantil
      </h1>
      <p className="text-lg text-gray-400 mb-6">
        Gerencie moedas estudantis, recompensas e muito mais de forma prática e
        organizada.
      </p>
      {!isAuthenticated && (
        <Link
          href="/auth/login"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors duration-200"
        >
          Entrar no Sistema
        </Link>
      )}
    </div>
  );
}
