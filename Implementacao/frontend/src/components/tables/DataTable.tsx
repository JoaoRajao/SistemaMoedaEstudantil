// src/components/tables/DataTable.tsx
import React, { useState } from "react";

interface DataTableProps {
  headers: string[];
  rows: React.ReactNode[][];
}

export default function DataTable({ headers, rows }: DataTableProps) {
  const [sortColumn, setSortColumn] = useState<number | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const rowsPerPage = 5;

  const filteredRows = rows.filter((row) =>
    row.some((cell) =>
      (cell ?? "").toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const sortedRows = [...filteredRows].sort((a, b) => {
    if (sortColumn === null) return 0;
    const compareA = a[sortColumn] as string;
    const compareB = b[sortColumn] as string;
    return (compareA < compareB ? -1 : 1) * (sortDirection === "asc" ? 1 : -1);
  });

  const paginatedRows = sortedRows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleSort = (index: number) => {
    if (sortColumn === index) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(index);
      setSortDirection("asc");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Pesquisar..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 p-2 border border-gray-700 bg-gray-800 text-white rounded"
      />
      <table className="min-w-full bg-gray-800 border border-gray-700 text-white">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="p-2 border-b border-gray-700 bg-gray-900 text-left text-gray-300 cursor-pointer"
                onClick={() => handleSort(index)}
                scope="col"
              >
                {header}{" "}
                {sortColumn === index && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedRows.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-700 transition-colors">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="p-2 border-b border-gray-700">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end space-x-2 mt-2">
        <button
          onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span>Página {currentPage}</span>
        <button
          onClick={() => setCurrentPage((page) => page + 1)}
          disabled={currentPage * rowsPerPage >= filteredRows.length}
          className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
        >
          Próxima
        </button>
      </div>
    </div>
  );
}
