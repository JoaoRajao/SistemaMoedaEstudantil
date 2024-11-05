"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DataTable from "../../components/tables/DataTable";
import ConfirmationModal from "../../components/modals/ConfirmationModal";
import { fetchData } from "../../services/apiService";

interface Professor {
  id: string;
  nome: string;
  disciplina: string;
  instituicao: string;
  cpf: string;
  rg: string;
  endereco: string;
  salario: string;
}

export default function ProfessoresList() {
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [selectedProfessor, setSelectedProfessor] = useState<Professor | null>(
    null
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const headers = ["Nome", "Disciplina", "Instituição", "Ações"];

  useEffect(() => {
    loadProfessores();
  }, []);

  const loadProfessores = async () => {
    try {
      const data = await fetchData("/Professor/todos");
      setProfessores(data);
    } catch (error) {
      console.error("Erro ao buscar professores:", error);
      setErrorMessage("Erro ao carregar a lista de professores.");
    }
  };

  const handleDelete = async () => {
    try {
      if (selectedProfessor) {
        await fetchData(`/Professor/${selectedProfessor.id}`, {
          method: "DELETE",
        });
        alert("Professor excluído com sucesso!");
        setShowDeleteModal(false);
        loadProfessores();
      }
    } catch (error) {
      console.error("Erro ao excluir professor:", error);
      setErrorMessage("Erro ao excluir professor.");
    }
  };

  const rows = professores.map((professor) => [
    professor.nome,
    professor.disciplina,
    professor.instituicao,
    <div className="flex space-x-2" key={professor.id}>
      <Link
        href={`/professores/${professor.id}`}
        className="text-blue-500 hover:underline"
      >
        Detalhes
      </Link>
      <Link
        href={`/professores/${professor.id}/editar`}
        className="text-yellow-500 hover:underline"
      >
        Editar
      </Link>
      <button
        onClick={() => {
          setSelectedProfessor(professor);
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
      <h1 className="text-2xl font-bold mb-4">Lista de Professores</h1>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <Link
        href="/professores/cadastro"
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        Novo Professor
      </Link>
      <DataTable headers={headers} rows={rows} />
      {showDeleteModal && (
        <ConfirmationModal
          message="Tem certeza de que deseja excluir este professor?"
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}
