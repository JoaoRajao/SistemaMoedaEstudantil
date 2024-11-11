import { Transaction } from "@/types/transaction";
import { formatters } from "@/utils/formatters";

interface TransactionTableProps {
  transactions: Transaction[];
}

export default function TransactionTable({
  transactions,
}: TransactionTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-400">
        <thead className="text-xs uppercase bg-gray-700">
          <tr>
            <th className="px-6 py-3">Data</th>
            <th className="px-6 py-3">Descrição</th>
            <th className="px-6 py-3">Tipo</th>
            <th className="px-6 py-3 text-right">Valor</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr
              key={transaction.id}
              className="border-b bg-gray-800 border-gray-700"
            >
              <td className="px-6 py-4">
                {formatters.date(transaction.createdAt)}
              </td>
              <td className="px-6 py-4">{transaction.description}</td>
              <td className="px-6 py-4">
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    transaction.type === "Crédito"
                      ? "bg-green-900 text-green-300"
                      : "bg-red-900 text-red-300"
                  }`}
                >
                  {transaction.type}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                {formatters.moedas(transaction.valor)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
