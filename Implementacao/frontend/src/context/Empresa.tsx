"use client";

import React, { createContext, useContext, useState } from "react";

export type Empresa = {
  id: number;
  nome: string;
  contato: string;
  email: string;
};

type EmpresaContextType = {
  empresas: Empresa[];
  addEmpresa: (empresa: Omit<Empresa, "id">) => void;
  editEmpresa: (id: number, updatedEmpresa: Omit<Empresa, "id">) => void;
  deleteEmpresa: (id: number) => void;
};

const EmpresaContext = createContext<EmpresaContextType | undefined>(undefined);

export const EmpresaProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);

  const addEmpresa = async (empresa: Omit<Empresa, "id">) => {
    const response = await fetch("/api/empresas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(empresa),
    });
    const newEmpresa = await response.json();
    setEmpresas((prev) => [...prev, newEmpresa]);
  };

  const editEmpresa = async (
    id: number,
    updatedEmpresa: Omit<Empresa, "id">
  ) => {
    const response = await fetch(`/api/empresas/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedEmpresa),
    });
    const updatedData = await response.json();
    setEmpresas((prev) =>
      prev.map((empresa) => (empresa.id === id ? updatedData : empresa))
    );
  };

  const deleteEmpresa = async (id: number) => {
    await fetch(`/api/empresas/${id}`, { method: "DELETE" });
    setEmpresas((prev) => prev.filter((empresa) => empresa.id !== id));
  };

  return (
    <EmpresaContext.Provider
      value={{ empresas, addEmpresa, editEmpresa, deleteEmpresa }}
    >
      {children}
    </EmpresaContext.Provider>
  );
};

export const useEmpresaContext = () => {
  const context = useContext(EmpresaContext);
  if (!context) {
    throw new Error("useEmpresaContext must be used within an EmpresaProvider");
  }
  return context;
};
