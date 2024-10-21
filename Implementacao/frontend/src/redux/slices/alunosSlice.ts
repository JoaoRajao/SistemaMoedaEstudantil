import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAlunos,
  addAluno,
  getAlunoById,
  updateAluno,
  deleteAluno,
} from "../../services/alunosService";

// Estado inicial dos alunos
interface AlunoState {
  alunos: Array<{ id: number; nome: string; email: string; curso: string }>;
  alunoAtual: { id: number; nome: string; email: string; curso: string } | null;
  loading: boolean;
  error: string | null;
}

const initialState: AlunoState = {
  alunos: [],
  alunoAtual: null,
  loading: false,
  error: null,
};

// Thunk assíncrono para buscar lista de alunos
export const fetchAlunos = createAsyncThunk(
  "alunos/fetchAlunos",
  async (_, thunkAPI) => {
    try {
      const response = await getAlunos();
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Thunk para deletar aluno
export const deleteAlunoThunk = createAsyncThunk(
  "alunos/deleteAluno",
  async (id: number, thunkAPI) => {
    try {
      await deleteAluno(id);
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const alunosSlice = createSlice({
  name: "alunos",
  initialState,
  reducers: {
    setAlunoAtual: (state, action) => {
      state.alunoAtual = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlunos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAlunos.fulfilled, (state, action) => {
        state.loading = false;
        state.alunos = action.payload;
      })
      .addCase(fetchAlunos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteAlunoThunk.fulfilled, (state, action) => {
        state.alunos = state.alunos.filter(
          (aluno) => aluno.id !== action.payload
        );
      });
  },
});

export const { setAlunoAtual } = alunosSlice.actions;
export default alunosSlice.reducer;