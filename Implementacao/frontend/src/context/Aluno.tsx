"use client";

import React, { createContext, useContext, useState } from "react";

type Aluno = {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  rg?: string;
  endereco?: string;
  instituicao?: string;
  curso?: string;
};

type AlunosContextType = {
  alunos: Aluno[];
  fetchAlunos: () => Promise<void>;
};

const AlunosContext = createContext<AlunosContextType | undefined>(undefined);

export const AlunosProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);

  const fetchAlunos = async () => {
    try {
      const response = await fetch("/api/alunos");
      if (!response.ok) throw new Error("Erro ao buscar alunos.");
      const data = await response.json();
      setAlunos(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AlunosContext.Provider value={{ alunos, fetchAlunos }}>
      {children}
    </AlunosContext.Provider>
  );
};

export const useAlunos = () => {
  const context = useContext(AlunosContext);
  if (!context) {
    throw new Error("useAlunos must be used within an AlunosProvider");
  }
  return context;
};
