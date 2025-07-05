"use client"
import Image from "next/image"
import SplitText from "@/components/SplitText/SplitText"
import AnimatedBackground from "@/components/animated-background"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { ArrowRight, Target, Zap, Users } from "lucide-react"

export default function MissionSection() {
  const { elementRef: sectionRef, isVisible: sectionVisible } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "-100px",
  })

  const { elementRef: logoRef, isVisible: logoVisible } = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: "-50px",
  })

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8 lg:space-y-12">
            {/* Mission Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-400/10 border border-orange-400/20 rounded-full backdrop-blur-sm"
              style={{
                opacity: sectionVisible ? 1 : 0,
                transform: `translateY(${sectionVisible ? 0 : 30}px)`,
                transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s",
              }}
            >
              <Target className="w-4 h-4 text-orange-400" />
              <span className="text-orange-400 text-sm lg:text-base font-medium tracking-wide uppercase">
                A nossa missão é clara
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-white">
                <div
                  style={{
                    opacity: sectionVisible ? 1 : 0,
                    transform: `translateY(${sectionVisible ? 0 : 40}px)`,
                    transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s",
                  }}
                >
                  Fazemos o trabalho chato para que se possa focar no mais importante:
                </div>
                <div className="mt-4">
                  <SplitText
                    text="a sua empresa"
                    className="bg-gradient-to-r from-lime-400 via-lime-300 to-lime-500 bg-clip-text text-transparent font-extrabold"
                    delay={80}
                    duration={0.8}
                    splitType="chars"
                    from={{ opacity: 0, y: 50, scale: 0.8 }}
                    to={{ opacity: 1, y: 0, scale: 1 }}
                    threshold={0.1}
                    rootMargin="-50px"
                  />
                </div>
              </h1>
            </div>

          

           
          </div>

          {/* Right Content - Logo with Animations */}
          <div className="relative flex justify-center lg:justify-end">
            <div
              ref={logoRef}
              className="relative"
              style={{
                opacity: logoVisible ? 1 : 0,
                transform: `scale(${logoVisible ? 1 : 0.8}) translateY(${logoVisible ? 0 : 50}px)`,
                transition: "all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s",
              }}
            >
              {/* Decorative Ring */}
              <div className="absolute inset-0 -m-8 border-2 border-lime-400/20 rounded-full animate-spin-slow" />
              <div className="absolute inset-0 -m-12 border border-purple-500/20 rounded-full animate-pulse" />

              {/* Floating Particles */}
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-lime-400 rounded-full animate-ping"
                  style={{
                    top: `${20 + Math.sin((i * 45 * Math.PI) / 180) * 40}%`,
                    left: `${50 + Math.cos((i * 45 * Math.PI) / 180) * 40}%`,
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: `${2 + i * 0.1}s`,
                  }}
                />
              ))}

              {/* Main Logo */}
              <div className="relative z-10 p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-500">
                <Image
                  src="/rita-barrela-logo-16.png"
                  alt="Rita Barrela - Fazemos o trabalho chato para que se possa focar no mais importante"
                  width={400}
                  height={300}
                  className="w-full h-auto max-w-sm lg:max-w-md object-contain filter drop-shadow-2xl"
                  priority
                />
              </div>

              {/* Sound Waves Animation */}
              <div className="absolute top-1/2 right-0 transform translate-x-8 -translate-y-1/2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-8 bg-lime-400/30 rounded-full animate-pulse"
                    style={{
                      left: `${i * 8}px`,
                      height: `${20 + i * 10}px`,
                      animationDelay: `${i * 0.1}s`,
                      animationDuration: `${1 + i * 0.2}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
    </section>
  )
}
