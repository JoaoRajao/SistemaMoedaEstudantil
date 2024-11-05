import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { AuthProvider } from "../contexts/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-900 text-white">
        <AuthProvider>
          <div className="flex min-h-screen">
            <div className="border-r border-gray-700">
              <Sidebar /> {/* Sidebar fixa à esquerda */}
            </div>
            <div className="flex-1 flex flex-col ml-64 border-l border-gray-700">
              <Navbar /> {/* Cabeçalho */}
              <main className="flex-1 flex items-center justify-center p-8 border-t border-gray-700">
                {children}
              </main>
              <div className="border-t border-gray-700">
                <Footer /> {/* Rodapé com borda superior */}
              </div>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
