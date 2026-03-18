"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

function RevealSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AboutContent() {
  return (
    <div className="bg-[#050505] text-white">
      {/* ── THE PROBLEM ────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <RevealSection>
            <h2 className="text-[10px] uppercase tracking-[0.2em] text-[#C9A55A] mb-8 font-semibold">The Landscape</h2>
            <h3 className="font-editorial text-5xl md:text-7xl mb-12 leading-[1.1]">
              Discovery is <span className="font-editorial-italic italic">fragmented.</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <p className="font-sans text-lg text-white/60 leading-relaxed font-light">
                In a world of algorithmic noise and superficial metrics, the essence of talent is often lost in the static. Traditional platforms favor volume over veracity, leaving both agencies and talent in a sea of unverified claims.
              </p>
              <p className="font-sans text-lg text-[#C9A55A]/90 leading-relaxed font-light">
                Pholio was built to restore signal to the noise. We believe in high-fidelity curation and verified identity as the only true foundation for professional discovery.
              </p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── THE MANIFESTO ─────────────────────────────────────────────── */}
      <section className="py-40 px-6 bg-white text-[#050505] relative overflow-hidden texture-grain">
        <div className="max-w-6xl mx-auto relative z-10">
          <RevealSection className="text-center">
            <h2 className="text-[10px] uppercase tracking-[0.2em] text-[#C9A55A] mb-12 font-semibold">The Manifesto</h2>
            <div className="font-editorial text-4xl sm:text-6xl md:text-8xl leading-[0.9] tracking-tighter uppercase font-light">
              <div className="mb-4">Curation is</div>
              <div className="mb-4 italic font-editorial-italic ml-[10vw]">Our Compass</div>
              <div className="mb-4 ml-[20vw]">Quality is</div>
              <div className="italic font-editorial-italic ml-[5vw]">Our Currency</div>
            </div>
          </RevealSection>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#C9A55A]/10 -translate-y-1/2" />
        <div className="absolute top-0 left-1/2 w-[1px] h-full bg-[#C9A55A]/10 -translate-x-1/2" />
      </section>

      {/* ── OUR PHILOSOPHY ─────────────────────────────────────────────── */}
      <section className="py-32 px-6 bg-[#050505]">
        <div className="max-w-6xl mx-auto">
          <RevealSection className="border-b border-white/10 pb-20 mb-20">
            <h2 className="text-[10px] uppercase tracking-[0.2em] text-[#C9A55A] mb-8 font-semibold">Core Philosophy</h2>
            <h3 className="font-editorial text-5xl md:text-7xl leading-tight">
              The Three <span className="font-editorial-italic italic">Pillars</span> of Pholio.
            </h3>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            {[
              {
                title: "Absolute Verification",
                desc: "Every data point on a Pholio profile—from height to past bookings—is run through a multi-layer verification process. We eliminate the guesswork from the scouting equation."
              },
              {
                title: "Editorial Curation",
                desc: "We don't aim for the most users; we aim for the best. Our platform is a curated gallery of the world's most promising talent, vetted for quality and professional readiness."
              },
              {
                title: "Direct Access",
                desc: "By removing middle-layer frictions, we provide a direct, high-trust digital pipeline between unmapped talent and the world's most prestigious agency rosters."
              }
            ].map((pillar, i) => (
              <RevealSection key={pillar.title} className="flex flex-col group">
                <div className="text-[40px] font-editorial text-white/10 mb-6 group-hover:text-[#C9A55A]/20 transition-colors duration-500">0{i + 1}</div>
                <h4 className="font-editorial text-3xl mb-8 group-hover:translate-x-2 transition-transform duration-500">{pillar.title}</h4>
                <p className="text-white/50 leading-relaxed font-sans font-light text-lg">
                  {pillar.desc}
                </p>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE COLLECTIVE ─────────────────────────────────────────────── */}
      <section className="py-32 px-6 bg-[#FAF7F2] text-[#050505] texture-grain">
        <div className="max-w-6xl mx-auto">
          <RevealSection className="mb-24 text-center">
            <h2 className="text-[10px] uppercase tracking-[0.2em] text-[#C9A55A] mb-8 font-semibold">The Collective</h2>
            <h3 className="font-editorial text-5xl md:text-7xl">
              Engineered by <span className="font-editorial-italic italic text-[#C9A55A]">Visionaries.</span>
            </h3>
          </RevealSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <RevealSection key={i} className="aspect-[3/4] bg-[#050505]/5 relative group overflow-hidden">
                <div className="absolute inset-0 bg-[#050505] opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-editorial text-white/5 group-hover:text-[#C9A55A]/20 transition-colors duration-500 text-6xl">P.</span>
                </div>
                <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                  <p className="text-[10px] uppercase tracking-widest text-[#C9A55A]">Founding Member 0{i}</p>
                  <p className="font-editorial text-xl">Identity Encrypted</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING ────────────────────────────────────────────────── */}
      <section className="py-40 px-6 text-center border-t border-white/5">
        <RevealSection>
          <div className="font-editorial text-4xl md:text-6xl mb-12 max-w-4xl mx-auto leading-tight">
            Building the next <span className="italic font-editorial-italic text-[#C9A55A]">standard</span> for human identity in the digital age.
          </div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/30">Pholio Studio &copy; 2024</p>
        </RevealSection>
      </section>
    </div>
  );
}
