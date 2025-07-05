"use client";
import Image from "next/image";
import SplitText from "@/components/SplitText/SplitText";
import AnimatedBackground from "./animated-background";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

export default function MissionSection() {
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

   const { elementRef: logoRef, isVisible: logoVisible } = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: "-50px",
  })
  return (
    <section className="relative min-h-screen bg-[--background-secondary-color] overflow-hidden">
        <AnimatedBackground />
      {/* Background Pattern/Texture */}
      <div className="absolute inset-0" />

      <div className="relative z-10 container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Mission Statement */}

            <div className="space-y-6">
              <p className="text-orange-400 text-lg lg:text-xl font-medium tracking-wide uppercase">
                A nossa missão é clara
              </p>

              <h1 className="text-white text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                Fazemos o trabalho chato para que se possa focar no mais
                importante:
                <br />
                <span className="text-white">
                  <SplitText
                    text="a sua empresa"
                    className="text-2xl font-semibold text-center"
                    delay={100}
                    duration={0.6}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="-100px"
                    textAlign="center"
                    onLetterAnimationComplete={handleAnimationComplete}
                  />
                </span>
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
              <div className="relative z-10 p-8 group rounded-lg  transition-all duration-500">
              
                <Image
                  src="/rita-barrela-logo-16.png"
                  alt="Rita Barrela - Fazemos o trabalho chato para que se possa focar no mais importante"
                  width={400}
                  height={300}
                  className="transition-transform duration-500 group-hover:scale-110 w-full h-auto max-w-sm lg:max-w-md object-contain filter drop-shadow-2xl"
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
    </section>
  );
}
