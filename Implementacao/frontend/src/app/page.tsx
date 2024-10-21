import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-center">
      <div>
        <h1 className="text-4xl font-bold text-black">
          Bem-vindo ao Sistema de Gerenciamento
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Escolha uma das opções abaixo para começar:
        </p>
        <div className="mt-6 space-x-4">
          <Link href="/login">
            <Button className="bg-black text-white">Login</Button>
          </Link>
          <Link href="/dashboard">
            <Button className="bg-black text-white">Dashboard</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
