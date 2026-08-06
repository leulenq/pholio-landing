import { ContactHero } from "@/components/ContactHero";
import { ContactForm } from "@/components/ContactForm";
import MarketingFooter from "@/components/MarketingFooter";

export const metadata = {
  title: "Contact Us | Pholio",
  description: "Get in touch with Pholio Studio for talent inquiries, agency partnerships, and support.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#050505] selection:bg-[#C9A55A] selection:text-[#050505]">
      <ContactHero />
      <ContactForm />
      <MarketingFooter />
    </main>
  );
}
