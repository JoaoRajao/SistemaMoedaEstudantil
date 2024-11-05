"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DataTable from "../../components/tables/DataTable";
import ConfirmationModal from "../../components/modals/ConfirmationModal";
import { fetchData } from "../../services/apiService";

interface Aluno {
  id: string;
  nome: string;
  curso: string;
  instituicao: string;
  cpf: string;
  rg: string;
  endereco: string;
  rendimento: string;
}

export default function AlunosList() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [selectedAluno, setSelectedAluno] = useState<Aluno | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const headers = ["Nome", "Curso", "Instituição", "Ações"];

  useEffect(() => {
    loadAlunos();
  }, []);

  const loadAlunos = async () => {
    try {
      const data = await fetchData("/Aluno/todos");
      setAlunos(data);
    } catch (error) {
      console.error("Erro ao buscar alunos:", error);
      setErrorMessage("Erro ao carregar a lista de alunos.");
    }
  };

  const handleDelete = async () => {
    try {
      if (selectedAluno) {
        await fetchData(`/Aluno/${selectedAluno.id}`, {
          method: "DELETE",
        });
        alert("Aluno excluído com sucesso!");
        setShowDeleteModal(false);
        loadAlunos(); // Recarrega a lista de alunos
      }
    } catch (error) {
      console.error("Erro ao excluir aluno:", error);
      setErrorMessage("Erro ao excluir aluno.");
    }
  };

  const rows = alunos.map((aluno) => [
    aluno.nome,
    aluno.curso,
    aluno.instituicao,
    <div className="flex space-x-2" key={aluno.id}>
      <Link
        href={`/alunos/${aluno.id}`}
        className="text-blue-500 hover:underline"
      >
        Detalhes
      </Link>
      <Link
        href={`/alunos/${aluno.id}/editar`}
        className="text-yellow-500 hover:underline"
      >
        Editar
      </Link>
      <button
        onClick={() => {
          setSelectedAluno(aluno);
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
      <h1 className="text-2xl font-bold mb-4">Lista de Alunos</h1>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <Link
        href="/alunos/cadastro"
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        Novo Aluno
      </Link>
      <DataTable headers={headers} rows={rows} />
      {showDeleteModal && (
        <ConfirmationModal
          message="Tem certeza de que deseja excluir este aluno?"
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}
