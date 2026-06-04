/* ═══════════════════════════════════════════════════════════════════
   STUDIO PORTFOLIO — the inline demo site (rebuilt to match the source)
   A faithful inline rebuild of the bundled Studio+ portfolio
   (public/studio-website) — Elara Keats. Four stacked full-height
   screens — hero · featured work · about+representation · contact —
   that the parent scroll-jacks through once the frame is full-bleed.
   Dark editorial "screen", color imagery, just like the real site.
   ═══════════════════════════════════════════════════════════════════ */

const U = (id: string, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

const HERO_IMG = U("1529626455594-4ff0802cfb7e", 1800);

const WORK = [
  { title: "Vogue Italia", category: "Editorial", year: "2024", img: U("1515886657613-9f3515b0c78f") },
  { title: "Saint Laurent", category: "Runway", year: "2023", img: U("1483985988355-763728e1935b") },
  { title: "Numéro Tokyo", category: "Cover", year: "2023", img: U("1534528741775-53994a69daeb") },
  { title: "Celine Campaign", category: "Commercial", year: "2024", img: U("1529139574466-a302d2d3f524") },
  { title: "Harper's Bazaar", category: "Beauty", year: "2023", img: U("1500917293891-ef795e70e1f6") },
  { title: "Prada Collection", category: "Lookbook", year: "2024", img: U("1492106087820-71f1707d1b39") },
];

const STATS: [string, string][] = [
  ["Height", "5'11\""],
  ["Bust", '32"'],
  ["Waist", '24"'],
  ["Hips", '35"'],
];

const REPRESENTATION = [
  { partner: "IMG Models", scope: "Mother Agency", location: "London, UK" },
  { partner: "Elite Model Mgmt", scope: "Direct", location: "Paris, FR" },
  { partner: "The Society", scope: "Direct", location: "New York, USA" },
  { partner: "DNA Models", scope: "Direct", location: "Milan, IT" },
  { partner: "Bravo Models", scope: "Commercial", location: "Tokyo, JP" },
];

const ACCENT = "#C9A55A";
const mono = "var(--font-mono), monospace";

export default function StudioPortfolio() {
  return (
    <div
      className="flex w-full flex-col"
      style={{ backgroundColor: "#0a0a0a", color: "#f8fafc", fontFamily: "var(--font-sans), system-ui, sans-serif" }}
    >
      {/* ════════════ SCREEN 1 — HERO ════════════ */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={HERO_IMG} alt="Elara Keats Portrait" className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: "50% 20%" }} />
        {/* a clean image — only a soft bottom scrim so the name lockup reads */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2" style={{ background: "linear-gradient(to top, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.35) 45%, transparent 100%)" }} />

        <div className="absolute inset-x-0 bottom-0 z-10 px-7 pb-14 sm:px-12 sm:pb-16">
          <div className="leading-[0.8]">
            <span className="block font-bold uppercase tracking-tighter text-white" style={{ fontSize: "clamp(3.4rem, 9.5vw, 8.5rem)" }}>
              Elara
            </span>
            <span
              className="block font-editorial-italic font-light tracking-tighter"
              style={{ fontSize: "clamp(3.4rem, 9.5vw, 8.5rem)", color: ACCENT, textShadow: "0 8px 40px rgba(0,0,0,0.5)" }}
            >
              Keats
            </span>
          </div>
          <p className="mt-9 max-w-lg text-base font-light leading-relaxed tracking-tight sm:text-lg" style={{ color: "rgba(255,255,255,0.7)" }}>
            Professional fashion, runway, and commercial model based in London. Bringing elegance, versatility, and energy to every frame.
          </p>
        </div>
      </section>

      {/* ════════════ SCREEN 2 — FEATURED WORK ════════════ */}
      <section className="relative flex h-screen w-full flex-col justify-center overflow-hidden px-7 py-12 sm:px-12">
        <div className="mb-7 flex items-end justify-between">
          <h3 className="font-bold uppercase tracking-tighter" style={{ fontSize: "clamp(2rem, 4.4vw, 3.4rem)" }}>
            Featured{" "}
            <span className="font-editorial-italic font-light normal-case tracking-tight" style={{ color: ACCENT }}>
              Work
            </span>
          </h3>
          <span className="hidden text-[11px] uppercase sm:block" style={{ fontFamily: mono, letterSpacing: "0.22em", color: "rgba(255,255,255,0.4)" }}>
            Selected · 2023—24
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3" style={{ maxHeight: "64vh" }}>
          {WORK.map((w) => (
            <figure key={w.title} className="group relative overflow-hidden" style={{ aspectRatio: "3/4", backgroundColor: "#121212" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={w.img} alt={w.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,10,10,0.9) 0%, transparent 52%)" }} />
              <figcaption className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-0.5 px-4 py-3.5">
                <span className="text-[10px] uppercase" style={{ fontFamily: mono, letterSpacing: "0.18em", color: ACCENT }}>
                  {w.category} · {w.year}
                </span>
                <span className="font-editorial text-base sm:text-lg">{w.title}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ════════════ SCREEN 3 — ABOUT + REPRESENTATION ════════════ */}
      <section className="relative grid h-screen w-full grid-cols-1 content-center gap-12 overflow-hidden px-7 py-12 sm:px-12 md:grid-cols-2 md:gap-16">
        {/* About */}
        <div className="flex flex-col">
          <h3 className="mb-7 font-bold uppercase tracking-tight" style={{ fontSize: "clamp(2rem, 4.4vw, 3.4rem)" }}>
            About{" "}
            <span className="font-editorial-italic font-normal capitalize" style={{ color: "rgba(255,255,255,0.55)" }}>
              Elara
            </span>
          </h3>
          <p className="max-w-md text-base font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.68)" }}>
            Elara Keats is a British-Japanese fashion model known for her versatile presence in high fashion and commercial editorial. With a background in contemporary dance, she brings a fluid, dynamic energy to every shoot. Currently splitting her time between London, Paris, and New York.
          </p>
          <div className="mt-9 flex flex-wrap gap-x-10 gap-y-5 border-t pt-7" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
            {STATS.map(([label, value]) => (
              <div key={label} className="flex flex-col">
                <span className="text-[10px] uppercase" style={{ fontFamily: mono, letterSpacing: "0.18em", color: ACCENT, marginBottom: 4 }}>
                  {label}
                </span>
                <span className="font-editorial text-2xl">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Representation */}
        <div className="flex flex-col">
          <span className="mb-5 block text-[11px] uppercase" style={{ fontFamily: mono, letterSpacing: "0.4em", color: "rgba(255,255,255,0.4)" }}>
            Represented by
          </span>
          <div className="flex flex-col">
            {REPRESENTATION.map((r, i) => (
              <div
                key={r.partner}
                className="flex items-baseline justify-between gap-4 py-4"
                style={{ borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.1)" }}
              >
                <span className="font-editorial-italic text-xl font-light sm:text-2xl">{r.partner}</span>
                <span className="text-right text-[10px] uppercase leading-relaxed" style={{ fontFamily: mono, letterSpacing: "0.14em", color: "rgba(255,255,255,0.5)" }}>
                  {r.scope}
                  <br />
                  {r.location}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ SCREEN 4 — CONTACT ════════════ */}
      <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden px-7 text-center sm:px-12">
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[460px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(ellipse, rgba(201,165,90,0.12), transparent 64%)" }} />
        <span className="relative z-10 mb-3 block text-sm font-bold uppercase tracking-tight" style={{ color: "rgba(255,255,255,0.6)" }}>
          Ready to
        </span>
        <h3 className="relative z-10 font-editorial-italic font-light leading-tight" style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)", color: "rgba(255,255,255,0.85)" }}>
          create magic?
        </h3>

        <a
          href="mailto:bookings@elarakeats.pholio.studio"
          className="relative z-10 mt-10 inline-flex items-center gap-3 px-7 py-3.5 text-sm font-bold uppercase tracking-wide transition-colors"
          style={{ backgroundColor: ACCENT, color: "#0a0a0a", borderRadius: 4 }}
        >
          Book Elara
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17 17 7M7 7h10v10" />
          </svg>
        </a>

        {/* footer */}
        <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between px-7 pb-7 sm:px-12" style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.42)" }}>
          <span>elarakeats.pholio.studio</span>
          <span className="hidden gap-6 sm:flex">
            <span>Instagram</span>
            <span>Models.com</span>
            <span>LinkedIn</span>
          </span>
        </div>
      </section>
    </div>
  );
}
