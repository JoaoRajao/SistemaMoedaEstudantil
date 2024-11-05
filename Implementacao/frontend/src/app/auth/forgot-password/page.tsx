// src/app/auth/forgot-password/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "@/components/forms/InputField";
import { fetchData } from "@/services/apiService";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleForgotPassword = async () => {
    try {
      await fetchData("/api/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      setSuccess(true);
    } catch (error) {
      setError("Erro ao solicitar recuperação de senha.");
    }
  };

  const handleLoginRedirect = () => {
    router.push("/auth/login");
  };

  const handleRegisterRedirect = () => {
    router.push("/auth/register");
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Recuperação de Senha</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success ? (
        <p className="text-green-500">
          Instruções de recuperação foram enviadas para o seu e-mail.
        </p>
      ) : (
        <>
          <InputField
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={handleForgotPassword}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded mt-4"
          >
            Enviar Instruções
          </button>
        </>
      )}
      <div className="text-center mt-6">
        <p>
          Já tem uma conta?{" "}
          <button
            onClick={handleLoginRedirect}
            className="text-blue-500 hover:underline"
          >
            Voltar ao Login
          </button>
        </p>
        <p className="mt-2">
          Não tem uma conta?{" "}
          <button
            onClick={handleRegisterRedirect}
            className="text-blue-500 hover:underline"
          >
            Crie uma conta
          </button>
        </p>
      </div>
    </div>
  );
}
