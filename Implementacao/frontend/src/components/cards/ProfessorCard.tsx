interface ProfessorCardProps {
  name: string;
  discipline: string;
  institution: string;
  cpf?: string;
  rg?: string;
  address?: string;
  salary?: string;
}

export default function ProfessorCard({
  name,
  discipline,
  institution,
  cpf,
  rg,
  address,
  salary,
}: ProfessorCardProps) {
  return (
    <div className="border border-gray-700 p-4 rounded bg-gray-800 shadow-sm text-white">
      <h2 className="text-lg font-bold">{name}</h2>
      <p className="text-sm text-gray-300">Disciplina: {discipline}</p>
      <p className="text-sm text-gray-500">Instituição: {institution}</p>
      {cpf && <p className="text-sm text-gray-500">CPF: {cpf}</p>}
      {rg && <p className="text-sm text-gray-500">RG: {rg}</p>}
      {address && <p className="text-sm text-gray-500">Endereço: {address}</p>}
      {salary && <p className="text-sm text-gray-500">Salário: {salary}</p>}
    </div>
  );
}
