// src/app/auth/login/page.tsx

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import InputField from "../../../components/forms/InputField";
import { useAuth } from "../../../contexts/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = async () => {
    try {
      await login(credentials.email, credentials.password);
    } catch (error) {
      if ((error as Error).message.includes("credenciais")) {
        setError("Credenciais inválidas. Verifique o e-mail e a senha.");
      } else if ((error as Error).message.includes("servidor")) {
        setError("Erro no servidor. Tente novamente mais tarde.");
      } else {
        setError("Erro ao fazer login. Tente novamente.");
      }
    }
  };

  const handleRegisterRedirect = () => {
    router.push("/auth/register");
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <InputField
        label="Email"
        name="email"
        type="email"
        value={credentials.email}
        onChange={handleChange}
      />
      <InputField
        label="Senha"
        name="password"
        type="password"
        value={credentials.password}
        onChange={handleChange}
      />
      <button
        onClick={handleLogin}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded mt-4"
      >
        Entrar
      </button>
      <p className="text-center mt-4">
        <a
          href="/auth/forgot-password"
          className="text-blue-500 hover:underline"
        >
          Esqueceu sua senha?
        </a>
      </p>
      <p className="text-center mt-4">
        <span className="text-gray-500">Não tem uma conta? </span>
        <button
          onClick={handleRegisterRedirect}
          className="text-blue-500 hover:underline"
        >
          Crie uma conta
        </button>
      </p>
    </div>
  );
}
