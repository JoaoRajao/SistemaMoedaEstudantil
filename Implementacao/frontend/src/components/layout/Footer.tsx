export default function Footer() {
  return (
    <footer className="bg-gray-800 border-t border-gray-700 p-4">
      <div className="container mx-auto text-center text-gray-400">
        <p>© {new Date().getFullYear()} Sistema Moeda Estudantil</p>
      </div>
    </footer>
  );
}
