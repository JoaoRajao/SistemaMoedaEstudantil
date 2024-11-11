import { fetchWithAuth } from "../http-client";
import { EmailNotification } from "@/types/notification";

export const emailService = {
  enviarNotificacao: (data: EmailNotification) =>
    fetchWithAuth("/api/email/enviar", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  enviarCupom: (data: {
    alunoEmail: string;
    empresaEmail: string;
    vantagemId: string;
    codigo: string;
  }) =>
    fetchWithAuth("/api/email/cupom", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};
