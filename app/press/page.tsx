import MarketingFooter from "@/components/MarketingFooter";

export const metadata = {
  title: "Press | Pholio",
  description:
    "Pholio newsroom with company updates, media resources, and press contact details.",
};

const pressUpdates = [
  {
    date: "March 2026",
    title: "Pholio expands agency discovery workflows across international rosters.",
    summary:
      "New shortlist and verification flows reduce portfolio review friction for agency teams operating across multiple markets.",
  },
  {
    date: "January 2026",
    title: "Studio+ introduces premium portfolio controls and advanced profile insights.",
    summary:
      "Talent can now tailor public portfolio presentation with deeper analytics and high-fidelity profile controls.",
  },
  {
    date: "October 2025",
    title: "Pholio launches direct talent-to-agency application routing.",
    summary:
      "Agencies receive cleaner application pipelines with standardized profile data, media, and verification signals.",
  },
];

const brandFacts = [
  { label: "Headquarters", value: "Remote-first · New York / London" },
  { label: "Founded", value: "2024" },
  { label: "Focus", value: "Verified talent discovery for agencies" },
  { label: "Primary Product", value: "Pholio platform + Studio+" },
];

const mediaResources = [
  "Company boilerplate and leadership overview",
  "Primary logo lockups and usage guidance",
  "Product screenshots and visual references",
  "Brand story, positioning, and mission statement",
];

export default function PressPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="relative overflow-hidden border-b border-white/10 px-6 pb-20 pt-36 md:pb-28 md:pt-44">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 10% 20%, rgba(201,165,90,0.25), transparent 40%), radial-gradient(circle at 85% 0%, rgba(201,165,90,0.12), transparent 45%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl">
          <span className="text-label text-[#C9A55A]">Newsroom</span>
          <h1 className="mt-8 max-w-4xl font-editorial text-5xl leading-[0.92] tracking-tight sm:text-6xl md:text-7xl">
            Pholio in the <span className="font-editorial-italic italic text-[#C9A55A]">Press</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
            Official updates, background resources, and media contact information for editorial teams
            covering Pholio.
          </p>
        </div>
      </section>

      <section className="bg-[#050505] px-6 py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex items-center justify-between gap-6">
            <h2 className="font-editorial text-4xl tracking-tight text-white sm:text-5xl">Latest Updates</h2>
            <a
              href="mailto:press@pholio.studio"
              className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C9A55A] transition-colors hover:text-[#D4BC8A]"
            >
              Request Interview
            </a>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {pressUpdates.map((item) => (
              <article
                key={item.title}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-colors hover:border-[#C9A55A]/50"
              >
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#C9A55A]">{item.date}</p>
                <h3 className="mt-5 font-editorial text-2xl leading-tight text-white">{item.title}</h3>
                <p className="mt-5 text-sm leading-relaxed text-white/65">{item.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-[#FAF7F2] px-6 py-20 text-[#0F172A] md:py-28">
        <div className="texture-grain absolute inset-0" />
        <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-black/10 bg-white/90 p-8 sm:p-10">
            <span className="text-label text-[#C9A55A]">Media Kit</span>
            <h2 className="mt-5 font-editorial text-4xl leading-tight tracking-tight sm:text-5xl">
              Resources for editors and journalists.
            </h2>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
              For story development, feature coverage, or product context, reach out and our team will
              provide the appropriate assets package.
            </p>
            <div className="mt-8 grid gap-3">
              {mediaResources.map((resource) => (
                <div
                  key={resource}
                  className="rounded-xl border border-black/10 bg-[#FAF7F2] px-4 py-3 text-sm text-slate-700"
                >
                  {resource}
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-2xl border border-black/10 bg-[#F4EFE4] p-8 sm:p-10">
            <span className="text-label text-[#C9A55A]">Company Snapshot</span>
            <dl className="mt-7 space-y-6">
              {brandFacts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    {fact.label}
                  </dt>
                  <dd className="mt-2 text-base leading-relaxed text-slate-800">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#050505] px-6 py-20 md:py-24">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 rounded-2xl border border-[#C9A55A]/35 bg-[#0A0A0A] p-8 sm:p-10 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="text-label text-[#C9A55A]">Press Contact</span>
            <h2 className="mt-4 font-editorial text-4xl leading-tight tracking-tight sm:text-5xl">
              Media inquiries
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/65 sm:text-base">
              For interviews, commentary, background briefing, or speaking requests, contact the Pholio
              press team directly.
            </p>
          </div>
          <a
            href="mailto:press@pholio.studio"
            className="inline-flex w-fit rounded-full border border-[#C9A55A]/40 px-7 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#C9A55A] transition-colors hover:border-[#C9A55A] hover:text-[#D4BC8A]"
          >
            press@pholio.studio
          </a>
        </div>
      </section>

      <MarketingFooter />
    </main>
  );
}
