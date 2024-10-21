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
      <body className="min-h-screen flex items-center justify-center">
        <Provider store={store}>
          <div className="w-full max-w-lg p-4">{children}</div>
        </Provider>
      </body>
    </html>
  );
}
