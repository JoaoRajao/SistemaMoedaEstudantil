interface EmpresaCardProps {
  name: string;
  cnpj: string;
  address: string;
  sector: string;
}

export default function EmpresaCard({
  name,
  cnpj,
  address,
  sector,
}: EmpresaCardProps) {
  return (
    <div className="border border-gray-700 p-4 rounded bg-gray-800 shadow-sm text-white">
      <h2 className="text-lg font-bold">{name}</h2>
      <p className="text-sm text-gray-300">CNPJ: {cnpj}</p>
      <p className="text-sm text-gray-500">Endereço: {address}</p>
      <p className="text-sm text-gray-500">Setor: {sector}</p>
    </div>
  );
}
