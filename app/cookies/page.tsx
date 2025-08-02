export const metadata = {
  title: "Cookies | The Boring Work - Consultoria Empresarial",
  description:
    "Fazemos o trabalho chato para que se possa focar no mais importante: a sua empresa. Especialistas em estruturação e crescimento de PMEs.",
    robots: {
    index: true,
    follow: true,
  }
}

export default function CookiesPage() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-16 bg-white rounded-xl shadow-lg mt-8 mb-16">
      <h1 className="text-3xl font-bold mb-6 text-[#f3864d]">Política de Cookies – The Boring Company</h1>
      <p className="mb-2 text-gray-700">Última atualização: [inserir data]</p>
      <p className="mb-4 text-gray-700">
        A presente Política de Cookies explica o que são cookies, como os utilizamos no nosso website, que tipos de cookies utilizamos, e como pode gerir as suas preferências.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-[#f3864d]">1. O que são Cookies?</h2>
      <p className="mb-4 text-gray-700">
        Cookies são pequenos ficheiros de texto que são armazenados no seu dispositivo (computador, smartphone ou tablet) quando visita um website. Servem para tornar o site mais eficiente, lembrar preferências ou recolher dados estatísticos.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-[#f3864d]">2. Que Tipos de Cookies Utilizamos?</h2>
      <p className="mb-2 text-gray-700 font-semibold">a) Cookies Estritamente Necessários</p>
      <p className="mb-4 text-gray-700">
        Estes cookies são essenciais para o funcionamento do website e não podem ser desativados nos nossos sistemas.<br />
        <span className="italic">Exemplo: cookies de sessão, preferências de privacidade.</span>
      </p>
      <p className="mb-2 text-gray-700 font-semibold">b) Cookies Analíticos/Estatísticos</p>
      <p className="mb-4 text-gray-700">
        Estes cookies ajudam-nos a compreender como os visitantes interagem com o site, permitindo melhorar o desempenho e a experiência de navegação.<br />
        <span className="italic">Ferramenta usada: Google Analytics</span><br />
        Estes cookies só são ativados com o seu consentimento explícito.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-[#f3864d]">3. Cookies Utilizados no Site</h2>
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full text-sm text-left border border-gray-200">
          <thead>
            <tr className="bg-[#f6ede6]">
              <th className="py-2 px-3 border-b">Nome do Cookie</th>
              <th className="py-2 px-3 border-b">Finalidade</th>
              <th className="py-2 px-3 border-b">Duração</th>
              <th className="py-2 px-3 border-b">Tipo</th>
              <th className="py-2 px-3 border-b">Origem</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-3 border-b">_ga</td>
              <td className="py-2 px-3 border-b">Distingue utilizadores</td>
              <td className="py-2 px-3 border-b">2 anos</td>
              <td className="py-2 px-3 border-b">Analítico</td>
              <td className="py-2 px-3 border-b">Google Analytics</td>
            </tr>
            <tr>
              <td className="py-2 px-3 border-b">_ga_XXXXXX</td>
              <td className="py-2 px-3 border-b">Guarda o estado da sessão</td>
              <td className="py-2 px-3 border-b">2 anos</td>
              <td className="py-2 px-3 border-b">Analítico</td>
              <td className="py-2 px-3 border-b">Google Analytics</td>
            </tr>
            <tr>
              <td className="py-2 px-3 border-b">_gid</td>
              <td className="py-2 px-3 border-b">Distingue sessões</td>
              <td className="py-2 px-3 border-b">24 horas</td>
              <td className="py-2 px-3 border-b">Analítico</td>
              <td className="py-2 px-3 border-b">Google Analytics</td>
            </tr>
            <tr>
              <td className="py-2 px-3 border-b">_gat</td>
              <td className="py-2 px-3 border-b">Limita a taxa de pedidos</td>
              <td className="py-2 px-3 border-b">1 minuto</td>
              <td className="py-2 px-3 border-b">Analítico</td>
              <td className="py-2 px-3 border-b">Google Analytics</td>
            </tr>
          </tbody>
        </table>
        <p className="text-xs text-gray-500 mt-2">
          (Estes nomes podem variar consoante a configuração do GA4 ou Universal Analytics)
        </p>
      </div>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-[#f3864d]">4. Consentimento e Gestão de Cookies</h2>
      <p className="mb-4 text-gray-700">
        Ao visitar o nosso site pela primeira vez, será apresentado um banner de cookies que permite:
      </p>
      <ul className="list-disc pl-6 mb-4 text-gray-700">
        <li>Aceitar todos os cookies</li>
        <li>Rejeitar cookies analíticos</li>
        <li>Configurar preferências</li>
      </ul>
      <p className="mb-4 text-gray-700">
        Pode também alterar as suas preferências de cookies a qualquer momento clicando em <span className="font-semibold">[Gerir Cookies]</span> (coloca um link ou botão visível no site).
        <br />
        Além disso, pode configurar o seu navegador para bloquear ou apagar cookies. Note que isso pode afetar o funcionamento do site.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-[#f3864d]">5. Mais Informações</h2>
      <p className="mb-4 text-gray-700">
        Para saber mais sobre como tratamos os seus dados pessoais, consulte a nossa{" "}
        <a href="/privacy" className="text-[#f3864d] underline">Política de Privacidade</a>.
      </p>
      <p className="mb-4 text-gray-700">
        Para mais informações sobre cookies em geral, visite:{" "}
        <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-[#f3864d] underline">
          www.allaboutcookies.org
        </a>
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-[#f3864d]">6. Contacto</h2>
      <p className="mb-4 text-gray-700">
        Se tiver alguma dúvida sobre esta política, pode contactar-nos através de:<br />
        📧 <a href="mailto:info@theboringwork.pt" className="text-[#f3864d] underline">info@theboringwork.pt</a>
      </p>
    </section>
  );
}