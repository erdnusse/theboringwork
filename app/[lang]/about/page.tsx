export const metadata = {
  title: "Sobre | The Boring Work - Consultoria Empresarial",
  description:
    "Fazemos o trabalho chato para que se possa focar no mais importante: a sua empresa. Especialistas em estruturação e crescimento de PMEs.",
    robots: {
    index: true,
    follow: true,
  }
}

export default function TemporaryPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white rounded-xl shadow-lg p-10 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-900">Página Temporária</h1>
        <p className="text-gray-700 mb-6">
          Esta página está em construção.<br />
          Por favor, volte mais tarde!
        </p>
        <span className="text-sm text-gray-400">© {new Date().getFullYear()} Rita Barrela</span>
      </div>
    </div>
  );
}