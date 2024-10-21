"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen">
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
