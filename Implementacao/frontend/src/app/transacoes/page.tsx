"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DataTable from "../../components/tables/DataTable";
import ConfirmationModal from "../../components/modals/ConfirmationModal";
import { fetchData } from "../../services/apiService";

interface Transacao {
  id: string;
  descricao: string;
  valor: number;
  data: string;
  tipo: string; // "Crédito" ou "Débito"
}

export default function TransacoesList() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [selectedTransacao, setSelectedTransacao] = useState<Transacao | null>(
    null
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const headers = ["Descrição", "Valor", "Data", "Tipo", "Ações"];

  useEffect(() => {
    loadTransacoes();
  }, []);

  const loadTransacoes = async () => {
    try {
      const data = await fetchData("/Transacao");
      setTransacoes(data);
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
      setErrorMessage("Erro ao carregar a lista de transações.");
    }
  };

  const handleDelete = async () => {
    try {
      if (selectedTransacao) {
        await fetchData(`/Transacao/${selectedTransacao.id}`, {
          method: "DELETE",
        });
        alert("Transação excluída com sucesso!");
        setShowDeleteModal(false);
        loadTransacoes();
      }
    } catch (error) {
      console.error("Erro ao excluir transação:", error);
      setErrorMessage("Erro ao excluir transação.");
    }
  };

  const rows = transacoes.map((transacao) => [
    transacao.descricao,
    transacao.valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    }),
    transacao.data,
    transacao.tipo,
    <div className="flex space-x-2" key={transacao.id}>
      <Link
        href={`/transacoes/${transacao.id}`}
        className="text-blue-500 hover:underline"
      >
        Detalhes
      </Link>
      <Link
        href={`/transacoes/${transacao.id}/editar`}
        className="text-yellow-500 hover:underline"
      >
        Editar
      </Link>
      <button
        onClick={() => {
          setSelectedTransacao(transacao);
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
      <h1 className="text-2xl font-bold mb-4">Lista de Transações</h1>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <Link
        href="/transacoes/cadastro"
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        Nova Transação
      </Link>
      <DataTable headers={headers} rows={rows} />
      {showDeleteModal && (
        <ConfirmationModal
          message="Tem certeza de que deseja excluir esta transação?"
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}
