"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

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
      className="relative bg-white rounded-2xl shadow-xl px-6 py-8 md:px-10 md:py-10 mb-16"
    >
      <div className="flex items-center gap-2 mb-2">
        {highlight}
        <h2 className={`text-xl md:text-2xl font-bold ${titleClass}`}>
          {title}
        </h2>
      </div>
      <div className="text-gray-700 text-base leading-relaxed">{children}</div>
      {imageSrc && (
        <div className="mt-4 flex justify-center">
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
function PlaceholderImageBlock() {
  return (
    <div className="relative flex items-center justify-center h-56 mb-16">
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="w-40 h-40 md:w-56 md:h-56 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center shadow-inner">
          <span className="text-orange-400 text-4xl font-bold opacity-60">
            Imagem
          </span>
        </div>
      </div>
      {/* SVG Arrow overlays the image */}
      <div className="absolute inset-0 z-20 top-10 pointer-events-none flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 800 800"
          className="w-40 h-40 md:w-56 md:h-56"
        >
          <g
            strokeWidth={12}
            stroke="hsl(0, 0%, 0%)"
            fill="none"
            strokeLinecap="square"
            transform="matrix(1,0,0,1,-31,0)"
          >
            <path
              d="M250 250Q438 350 400 400Q294 533 550 550 "
              markerEnd="url(#SvgjsMarker1326)"
            />
          </g>
          <defs>
            <marker
              markerWidth={10.5}
              markerHeight={10.5}
              refX={5.25}
              refY={5.25}
              viewBox="0 0 10.5 10.5"
              orient="auto"
              id="SvgjsMarker1326"
            >
              <polygon
                points="0,10.5 3.5,5.25 0,0 10.5,5.25"
                fill="hsl(0, 0%, 0%)"
              />
            </marker>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function GreenAsterisk() {
  return (
    <span className="inline-block mr-2 align-middle">
      <svg width={36} height={36} viewBox="0 0 36 36" fill="none">
        <path
          d="M18 3v30M3 18h30M7.5 7.5l21 21M28.5 7.5l-21 21"
          stroke="#D9F99D"
          strokeWidth={4}
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

// --- Main Page ---
export default function FlowPage() {
  return (
    <div className="min-h-screen bg-[#f6ede4] py-10 px-2 md:px-0 flex flex-col items-center">
      <div className="max-w-5xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12">
        {/* Row 1: Left Block, Right Placeholder */}
        <div>
          <TextBlock
            id="block1"
            title="Gestão Administrativa"
            titleClass="text-[#1e40af]"
            highlight={""}
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
          <PlaceholderImageBlock />
        </div>

        {/* Row 2: Left Placeholder, Right Block */}
        <div>
          <PlaceholderImageBlock />
        </div>
        <div>
          <TextBlock
            id="block2"
            title="Planeamento estratégico"
            titleClass="text-[#7c3aed]"
            highlight={<GreenAsterisk />}
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
            titleClass="text-[#222]"
          >
            Processos confusos, tarefas duplicadas e falhas de comunicação
            custam tempo e dinheiro. A nossa consultoria ajuda a mapear,
            simplificar e reorganizar os fluxos internos para que a operação
            funcione com mais fluidez e eficácia. Pequenas mudanças podem trazer
            grandes ganhos em produtividade.
          </TextBlock>
        </div>
        <div>
          <PlaceholderImageBlock />
        </div>
      </div>
    </div>
  );
}