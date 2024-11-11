import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  title: string | ReactNode; // Atualizado para aceitar JSX ou string
  actions?: ReactNode;
  backButton?: boolean;
  description?: string;
}

export default function PageContainer({
  children,
  title,
  actions,
}: PageContainerProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-screen bg-gray-900">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          {/* Renderiza o título, seja string ou JSX */}
          {typeof title === "string" ? (
            <h1 className="text-3xl font-bold text-white text-center">
              {title}
            </h1>
          ) : (
            title
          )}
          {actions && <div>{actions}</div>}
        </div>
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg">
          {children}
        </div>
      </div>
    </div>
  );
}
