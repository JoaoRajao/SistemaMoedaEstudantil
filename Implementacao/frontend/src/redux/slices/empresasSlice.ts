// src/redux/slices/empresasSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getEmpresas,
  addEmpresa,
  getEmpresaById,
  updateEmpresa,
  deleteEmpresa,
} from "../../services/empresasService";

// Estado inicial das empresas
interface EmpresaState {
  empresas: Array<{ id: number; nomeEmpresa: string; contato: string }>;
  empresaAtual: { id: number; nomeEmpresa: string; contato: string } | null;
  loading: boolean;
  error: string | null;
}

const initialState: EmpresaState = {
  empresas: [],
  empresaAtual: null,
  loading: false,
  error: null,
};

// Thunk assíncrono para buscar lista de empresas
export const fetchEmpresas = createAsyncThunk(
  "empresas/fetchEmpresas",
  async (_, thunkAPI) => {
    try {
      const response = await getEmpresas();
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Slice de empresas
const empresasSlice = createSlice({
  name: "empresas",
  initialState,
  reducers: {
    setEmpresaAtual: (state, action) => {
      state.empresaAtual = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmpresas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmpresas.fulfilled, (state, action) => {
        state.loading = false;
        state.empresas = action.payload;
      })
      .addCase(fetchEmpresas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setEmpresaAtual } = empresasSlice.actions;
export default empresasSlice.reducer;
