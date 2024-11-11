export interface ApiResponse<T> {
  totalGasto: number;
  totalRecebido: number;
  saldoAtual: number;
  success: boolean;
  data: T | null;
  error: string | null;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
