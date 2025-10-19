export const metadata = {
  title: "Termos e Condições | The Boring Work - Consultoria Empresarial",
  description:
    "Fazemos o trabalho chato para que se possa focar no mais importante: a sua empresa. Especialistas em estruturação e crescimento de PMEs.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-16 bg-white rounded-xl shadow-lg mt-14 mb-16">
      <h1 className="text-3xl font-bold mb-6 text-[#f3864d]">Termos e Condições de Utilização – The Boring Company</h1>
      <p className="mb-2 text-gray-700">Última atualização: 23 Julho 2025</p>
      <p className="mb-4 text-gray-700">
        Estes Termos e Condições regulam o acesso e a utilização do website da The Boring Company. Ao aceder ou utilizar o nosso site, concorda com estes termos. Se não concordar, por favor não utilize o website.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-[#f3864d]">1. Propriedade do Site</h2>
      <p className="mb-4 text-gray-700">
        O website e todos os seus conteúdos são propriedade da The Boring Company, salvo indicação em contrário. É proibida a reprodução, distribuição, modificação ou utilização dos conteúdos sem autorização prévia e por escrito.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-[#f3864d]">2. Utilização do Website</h2>
      <ul className="list-disc pl-6 mb-4 text-gray-700">
        <li>O utilizador compromete-se a utilizar o site de forma responsável, sem práticas ilícitas ou que possam prejudicar terceiros ou a The Boring Company.</li>
        <li>Não é permitido tentar aceder a áreas restritas, sistemas informáticos ou informações confidenciais sem autorização.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-[#f3864d]">3. Informação e Conteúdos</h2>
      <p className="mb-4 text-gray-700">
        A The Boring Company procura garantir que toda a informação apresentada no site é precisa e atualizada. No entanto, não garante a ausência de erros ou omissões e reserva-se o direito de alterar conteúdos a qualquer momento, sem aviso prévio.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-[#f3864d]">4. Responsabilidade</h2>
      <p className="mb-4 text-gray-700">
        A The Boring Company não se responsabiliza por danos diretos ou indiretos resultantes da utilização do site, incluindo interrupções, vírus ou outros problemas informáticos.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-[#f3864d]">5. Links para Terceiros</h2>
      <p className="mb-4 text-gray-700">
        O website pode conter links para sites de terceiros. A The Boring Company não se responsabiliza pelo conteúdo, políticas de privacidade ou práticas desses sites.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-[#f3864d]">6. Proteção de Dados</h2>
      <p className="mb-4 text-gray-700">
        O tratamento de dados pessoais é realizado de acordo com a nossa <a href="/privacy" className="text-[#f3864d] underline">Política de Privacidade</a>. Recomendamos a leitura atenta desse documento.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-[#f3864d]">7. Alterações aos Termos</h2>
      <p className="mb-4 text-gray-700">
        A The Boring Company reserva-se o direito de alterar estes Termos e Condições a qualquer momento. As alterações entram em vigor após a sua publicação no site. Recomendamos a consulta regular desta página.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-[#f3864d]">8. Lei Aplicável e Foro</h2>
      <p className="mb-4 text-gray-700">
        Estes Termos e Condições são regidos pela lei portuguesa. Em caso de litígio, as partes aceitam submeter-se ao foro da comarca de Lisboa, com expressa renúncia a qualquer outro.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-[#f3864d]">9. Contacto</h2>
      <p className="mb-4 text-gray-700">
        Para esclarecimentos ou questões relacionadas com estes Termos e Condições, contacte-nos através do email: <a href="mailto:info@theboringwork.pt" className="text-[#f3864d] underline">info@theboringwork.pt</a>
      </p>
    </section>
  );
}