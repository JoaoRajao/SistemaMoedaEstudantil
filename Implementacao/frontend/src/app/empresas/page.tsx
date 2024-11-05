"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DataTable from "../../components/tables/DataTable";
import ConfirmationModal from "../../components/modals/ConfirmationModal";
import { fetchData } from "../../services/apiService";

interface Empresa {
  id: string;
  nome: string;
  cnpj: string;
  endereco: string;
  setor: string;
}

export default function EmpresasList() {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [selectedEmpresa, setSelectedEmpresa] = useState<Empresa | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const headers = ["Nome", "CNPJ", "Endereço", "Setor", "Ações"];

  useEffect(() => {
    loadEmpresas();
  }, []);

  const loadEmpresas = async () => {
    try {
      const data = await fetchData("/Empresa/todas");
      setEmpresas(data);
    } catch (error) {
      console.error("Erro ao buscar empresas:", error);
      setErrorMessage("Erro ao carregar a lista de empresas.");
    }
  };

  const handleDelete = async () => {
    try {
      if (selectedEmpresa) {
        await fetchData(`/api/empresas/${selectedEmpresa.id}`, {
          method: "DELETE",
        });
        alert("Empresa excluída com sucesso!");
        setShowDeleteModal(false);
        loadEmpresas();
      }
    } catch (error) {
      console.error("Erro ao excluir empresa:", error);
      setErrorMessage("Erro ao excluir empresa.");
    }
  };

  const rows = empresas.map((empresa) => [
    empresa.nome,
    empresa.cnpj,
    empresa.endereco,
    empresa.setor,
    <div className="flex space-x-2" key={empresa.id}>
      <Link
        href={`/empresas/${empresa.id}`}
        className="text-blue-500 hover:underline"
      >
        Detalhes
      </Link>
      <Link
        href={`/empresas/${empresa.id}/editar`}
        className="text-yellow-500 hover:underline"
      >
        Editar
      </Link>
      <button
        onClick={() => {
          setSelectedEmpresa(empresa);
          setShowDeleteModal(true);
        }}
        className="text-red-500 hover:underline"
      >
        Excluir
      </button>
    </div>,
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Lista de Empresas</h1>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <Link
        href="/empresas/cadastro"
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        Nova Empresa
      </Link>
      <DataTable headers={headers} rows={rows} />
      {showDeleteModal && (
        <ConfirmationModal
          message="Tem certeza de que deseja excluir esta empresa?"
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}
