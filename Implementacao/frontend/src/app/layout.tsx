import "../styles/globals.css";
import { Metadata } from "next";
import { AuthProvider } from "../contexts/AuthContext";
import { LoadingProvider } from "../contexts/LoadingContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FeedbackProvider from "../components/feedback/FeedbackProvider";

export const metadata: Metadata = {
  title: "Sistema de Moeda Estudantil",
  description: "Plataforma de reconhecimento e recompensas acadêmicas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
        <AuthProvider>
          <LoadingProvider>
            <FeedbackProvider>
              <div className="flex-grow flex flex-col">{children}</div>
              <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
              />
            </FeedbackProvider>
          </LoadingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
