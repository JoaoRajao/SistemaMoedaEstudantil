import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProfessores,
  addProfessor,
  getProfessorById,
  updateProfessor,
  deleteProfessor,
} from "../../services/professoresService";

// Estado inicial dos professores
interface ProfessorState {
  professores: Array<{ id: number; nome: string; email: string }>;
  professorAtual: { id: number; nome: string; email: string } | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProfessorState = {
  professores: [],
  professorAtual: null,
  loading: false,
  error: null,
};

// Thunk assíncrono para buscar lista de professores
export const fetchProfessores = createAsyncThunk(
  "professores/fetchProfessores",
  async (_, thunkAPI) => {
    try {
      const response = await getProfessores();
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Thunk para deletar professor
export const deleteProfessorThunk = createAsyncThunk(
  "professores/deleteProfessor",
  async (id: number, thunkAPI) => {
    try {
      await deleteProfessor(id);
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const professoresSlice = createSlice({
  name: "professores",
  initialState,
  reducers: {
    setProfessorAtual: (state, action) => {
      state.professorAtual = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfessores.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfessores.fulfilled, (state, action) => {
        state.loading = false;
        state.professores = action.payload;
      })
      .addCase(fetchProfessores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteProfessorThunk.fulfilled, (state, action) => {
        state.professores = state.professores.filter(
          (professor) => professor.id !== action.payload
        );
      });
  },
});

export const { setProfessorAtual } = professoresSlice.actions;
export default professoresSlice.reducer;
