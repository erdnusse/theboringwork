import Image from "next/image";

export function MissionStatementSection() {
  return (
        <section className="relative min-h-screen bg-slate-800 text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/mission-hero.png" alt="Mission Hero" fill className="object-cover" priority />
        </div>
        <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <p className="text-orange-400 text-lg sm:text-xl font-medium mb-4 tracking-wide">
                A NOSSA MISSÃO É CLARA
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-8">
                Fazemos o trabalho chato para que se possa focar no mais importante:
              </h1>
              <p className="text-4xl sm:text-5xl lg:text-6xl font-bold text-lime-400">a sua empresa</p>
            </div>
          </div>
        </div>
      </section>
  );
}