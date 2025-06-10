import { ArrowRight, Users, Clock, Zap, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export const metadata = {
  title: "Home | The Boring Work",
  description: "Fazemos o trabalho chato para que se possa focar no mais importante: a sua empresa",
}

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-orange-50 via-lime-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-lime-400/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 -left-32 w-80 h-80 bg-orange-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 right-1/3 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-6">
                <div className="inline-block">
                  <span className="text-6xl md:text-7xl font-black text-gray-900 leading-none">the</span>
                  <br />
                  <span className="text-6xl md:text-8xl font-black text-gray-900 leading-none">BOR!NG</span>
                  <br />
                  <span className="text-6xl md:text-8xl font-black text-orange-500 leading-none">WORK</span>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
                    Fazemos o trabalho chato para que se possa focar no{" "}
                    <span className="text-purple-600">mais importante</span>
                  </h2>
                  <p className="text-xl text-gray-600 font-medium">A sua empresa</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold px-8 py-4 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Começar Agora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-purple-500 text-purple-600 hover:bg-purple-50 font-bold px-8 py-4 text-lg rounded-2xl"
                >
                  Saber Mais
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-[600px]">
                <img
                  src="/main.png"
                  alt="The Boring Work - Modern Business Solutions"
                  className="w-full h-auto rounded-3xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-lime-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-orange-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
          <div className="text-center space-y-8">
            <div className="inline-block bg-lime-400/20 px-6 py-3 rounded-full">
              <span className="text-lime-300 font-bold text-lg">A NOSSA MISSÃO É CLARA</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-black leading-tight">
              Especialistas na
              <br />
              <span className="text-lime-400">estruturação do caos</span>
            </h2>

            <p className="text-xl md:text-2xl text-purple-100 max-w-4xl mx-auto leading-relaxed">
              Somos uma marca de consultoria empresarial especializada na estruturação e crescimento de PMEs, com
              soluções adaptáveis a diversos setores.
            </p>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-20 bg-gradient-to-br from-lime-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Vantagens de contar
              <br />
              com a nossa <span className="text-lime-500">equipa</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Estamos alinhados com os seus objetivos e garantimos que o trabalho é feito de acordo com os seus moldes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Advantage 1 */}
            <Card className="bg-gradient-to-br from-orange-400 to-orange-500 border-0 rounded-3xl overflow-hidden group hover:scale-105 transition-all duration-300 shadow-xl">
              <CardContent className="p-8 text-white relative">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
                <div className="relative z-10">
                  <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-4xl font-black mb-2">01</div>
                  <h3 className="text-2xl font-bold mb-4">Atuamos como uma extensão da empresa</h3>
                  <p className="text-orange-100 leading-relaxed">
                    A nossa equipa garante um apoio na gestão administrativa, gestão de projetos, organização
                    contabilística, etc.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Advantage 2 */}
            <Card className="bg-gradient-to-br from-lime-400 to-lime-500 border-0 rounded-3xl overflow-hidden group hover:scale-105 transition-all duration-300 shadow-xl">
              <CardContent className="p-8 text-white relative">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
                <div className="relative z-10">
                  <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-4xl font-black mb-2">02</div>
                  <h3 className="text-2xl font-bold mb-4">Apoiamos em todos os desafios</h3>
                  <p className="text-lime-100 leading-relaxed">
                    Com o nosso serviço, pode crescer o seu negócio sem ter necessidade de contratar recursos internos
                    para a sua equipa.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Advantage 3 */}
            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 border-0 rounded-3xl overflow-hidden group hover:scale-105 transition-all duration-300 shadow-xl">
              <CardContent className="p-8 text-white relative">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
                <div className="relative z-10">
                  <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                    <Clock className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-4xl font-black mb-2">03</div>
                  <h3 className="text-2xl font-bold mb-4">Poupamos-lhe tempo e recursos</h3>
                  <p className="text-purple-100 leading-relaxed">
                    Focamos no trabalho administrativo para que se possa concentrar no crescimento e estratégia do seu
                    negócio.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-lime-400/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-orange-400/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Entregamos <span className="text-lime-400">valor</span> e <span className="text-orange-400">clareza</span>
              ,<br />
              no meio do caos
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-orange-400 to-orange-500 w-32 h-32 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-4xl font-black text-white">€</span>
              </div>
              <div className="text-6xl md:text-7xl font-black text-orange-400 mb-2">80.000€</div>
              <p className="text-xl text-gray-300 font-medium">
                Valor poupado pelos nossos clientes ao delegar funções na nossa equipa
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-lime-400 to-lime-500 w-32 h-32 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-16 w-16 text-white" />
              </div>
              <div className="text-6xl md:text-7xl font-black text-lime-400 mb-2">500H</div>
              <p className="text-xl text-gray-300 font-medium">Salvas em trabalho burocrático e administrativo</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-orange-50 to-lime-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-lime-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
          <div className="text-center space-y-8">
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight">
              Pronto para <span className="text-purple-600">organizar</span>
              <br />o seu <span className="text-orange-500">negócio</span>?
            </h2>

            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Ajudamos todo o tipo de PMEs a organizar processos e consolidar vendas. Mais do que consultoria,
              entregamos acompanhamento próximo e resultados sustentáveis.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold px-12 py-6 text-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Começar Hoje
                <Zap className="ml-3 h-6 w-6" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50 font-bold px-12 py-6 text-xl rounded-3xl"
              >
                Agendar Consulta
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
