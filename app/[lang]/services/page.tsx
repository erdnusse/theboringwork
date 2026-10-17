import ServicesPage from "@/components/site/services-page"

export const metadata = {
  title: "Serviços | The Boring Work - Consultoria Empresarial",
  description:
    "Gestão comercial para promotores e back-office para agências e consultores. Desenhamos a estrutura, organizamos os processos e acompanhamos a execução.",
  robots: {
    index: true,
    follow: true,
  },
}

export default function Services() {
  return <ServicesPage />
}
