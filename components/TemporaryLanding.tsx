import Link from "next/link";

const accessSignals = [
  "Private beta opening in curated waves",
  "Talent portfolios, agency discovery, and Studio+ infrastructure",
  "Built with the same editorial system as the full Pholio experience",
];

const proofNotes = ["Talent rooms", "AI curation", "Agency-grade profiles"];

export default function TemporaryLanding() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-[#FAF7F2]">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.16]"
        style={{
          background:
            "radial-gradient(circle at 50% 18%, rgba(201,165,90,0.20), transparent 30%), radial-gradient(circle at 16% 72%, rgba(212,188,138,0.12), transparent 26%), linear-gradient(180deg, rgba(5,5,5,0) 0%, rgba(5,5,5,0.88) 82%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px opacity-60"
        style={{ background: "linear-gradient(to right, transparent, #C9A55A, transparent)" }}
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[12%] h-[46rem] w-[46rem] -translate-x-1/2 rounded-full opacity-[0.055] blur-3xl"
        style={{ background: "#C9A55A" }}
      />
      <div aria-hidden="true" className="texture-grain absolute inset-0 opacity-80" />

      <section className="relative z-10 flex min-h-screen items-center px-6 py-28 sm:px-10 lg:px-16">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-3xl">
            <div className="mb-10 flex items-center gap-4">
              <span
                className="font-editorial text-xl tracking-[0.26em] text-[#C9A55A] sm:text-2xl"
                style={{ textShadow: "0 0 28px rgba(201,165,90,0.22)" }}
              >
                PHOLIO
              </span>
              <span className="h-px w-16 bg-gradient-to-r from-[#C9A55A]/70 to-transparent" />
              <span className="text-micro text-[#FAF7F2]/45">Early Access</span>
            </div>

            <p className="text-label mb-6 text-[#C9A55A]">
              A private surface for modern representation
            </p>
            <h1 className="font-editorial max-w-5xl text-[clamp(4.4rem,13vw,11.5rem)] leading-[0.82] tracking-[-0.07em]">
              The new standard for talent presence is being prepared.
            </h1>
            <p className="mt-8 max-w-2xl font-sans text-base font-light leading-8 text-[#FAF7F2]/64 sm:text-lg">
              Pholio is opening soon as a cinematic portfolio, intelligence,
              and agency discovery system for talent who need their work to
              feel as considered as the rooms they belong in.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                className="btn-gold"
                href="mailto:founders@pholio.studio?subject=Pholio%20early%20access%20request"
              >
                <span>Request early access</span>
              </a>
              <Link className="btn-outline" href="/privacy">
                <span>Review privacy</span>
              </Link>
            </div>
          </div>

          <aside className="relative mx-auto w-full max-w-xl lg:ml-auto">
            <div className="relative overflow-hidden rounded-[2rem] border border-[#C9A55A]/18 bg-[#FAF7F2]/[0.035] p-5 shadow-[0_36px_120px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:p-7">
              <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#D4BC8A]/70 to-transparent" />
              <div className="rounded-[1.5rem] border border-white/[0.08] bg-[#080808]/82 p-6 sm:p-8">
                <div className="mb-16 flex items-center justify-between">
                  <span className="text-micro text-[#FAF7F2]/42">Production holding room</span>
                  <span className="h-2 w-2 rounded-full bg-[#C9A55A] shadow-[0_0_22px_rgba(201,165,90,0.8)]" />
                </div>

                <div className="space-y-6">
                  {accessSignals.map((signal, index) => (
                    <div
                      key={signal}
                      className="group flex gap-5 border-t border-white/[0.08] pt-5 first:border-t-0 first:pt-0"
                    >
                      <span className="font-mono text-xs text-[#C9A55A]/80">0{index + 1}</span>
                      <p className="font-sans text-sm font-light leading-6 text-[#FAF7F2]/66 transition-colors group-hover:text-[#FAF7F2]/88">
                        {signal}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-16 grid grid-cols-3 gap-2">
                  {proofNotes.map((note) => (
                    <div
                      key={note}
                      className="rounded-2xl border border-[#C9A55A]/12 bg-[#C9A55A]/[0.045] px-3 py-4 text-center"
                    >
                      <span className="text-[10px] uppercase tracking-[0.16em] text-[#FAF7F2]/48">
                        {note}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
