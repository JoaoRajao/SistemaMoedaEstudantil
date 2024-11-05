// src/app/auth/register/page.tsx

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import InputField from "@/components/forms/InputField";
import { fetchData } from "@/services/apiService";
import { useAuth } from "@/contexts/AuthContext";
import { z } from "zod";

const emailSchema = z.string().email("Formato de e-mail inválido");
const passwordSchema = z
  .string()
  .min(6, "Senha deve ter pelo menos 6 caracteres");

export default function RegisterPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });

    try {
      if (name === "email") emailSchema.parse(value);
      if (name === "password") passwordSchema.parse(value);
      setFieldErrors({ ...fieldErrors, [name]: "" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        setFieldErrors({ ...fieldErrors, [name]: error.errors[0].message });
      }
    }
  };

  const handleRegister = async () => {
    if (user.password !== user.confirmPassword) {
      setFieldErrors({
        ...fieldErrors,
        confirmPassword: "As senhas não coincidem.",
      });
      return;
    }

    try {
      await fetchData("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ email: user.email, password: user.password }),
      });
      setSuccess(true);
      setTimeout(() => router.push("/dashboard"), 2000);
    } catch (error) {
      setFieldErrors({ email: "Erro ao registrar. Tente novamente." });
    }
  };

  const handleLoginRedirect = () => {
    router.push("/auth/login");
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Criar Conta</h1>
      {success && (
        <p className="text-green-500 mb-4">
          Registro bem-sucedido! Redirecionando...
        </p>
      )}
      <InputField
        label="Email"
        name="email"
        type="email"
        value={user.email}
        onChange={handleChange}
        error={fieldErrors.email}
      />
      <InputField
        label="Senha"
        name="password"
        type="password"
        value={user.password}
        onChange={handleChange}
        error={fieldErrors.password}
      />
      <InputField
        label="Confirme a Senha"
        name="confirmPassword"
        type="password"
        value={user.confirmPassword}
        onChange={handleChange}
        error={fieldErrors.confirmPassword}
      />
      <button
        onClick={handleRegister}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded mt-4"
      >
        Registrar
      </button>
      <p className="text-center mt-4">
        <span className="text-gray-500">Já tem uma conta? </span>
        <button
          onClick={handleLoginRedirect}
          className="text-blue-500 hover:underline"
        >
          Voltar ao Login
        </button>
      </p>
    </div>
  );
}
