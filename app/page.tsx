import { ArrowRight, Users, Clock, Zap, Target, CheckCircle, Star, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import BaseSection from "@/components/base-section"


export const metadata = {
  title: "Home | The Boring Work - Consultoria Empresarial",
  description:
    "Fazemos o trabalho chato para que se possa focar no mais importante: a sua empresa. Especialistas em estruturação e crescimento de PMEs.",
    robots: {
    index: true,
    follow: true,
  }
}

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[--background-primary-color] overflow-hidden">

         {/* Hero Section */}
      <BaseSection/>

      {/* Mission Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-lime-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-orange-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
          <div className="text-center space-y-12">
            <div className="animate-fade-in">
              <Badge className="bg-lime-400/20 text-lime-300 hover:bg-lime-400/30 border-lime-400/30 px-6 py-3 text-base font-semibold">
                A NOSSA MISSÃO É CLARA
              </Badge>
            </div>

            <div className="space-y-8 animate-slide-up delay-200">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
                Especialistas na
                <br />
                <span className="bg-gradient-to-r from-lime-400 to-lime-500 bg-clip-text text-transparent">estruturação do caos</span>
              </h2>

              <p className="text-xl md:text-2xl text-purple-100 max-w-4xl mx-auto leading-relaxed font-light">
                Somos uma marca de consultoria empresarial especializada na estruturação e crescimento de PMEs, 
                com mais de 8 anos de experiência e soluções adaptáveis a diversos setores.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 animate-slide-up delay-400">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-lime-400 to-lime-500 rounded-2xl flex items-center justify-center mx-auto">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold">PMEs Estruturadas</h3>
                <p className="text-purple-200">Organizamos processos e consolidamos vendas</p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold">Foco no Crescimento</h3>
                <p className="text-purple-200">Estratégias práticas para expansão sustentável</p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold">Resultados Rápidos</h3>
                <p className="text-purple-200">Implementação eficiente e acompanhamento próximo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section id="services" className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-20 animate-fade-in">
            <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 mb-6 px-4 py-2 text-sm font-semibold">
              VANTAGENS COMPETITIVAS
            </Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-8 leading-tight">
              Vantagens de contar
              <br />
              com a nossa <span className="bg-gradient-to-r from-lime-500 to-lime-600 bg-clip-text text-transparent">equipa</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Estamos alinhados com os seus objetivos e garantimos que o trabalho é feito de acordo com os seus moldes, 
              proporcionando uma extensão natural da sua empresa.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Advantage 1 */}
            <Card className="group bg-gradient-to-br from-orange-400 to-orange-500 border-0 rounded-3xl overflow-hidden hover:scale-105 transition-all duration-500 shadow-xl hover:shadow-2xl animate-slide-up">
              <CardContent className="p-10 text-white relative">
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-white/10 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white/5 rounded-full"></div>
                <div className="relative z-10 space-y-6">
                  <div className="bg-white/20 w-20 h-20 rounded-3xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                  <div className="text-5xl font-black mb-4 text-white/90">01</div>
                  <h3 className="text-2xl lg:text-3xl font-bold mb-6 leading-tight">Extensão da sua empresa</h3>
                  <p className="text-orange-100 leading-relaxed text-lg">
                    A nossa equipa integra-se perfeitamente nos seus processos, oferecendo apoio especializado em gestão administrativa, 
                    projetos e organização contabilística.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Advantage 2 */}
            <Card className="group bg-gradient-to-br from-lime-400 to-lime-500 border-0 rounded-3xl overflow-hidden hover:scale-105 transition-all duration-500 shadow-xl hover:shadow-2xl animate-slide-up delay-200">
              <CardContent className="p-10 text-white relative">
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-white/10 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white/5 rounded-full"></div>
                <div className="relative z-10 space-y-6">
                  <div className="bg-white/20 w-20 h-20 rounded-3xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                    <Target className="h-10 w-10 text-white" />
                  </div>
                  <div className="text-5xl font-black mb-4 text-white/90">02</div>
                  <h3 className="text-2xl lg:text-3xl font-bold mb-6 leading-tight">Apoio em todos os desafios</h3>
                  <p className="text-lime-100 leading-relaxed text-lg">
                    Crescimento sustentável sem necessidade de contratar recursos internos. Escalamos consoante as suas necessidades 
                    e objetivos empresariais.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Advantage 3 */}
            <Card className="group bg-gradient-to-br from-purple-500 to-purple-600 border-0 rounded-3xl overflow-hidden hover:scale-105 transition-all duration-500 shadow-xl hover:shadow-2xl animate-slide-up delay-400">
              <CardContent className="p-10 text-white relative">
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-white/10 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white/5 rounded-full"></div>
                <div className="relative z-10 space-y-6">
                  <div className="bg-white/20 w-20 h-20 rounded-3xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                    <Clock className="h-10 w-10 text-white" />
                  </div>
                  <div className="text-5xl font-black mb-4 text-white/90">03</div>
                  <h3 className="text-2xl lg:text-3xl font-bold mb-6 leading-tight">Tempo e recursos otimizados</h3>
                  <p className="text-purple-100 leading-relaxed text-lg">
                    Libertamos o seu tempo para se focar na estratégia e crescimento, enquanto gerimos eficientemente 
                    todo o trabalho administrativo e operacional.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-lime-400/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-orange-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
          <div className="text-center mb-20 animate-fade-in">
            <Badge className="bg-orange-400/20 text-orange-300 hover:bg-orange-400/30 border-orange-400/30 mb-6 px-4 py-2 text-sm font-semibold">
              RESULTADOS COMPROVADOS
            </Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight">
              Entregamos <span className="bg-gradient-to-r from-lime-400 to-lime-500 bg-clip-text text-transparent">valor</span> e{" "}
              <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">clareza</span>,
              <br />
              no meio do caos
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Mais do que consultoria, entregamos acompanhamento próximo, soluções à medida e resultados sustentáveis 
              que transformam a forma como gere o seu negócio.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
            <div className="text-center group animate-slide-up">
              <div className="relative mb-8">
                <div className="bg-gradient-to-br from-orange-400 to-orange-500 w-40 h-40 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                  <span className="text-5xl font-black text-white">€</span>
                </div>
                <div className="absolute -inset-4 bg-gradient-to-br from-orange-400/20 to-orange-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="text-6xl md:text-7xl lg:text-8xl font-black bg-gradient-to-br from-orange-400 to-orange-500 bg-clip-text text-transparent mb-4">
                80.000€
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Valor Poupado</h3>
              <p className="text-lg text-gray-300 font-medium leading-relaxed max-w-sm mx-auto">
                Valor total poupado pelos nossos clientes ao delegar funções administrativas na nossa equipa especializada
              </p>
            </div>

            <div className="text-center group animate-slide-up delay-200">
              <div className="relative mb-8">
                <div className="bg-gradient-to-br from-lime-400 to-lime-500 w-40 h-40 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                  <Clock className="h-20 w-20 text-white" />
                </div>
                <div className="absolute -inset-4 bg-gradient-to-br from-lime-400/20 to-lime-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="text-6xl md:text-7xl lg:text-8xl font-black bg-gradient-to-br from-lime-400 to-lime-500 bg-clip-text text-transparent mb-4">
                500H
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Horas Otimizadas</h3>
              <p className="text-lg text-gray-300 font-medium leading-relaxed max-w-sm mx-auto">
                Horas de trabalho burocrático e administrativo poupadas, permitindo foco total na estratégia empresarial
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-white via-orange-50/30 to-purple-50/30 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-lime-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
          <div className="text-center space-y-12">
            <div className="animate-fade-in">
              <Badge className="bg-gradient-to-r from-purple-100 to-orange-100 text-purple-800 hover:from-purple-200 hover:to-orange-200 mb-6 px-4 py-2 text-sm font-semibold border-0">
                TRANSFORME O SEU NEGÓCIO
              </Badge>
            </div>

            <div className="space-y-8 animate-slide-up delay-200">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
                Pronto para <span className="bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">organizar</span>
                <br />o seu <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">negócio</span>?
              </h2>

              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Ajudamos todo o tipo de PMEs a organizar processos e consolidar vendas. 
                Comece hoje a transformação que o seu negócio merece.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8 animate-slide-up delay-400">
              <Button
                size="lg"
                className="group bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold px-12 py-6 text-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                Começar Hoje
                <Zap className="ml-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="group border-2 border-orange-200 text-orange-700 hover:bg-orange-50 hover:border-orange-300 font-semibold px-12 py-6 text-xl rounded-3xl transition-all duration-300"
              >
                Agendar Consulta
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 animate-slide-up delay-600">
              <div className="flex items-center justify-center space-x-3 text-gray-600">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <span className="font-medium">Consulta Gratuita</span>
              </div>
              <div className="flex items-center justify-center space-x-3 text-gray-600">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <span className="font-medium">Sem Compromisso</span>
              </div>
              <div className="flex items-center justify-center space-x-3 text-gray-600">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <span className="font-medium">Resultados Garantidos</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
