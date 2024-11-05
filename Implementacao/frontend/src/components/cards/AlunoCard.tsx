// src/components/cards/AlunoCard.tsx
interface AlunoCardProps {
  name: string;
  course: string;
  institution: string;
  email?: string;
  saldoMoedas?: number;
}

export default function AlunoCard({
  name,
  course,
  institution,
  email,
  saldoMoedas,
}: AlunoCardProps) {
  return (
    <div className="border border-gray-700 p-4 rounded bg-gray-800 shadow-sm text-white">
      <h2 className="text-lg font-bold">{name}</h2>
      <p className="text-sm text-gray-300">{course}</p>
      <p className="text-sm text-gray-500">{institution}</p>
      {email && <p className="text-sm text-gray-500">Email: {email}</p>}
      {saldoMoedas !== undefined && (
        <p className="text-sm text-gray-500">Saldo: {saldoMoedas} Moedas</p>
      )}
    </div>
  );
}
