import { useState } from "react";
import TablePagination from "./TablePagination";
import TableFilters from "./TableFilters";
import TableActions from "./TableActions";

interface DataTableProps<T> {
  data: T[];
  columns: {
    key: keyof T | "actions";
    header: string;
    render?: (item: T) => React.ReactNode;
    sortable?: boolean;
  }[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onView?: (item: T) => void;
  filters?: {
    key: keyof T;
    label: string;
    type: "text" | "select" | "date";
    options?: { label: string; value: string }[];
  }[];
}

export default function DataTable<T extends { id: string | number }>({
  data,
  columns,
  onEdit,
  onDelete,
  onView,
  filters,
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const rowsPerPage = 10;

  const handleSort = (key: keyof T) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    });
  };

  const filteredData = data.filter((item) => {
    return Object.entries(filterValues).every(([key, value]) => {
      if (!value) return true;
      const itemValue = String(item[key as keyof T]).toLowerCase();
      return itemValue.includes(value.toLowerCase());
    });
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const paginatedData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="w-full">
      {filters && (
        <TableFilters
          filters={filters}
          values={filterValues}
          onChange={setFilterValues}
        />
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 text-white">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={`
                    px-4 py-2 text-left bg-gray-900 border-b border-gray-700
                    ${column.sortable ? "cursor-pointer hover:bg-gray-800" : ""}
                  `}
                  onClick={() =>
                    column.sortable && handleSort(column.key as keyof T)
                  }
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.header}</span>
                    {column.sortable && sortConfig.key === column.key && (
                      <span>{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr
                key={item.id}
                className={`
                  border-b border-gray-700 hover:bg-gray-700
                  ${index % 2 === 0 ? "bg-gray-800" : "bg-gray-850"}
                `}
              >
                {columns.map((column) => (
                  <td key={String(column.key)} className="px-4 py-2">
                    {column.key === "actions" ? (
                      <TableActions
                        item={item}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onView={onView}
                      />
                    ) : column.render ? (
                      column.render(item)
                    ) : (
                      String(item[column.key as keyof T])
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <TablePagination
        currentPage={currentPage}
        totalItems={sortedData.length}
        itemsPerPage={rowsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
