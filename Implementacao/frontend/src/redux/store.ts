import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import alunosReducer from "./slices/alunosSlice";
import empresasReducer from "./slices/empresasSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    alunos: alunosReducer,
    empresas: empresasReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

// Tipos para uso no Redux com TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
