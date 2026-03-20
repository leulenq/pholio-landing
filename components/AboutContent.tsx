"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

function RevealSection({ children, className = "", delay = 0, y = 40 }: { children: React.ReactNode; className?: string; delay?: number; y?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AboutContent() {
  return (
    <div className="bg-[#050505] text-white overflow-hidden pb-40">
      
      {/* ── 01. THE LANDSCAPE — Editorial Spread ────────────────────────── */}
      <section className="relative py-40 md:py-64 px-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[45fr_55fr] gap-20 lg:gap-32 items-end">
            
            <RevealSection className="relative">
              <span className="text-label text-gold mb-12 block">CHAPTER I — THE LANDSCAPE</span>
              <h3 className="font-editorial text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.95] tracking-tight mb-0">
                Discovery is <br />
                <span className="font-editorial-italic italic text-gold">fragmented.</span>
              </h3>
            </RevealSection>

            <RevealSection delay={0.2} className="flex flex-col gap-10 lg:pl-20 border-l border-white/5 pb-2">
              <p className="font-sans text-lg md:text-xl text-white/60 leading-relaxed font-light max-w-lg">
                In a world of algorithmic noise and superficial metrics, the essence of talent is often lost in the static. Traditional platforms favor volume over veracity, leaving room for unverified claims.
              </p>
              <p className="font-editorial-italic italic text-2xl md:text-3xl text-gold/80 leading-snug max-w-md">
                "Pholio was built to restore signal to the noise."
              </p>
              <p className="font-sans text-base text-white/40 leading-relaxed font-light max-w-sm">
                We believe in high-fidelity curation and verified identity as the only true foundation for professional discovery.
              </p>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ── 02. THE MANIFESTO — Cream Break ─────────────────────────────── */}
      <section className="relative py-48 md:py-72 bg-[#FAF7F2] text-[#050505]">
        {/* Background Ghost Element */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] select-none flex items-center justify-center overflow-hidden">
          <span className="font-editorial italic text-[80vw] leading-none text-[#C9A55A]">P</span>
        </div>

        <div className="max-w-6xl mx-auto relative z-10 px-6">
          <RevealSection className="text-center mb-0">
            <span className="text-label text-[#C9A55A] mb-12 block">THE MANIFESTO</span>
            
            <div className="font-editorial text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] leading-[0.85] tracking-[ -0.04em] uppercase font-light">
              <div className="flex flex-col gap-2">
                <motion.div 
                  initial={{ x: -40, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1.2, ease }}
                  className="mb-2"
                >
                  Curation is
                </motion.div>
                <motion.div 
                  initial={{ x: 40, opacity: 0 }}
                  whileInView={{ x: 100, opacity: 1 }}
                  transition={{ duration: 1.4, delay: 0.2, ease }}
                  className="italic font-editorial-italic text-[#C9A55A]"
                >
                  Our Compass
                </motion.div>
                <motion.div 
                  initial={{ x: -40, opacity: 0 }}
                  whileInView={{ x: -60, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.4, ease }}
                >
                  Quality is
                </motion.div>
                <motion.div 
                  initial={{ x: 40, opacity: 0 }}
                  whileInView={{ x: 40, opacity: 1 }}
                  transition={{ duration: 1.4, delay: 0.6, ease }}
                  className="italic font-editorial-italic text-[#C9A55A]"
                >
                  Our Currency
                </motion.div>
              </div>
            </div>
          </RevealSection>
        </div>

        {/* Decorative Rule Lines */}
        <div className="absolute top-0 bottom-0 left-[15%] w-[1px] bg-[#C9A55A]/10 hidden lg:block" />
        <div className="absolute top-0 bottom-0 right-[15%] w-[1px] bg-[#C9A55A]/10 hidden lg:block" />
      </section>

      {/* ── 03. THE PILLARS — Staggered Content ─────────────────────────── */}
      <section className="py-40 md:py-64 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <RevealSection className="mb-32">
            <span className="text-label text-gold mb-10 block">CHAPTER II — CORE PHILOSOPHY</span>
            <h3 className="font-editorial text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.9]">
              The Three <br />
              <span className="font-editorial-italic italic text-gold">Standard</span> Pillars.
            </h3>
          </RevealSection>

          <div className="relative flex flex-col gap-40 md:gap-56">
            {/* Absolute Line connecting pillars on desktop */}
            <div className="absolute left-8 top-0 bottom-0 w-[1px] bg-white/5 hidden md:block" />

            {[
              {
                id: "01",
                title: "Absolute Verification.",
                desc: "Every data point on a Pholio profile—from height to past bookings—is run through a multi-layer verification process. We eliminate the guesswork from the scouting equation.",
                label: "FIDELITY"
              },
              {
                id: "02",
                title: "Editorial Curation.",
                desc: "We don't aim for the most users; we aim for the best. Our platform is a curated gallery of the world's most promising talent, vetted for quality and professional readiness.",
                label: "CURATION",
                stagger: true
              },
              {
                id: "03",
                title: "Direct Access.",
                desc: "By removing middle-layer frictions, we provide a direct, high-trust digital pipeline between talent and the world's most prestigious agency rosters.",
                label: "VELOCITY"
              }
            ].map((pillar, i) => (
              <RevealSection 
                key={pillar.id} 
                className={`relative flex flex-col md:flex-row gap-8 md:gap-20 items-start ${pillar.stagger ? 'md:ml-[20%] lg:ml-[25%]' : ''}`}
                y={60}
              >
                {/* Large Number Index */}
                <div className="flex-shrink-0 relative">
                  <span className="font-editorial text-7xl md:text-9xl opacity-[0.06] select-none">{pillar.id}</span>
                  <div className="absolute top-1/2 left-0 w-12 h-[1px] bg-gold/40 hidden md:block -translate-y-1/2 translate-x-[-120%]" />
                </div>
                
                <div className="max-w-lg mt-4 md:mt-12">
                  <span className="text-[10px] tracking-[0.2em] font-bold text-gold/60 mb-6 block uppercase">{pillar.label}</span>
                  <h4 className="font-editorial text-3xl md:text-4xl mb-8 leading-tight">{pillar.title}</h4>
                  <p className="text-white/50 leading-relaxed font-sans font-light text-lg">
                    {pillar.desc}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04. THE COLLECTIVE — Legacy Section ────────────────────────── */}
      <section className="relative py-40 md:py-64 bg-[#FAF7F2] text-[#050505]">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            <RevealSection className="relative order-2 lg:order-1">
              <div className="aspect-[4/5] overflow-hidden rounded-[2px] shadow-2xl">
                <img 
                  src="/images/about_editorial_vision.png" 
                  alt="Editorial texture" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out" 
                />
              </div>
              {/* Floating aesthetic label */}
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-white shadow-xl flex items-center justify-center p-8 hidden md:flex">
                <span className="font-editorial text-5xl opacity-10">P.</span>
              </div>
            </RevealSection>

            <RevealSection className="lg:pl-20 order-1 lg:order-2">
              <span className="text-label text-[#C9A55A] mb-12 block">THE COLLECTIVE</span>
              <h3 className="font-editorial text-5xl md:text-7xl leading-[0.95] mb-12 tracking-tight">
                Engineered by <br />
                <span className="font-editorial-italic italic text-[#C9A55A]">Visionaries.</span>
              </h3>
              <p className="text-black/60 font-sans text-lg font-light leading-relaxed mb-10 max-w-md">
                Pholio is a convergence of editorial minds, technical engineers, and industry veterans committed to building the next standard for human identity.
              </p>
              
              <div className="grid grid-cols-1 gap-6 pt-10 border-t border-black/5">
                {[
                  "Creative Direction — Florence, Italy",
                  "Identity Cryptography — Zug, Switzerland",
                  "Product Architecture — London, UK",
                  "Verified Scouting — New York, USA"
                ].map((role) => (
                  <div key={role} className="flex items-center gap-4 text-[11px] tracking-[0.15em] font-bold uppercase opacity-40">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C9A55A]" />
                    {role}
                  </div>
                ))}
              </div>
            </RevealSection>

          </div>
        </div>
      </section>

      {/* ── 05. CLOSING — High Impact ────────────────────────────────── */}
      <section className="py-48 md:py-72 text-center border-t border-white/5 relative bg-[#050505]">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.7\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }} />
        
        <RevealSection className="px-6 relative z-10">
          <div className="font-editorial text-4xl sm:text-5xl md:text-7xl mb-16 max-w-5xl mx-auto leading-[1.05] tracking-tight">
            Building the next <span className="italic font-editorial-italic text-gold">standard</span> for <br className="hidden md:block" /> identity in the digital age.
          </div>
          <motion.div 
            className="w-16 h-16 border border-gold/20 rounded-full mx-auto flex items-center justify-center mb-10"
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
             <span className="font-editorial text-gold text-2xl">P.</span>
          </motion.div>
          <p className="text-[10px] uppercase tracking-[0.5em] text-white/20 font-medium">Pholio Studio Established 2024</p>
        </RevealSection>
      </section>

    </div>
  );
}
