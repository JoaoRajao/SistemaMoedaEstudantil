interface TableFiltersProps<T> {
  filters: {
    key: keyof T;
    label: string;
    type: "text" | "select" | "date";
    options?: { label: string; value: string }[];
  }[];
  values: Record<string, string>;
  onChange: (values: Record<string, string>) => void;
}

export default function TableFilters<T>({
  filters,
  values,
  onChange,
}: TableFiltersProps<T>) {
  const handleFilterChange = (key: string, value: string) => {
    onChange({ ...values, [key]: value });
  };

  return (
    <div className="mb-4 p-4 bg-gray-800 border border-gray-700 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filters.map((filter) => (
          <div key={String(filter.key)}>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              {filter.label}
            </label>

            {filter.type === "select" ? (
              <select
                value={values[String(filter.key)] || ""}
                onChange={(e) =>
                  handleFilterChange(String(filter.key), e.target.value)
                }
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
              >
                <option value="">Todos</option>
                {filter.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={filter.type}
                value={values[String(filter.key)] || ""}
                onChange={(e) =>
                  handleFilterChange(String(filter.key), e.target.value)
                }
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
                placeholder={`Filtrar por ${filter.label.toLowerCase()}`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
