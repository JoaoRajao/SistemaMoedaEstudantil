"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type EmpresaFormProps = {
  empresa?: { nome: string; contato: string; email: string } | null;
  onSubmit: (data: { nome: string; contato: string; email: string }) => void;
};

const EmpresaForm: React.FC<EmpresaFormProps> = ({ empresa, onSubmit }) => {
  const [formData, setFormData] = useState({
    nome: "",
    contato: "",
    email: "",
  });

  useEffect(() => {
    if (empresa) {
      setFormData(empresa);
    }
  }, [empresa]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="nome"
        placeholder="Nome da Empresa"
        value={formData.nome}
        onChange={handleChange}
        required
      />
      <Input
        name="contato"
        placeholder="Contato"
        value={formData.contato}
        onChange={handleChange}
        required
      />
      <Input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <Button type="submit">{empresa ? "Atualizar" : "Cadastrar"}</Button>
    </form>
  );
};

export default EmpresaForm;
