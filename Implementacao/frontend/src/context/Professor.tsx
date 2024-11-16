"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Professor = {
  id: number;
  nome: string;
  cpf: string;
  departamento: string;
  instituicaoId: number; // Alterado para utilizar ID da instituição
};

type ProfessorContextType = {
  professores: Professor[];
  setProfessores: React.Dispatch<React.SetStateAction<Professor[]>>;
};

const ProfessorContext = createContext<ProfessorContextType | undefined>(
  undefined
);

export const ProfessorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [professores, setProfessores] = useState<Professor[]>([]);

  useEffect(() => {
    const fetchProfessores = async () => {
      try {
        const response = await fetch("/api/professor/todos");
        if (!response.ok) throw new Error("Erro ao buscar professores.");
        const data = await response.json();
        setProfessores(data);
      } catch (error) {
        console.error(
          error instanceof Error ? error.message : "Erro desconhecido."
        );
      }
    };

    fetchProfessores();
  }, []);

  return (
    <ProfessorContext.Provider value={{ professores, setProfessores }}>
      {children}
    </ProfessorContext.Provider>
  );
};

export const useProfessorContext = () => {
  const context = useContext(ProfessorContext);
  if (!context) {
    throw new Error(
      "useProfessorContext deve ser usado dentro de ProfessorProvider"
    );
  }
  return context;
};
