"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { login } from "@/redux/slices/authSlice";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await dispatch(login({ email, senha: password }));
      router.push("/dashboard");
    } catch (error) {
      console.error("Erro no login:", error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div>
        <h1 className="text-3xl font-semibold text-black">Login</h1>
        <p className="mt-2 text-sm text-gray-600 text-center">
          Entre com suas credenciais para acessar o sistema
        </p>
        <div className="mt-6 space-y-4">
          <Input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
          <Button
            onClick={handleLogin}
            className="w-full py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            Entrar
          </Button>
        </div>
      </div>
    </div>
  );
}
