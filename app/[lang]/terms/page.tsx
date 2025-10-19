import TermsComponent from "@/components/terms";

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
   <TermsComponent />
  );
}