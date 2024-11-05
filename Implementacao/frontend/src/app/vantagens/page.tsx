"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DataTable from "../../components/tables/DataTable";
import ConfirmationModal from "../../components/modals/ConfirmationModal";
import { fetchData } from "../../services/apiService";

interface Vantagem {
  id: string;
  nome: string;
  descricao: string;
  custo: number;
}

export default function VantagensList() {
  const [vantagens, setVantagens] = useState<Vantagem[]>([]);
  const [selectedVantagem, setSelectedVantagem] = useState<Vantagem | null>(
    null
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const headers = ["Nome", "Descrição", "Custo", "Ações"];

  useEffect(() => {
    loadVantagens();
  }, []);

  const loadVantagens = async () => {
    try {
      const data = await fetchData("/Vantagem");
      setVantagens(data);
    } catch (error) {
      console.error("Erro ao buscar vantagens:", error);
      setErrorMessage("Erro ao carregar a lista de vantagens.");
    }
  };

  const handleDelete = async () => {
    try {
      if (selectedVantagem) {
        await fetchData(`/Vantagem/${selectedVantagem.id}`, {
          method: "DELETE",
        });
        alert("Vantagem excluída com sucesso!");
        setShowDeleteModal(false);
        loadVantagens();
      }
    } catch (error) {
      console.error("Erro ao excluir vantagem:", error);
      setErrorMessage("Erro ao excluir vantagem.");
    }
  };

  const rows = vantagens.map((vantagem) => [
    vantagem.nome,
    vantagem.descricao,
    vantagem.custo.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    }),
    <div className="flex space-x-2" key={vantagem.id}>
      <Link
        href={`/vantagens/${vantagem.id}`}
        className="text-blue-500 hover:underline"
      >
        Detalhes
      </Link>
      <Link
        href={`/vantagens/${vantagem.id}/editar`}
        className="text-yellow-500 hover:underline"
      >
        Editar
      </Link>
      <button
        onClick={() => {
          setSelectedVantagem(vantagem);
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
      <h1 className="text-2xl font-bold mb-4">Lista de Vantagens</h1>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <Link
        href="/vantagens/cadastro"
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        Nova Vantagem
      </Link>
      <DataTable headers={headers} rows={rows} />
      {showDeleteModal && (
        <ConfirmationModal
          message="Tem certeza de que deseja excluir esta vantagem?"
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}
