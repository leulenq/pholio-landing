import type { Metadata } from "next";
import AgencyRequestAccessForm from "@/components/AgencyRequestAccessForm";
import MarketingFooter from "@/components/MarketingFooter";

export const metadata: Metadata = {
  title: "Request agency access — Pholio",
  description:
    "Pholio reviews agency access manually. Tell us about your agency and how you would use the workspace.",
};

/**
 * The route pholio-app's /partners handler has always redirected to
 * (agencyRequestAccessUrl() in src/domains/auth/routes/auth.js) and that never
 * existed until now.
 */
export default function AgencyRequestAccessPage() {
  return (
    <main className="bg-[#FAF7F2]">
      <section className="mx-auto w-full max-w-3xl px-5 pb-16 pt-32 md:px-8 md:pt-40">
        <h1
          className="mb-4 text-4xl leading-tight md:text-5xl"
          style={{ fontFamily: "var(--font-serif)", color: "#050505" }}
        >
          Request{" "}
          <span
            className="font-editorial-italic"
            style={{ color: "#C9A55A" }}
          >
            access
          </span>
        </h1>
        <p
          className="mb-12 max-w-2xl text-[16px] leading-relaxed"
          style={{ fontFamily: "var(--font-sans)", color: "#4B5563" }}
        >
          Pholio is free for agencies and vetted by hand. Tell us who you are and
          how you would use the workspace, and we will email next steps if there
          is a fit.
        </p>

        <AgencyRequestAccessForm />
      </section>

      <MarketingFooter />
    </main>
  );
}
