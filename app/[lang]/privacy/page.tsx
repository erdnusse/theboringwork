import PrivacyComponent from "@/components/privacy";

export const metadata = {
  title: "Privacy Policy | The Boring Work - Consultoria Empresarial",
  description:
    "We do the boring work so you can focus on what matters most: your business. Experts in structuring and growing SMEs.",
  robots: {
    index: true,
    follow: true,
  }
};

export default function PrivacyPage() {
 
  return (
    <PrivacyComponent />
  );
}