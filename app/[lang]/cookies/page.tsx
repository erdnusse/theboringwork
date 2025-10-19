import CookiesComponent from "@/components/cookies";

export const metadata = {
  title: "Cookies | The Boring Work - Consultoria Empresarial",
  description:
    "Fazemos o trabalho chato para que se possa focar no mais importante: a sua empresa. Especialistas em estruturação e crescimento de PMEs.",
    robots: {
    index: true,
    follow: true,
  }
}

export default function CookiesPage() {
  
  return (
   <CookiesComponent />
  );
}