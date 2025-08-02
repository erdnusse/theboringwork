"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";
import ModernSpinner from "@/components/loading-spinner";

// --- TextBlock Component ---
function TextBlock({
  id,
  title,
  titleClass,
  children,
  imageSrc,
  imageAlt,
  highlight,
}: {
  id: string;
  title: string;
  titleClass?: string;
  children: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  highlight?: React.ReactNode;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="group relative bg-white border-[#e8ddd1] rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 px-6 py-8 md:px-10 md:py-10 mb-16"
    >
      <div className="flex items-center gap-2 mb-2">
        {highlight}
        <h2 className={`text-xl md:text-2xl font-bold ${titleClass}`}>
          {title}
        </h2>
      </div>
      <div className="text-gray-700 text-base leading-relaxed">{children}</div>
      {imageSrc && (
        <div className="rounded-full object-cover group-hover:scale-105 transition-transform duration-300">
          <Image
            src={imageSrc}
            alt={imageAlt || "Placeholder"}
            width={120}
            height={120}
            className="rounded-full object-cover"
          />
        </div>
      )}
    </motion.div>
  );
}

// --- PlaceholderImageBlock Component ---
function PlaceholderImageBlock({
  arrowSrc,
  arrowPosition = "right", // "left" or "right"
  arrowSize = "250px",
  imageSrc,
  align = "center", // "left" | "right" | "center"
  arrowRotate = 0, // degrees to rotate the arrow image
  arrowTopPosition = "50px", // vertical position of the arrow
}: {
  arrowSrc?: string;
  arrowPosition?: "left" | "right";
  arrowSize?: string;
  imageSrc?: string;
  align?: "left" | "right" | "center";
  arrowRotate?: number;
  arrowTopPosition?: string; // vertical position of the arrow
}) {
  // Alignment classes for the whole block
  let justifyClass = "justify-center";
  if (align === "left") justifyClass = "justify-start";
  if (align === "right") justifyClass = "justify-end";

  // Arrow positioning
  const arrowLeft = arrowPosition === "left" ? "left-0" : "";
  const arrowRight = arrowPosition === "right" ? "right-0" : "";
  const arrowTranslate =
    arrowPosition === "left"
      ? "-translate-x-1/4"
      : arrowPosition === "right"
      ? "translate-x-1/4"
      : "";
  if (arrowSrc === undefined) {
    return (
      <div
        className={`relative flex ${justifyClass} items-center h-60 md:h-72 lg:h-80`}
      >
        {/* Highlighted placeholder box */}
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <Image
            src={imageSrc!}
            alt="Placeholder"
            fill
            className="object-contain"
            sizes="100vw"
          />
        </div>
      </div>
    );
  } else if (imageSrc === undefined) {
    return (
      <div
        className={`relative flex ${justifyClass} items-center h-60 md:h-72 lg:h-80`}
      >
        {/* Arrow as background, absolutely positioned */}
        <div
          className={`absolute ${arrowLeft} ${arrowRight} -translate-y-1/2 ${arrowTranslate} z-0 pointer-events-none`}
          style={{
            top: arrowTopPosition,
            width: arrowSize,
            height: arrowSize,
            transform: `translateY(-50%) ${
              arrowTranslate ? ` ${arrowTranslate}` : ""
            } rotate(${arrowRotate}deg)`,
          }}
        >
          <Image
            src={arrowSrc}
            alt="Arrow"
            fill
            className="object-contain opacity-70"
            sizes={arrowSize}
            style={{ transform: `rotate(${arrowRotate}deg)` }}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={`relative flex ${justifyClass} items-center h-60 md:h-72 lg:h-80`}
      >
        {/* Arrow as background, absolutely positioned */}
        <div
          className={`absolute ${arrowLeft} ${arrowRight} -translate-y-1/2 ${arrowTranslate} z-0 pointer-events-none`}
          style={{
            top: arrowTopPosition,
            width: arrowSize,
            height: arrowSize,
            transform: `translateY(-50%) ${
              arrowTranslate ? ` ${arrowTranslate}` : ""
            } rotate(${arrowRotate}deg)`,
          }}
        >
          <Image
            src={arrowSrc}
            alt="Arrow"
            fill
            className="object-contain opacity-70"
            sizes={arrowSize}
            style={{ transform: `rotate(${arrowRotate}deg)` }}
          />
        </div>
        {/* Highlighted placeholder box */}
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <Image
            src={imageSrc}
            alt="Placeholder"
            fill
            className="object-contain"
            sizes="100vw"
          />
        </div>
      </div>
    );
  }
}


// --- Main Page ---
export default function ServicesComponent() {
  const isMobile = useIsMobile();

    // Prevent SSR/hydration mismatch: only render image when isMobile is defined
    if (typeof isMobile === "undefined") {
      return (
        <section
          id="home"
          className="bg-[hsl(36,30%,92%)] relative w-full min-h-screen flex items-center justify-center overflow-hidden"
        >
          {/* Centered image absolutely positioned */}
          <div className="w-full h-full z-0 flex items-center justify-center">
            <ModernSpinner />
          </div>
        </section>
      );
    }
  if (isMobile) {
     return (
    <div className="min-h-screen bg-[#f6ede4] pb-5 pt-28 px-2 md:px-0 flex flex-col items-center">
      <div className="max-w-5xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-6">
        {/* Row 1: Left Block, Right Placeholder */}
        <div>
          <TextBlock
            id="block1"
            title="Gestão Administrativa"
            titleClass="text-[#1e40af]"

          >
            Empresas que querem crescer não podem desperdiçar tempo com tarefas
            administrativas. Ter alguém dedicado à gestão administrativa é
            essencial para manter a organização, o controlo e a eficiência. A
            nossa empresa presta esse apoio de forma profissional e flexível,
            permitindo que os gestores se concentrem no que realmente importa: o
            desenvolvimento do negócio.
          </TextBlock>
        </div>
      

        {/* Row 2: Left Placeholder, Right Block */}
       
        <div>
          <TextBlock
            id="block2"
            title="Planeamento estratégico"
            titleClass="text-[#1e40af]"
    
          >
            Tudo começa com um diagnóstico claro: onde está o negócio, para onde
            pode ir e como lá chegar. Com base nisso, é desenvolvido um plano
            estratégico adaptado à realidade da empresa. Definem-se metas,
            indicadores de desempenho (KPIs) e uma visão sólida, sem teorias
            vagas — apenas soluções práticas com impacto real.
          </TextBlock>
        </div>

        {/* Row 3: Left Block, Right Placeholder */}
        <div>
          <TextBlock
            id="block3"
            title="Reestruturação & Otimização Operacional"
            titleClass="text-[#1e40af]"

          >
            Processos confusos, tarefas duplicadas e falhas de comunicação
            custam tempo e dinheiro. A nossa consultoria ajuda a mapear,
            simplificar e reorganizar os fluxos internos para que a operação
            funcione com mais fluidez e eficácia. Pequenas mudanças podem trazer
            grandes ganhos em produtividade.
          </TextBlock>
        </div>
        
      </div>
    </div>
  );
  }  
  
  return (
    <div className="min-h-screen bg-[#f6ede4] py-10 px-2 md:px-0 flex flex-col items-center">
      <div className="max-w-5xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-6">
        {/* Row 1: Left Block, Right Placeholder */}
        <div>
          <TextBlock
            id="block1"
            title="Gestão Administrativa"
            titleClass="text-[#1e40af]"

          >
            Empresas que querem crescer não podem desperdiçar tempo com tarefas
            administrativas. Ter alguém dedicado à gestão administrativa é
            essencial para manter a organização, o controlo e a eficiência. A
            nossa empresa presta esse apoio de forma profissional e flexível,
            permitindo que os gestores se concentrem no que realmente importa: o
            desenvolvimento do negócio.
          </TextBlock>
        </div>
        <div>
          <PlaceholderImageBlock
            imageSrc="/hand-exclamation.png"
            arrowSrc="/arrow1-inverted.png"
            arrowPosition="left"
            align="center"
            arrowRotate={-45}
            arrowSize={"400px"}
            arrowTopPosition="250px"
          />
        </div>

        {/* Row 2: Left Placeholder, Right Block */}
        <div>
          <PlaceholderImageBlock
            imageSrc="/Copilot_20250802_165751.png"
            align="center"
          />
        </div>
        <div>
          <TextBlock
            id="block2"
            title="Planeamento estratégico"
            titleClass="text-[#1e40af]"
    
          >
            Tudo começa com um diagnóstico claro: onde está o negócio, para onde
            pode ir e como lá chegar. Com base nisso, é desenvolvido um plano
            estratégico adaptado à realidade da empresa. Definem-se metas,
            indicadores de desempenho (KPIs) e uma visão sólida, sem teorias
            vagas — apenas soluções práticas com impacto real.
          </TextBlock>
        </div>

        {/* Row 3: Left Block, Right Placeholder */}
        <div>
          <TextBlock
            id="block3"
            title="Reestruturação & Otimização Operacional"
            titleClass="text-[#1e40af]"

          >
            Processos confusos, tarefas duplicadas e falhas de comunicação
            custam tempo e dinheiro. A nossa consultoria ajuda a mapear,
            simplificar e reorganizar os fluxos internos para que a operação
            funcione com mais fluidez e eficácia. Pequenas mudanças podem trazer
            grandes ganhos em produtividade.
          </TextBlock>
        </div>
        <div>
          <PlaceholderImageBlock imageSrc="/hand-peace.png" arrowSrc="/arrow2-inverted.png" arrowPosition="left" arrowRotate={45} arrowSize="200px"/>
        </div>
      </div>
    </div>
  );
}
