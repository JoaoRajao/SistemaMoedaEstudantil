import React from "react";
import "../styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ModeToggle";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { AlunosProvider } from "@/context/Aluno";
import { ProfessorProvider } from "@/context/Professor";
import { EmpresaProvider } from "@/context/Empresa"; // Importando EmpresaProvider

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className="min-h-screen flex bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AlunosProvider>
            <ProfessorProvider>
              <EmpresaProvider>
                {" "}
                {/* Envolvendo com EmpresaProvider */}
                <SidebarProvider defaultOpen={true}>
                  <AppSidebar />
                  <div className="flex flex-col flex-1">
                    <main className="container mx-auto p-6 bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] rounded-lg shadow-lg flex-1 my-8">
                      <div className="flex items-center space-x-4 mb-4">
                        <SidebarTrigger />
                        <ModeToggle />
                      </div>
                      {children}
                    </main>
                    <footer className="bg-[hsl(var(--background))] text-[hsl(var(--foreground))] p-6 text-center shadow-md">
                      <p>
                        © {new Date().getFullYear()} Sistema de Mérito Acadêmico
                      </p>
                    </footer>
                  </div>
                </SidebarProvider>
              </EmpresaProvider>
            </ProfessorProvider>
          </AlunosProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
