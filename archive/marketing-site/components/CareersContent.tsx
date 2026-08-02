"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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

export function CareersContent() {
  const departments = [
    {
      name: "Engineering",
      roles: ["Full Stack Engineer (Core)", "AI Integration Specialist"],
    },
    {
      name: "Design",
      roles: ["Product Designer (Agency Experience)"],
    },
    {
      name: "Strategy",
      roles: ["Curation Lead", "Agency Relations Manager"],
    }
  ];

  return (
    <div className="bg-[#050505] text-white">
      {/* ── VALUES ────────────────────────────────────────────────── */}
      <section className="py-32 px-6 border-b border-white/5">
        <div className="max-w-4xl mx-auto">
          <RevealSection>
            <h2 className="text-[10px] uppercase tracking-[0.2em] text-[#C9A55A] mb-8 font-semibold">Our Values</h2>
            <h3 className="font-editorial text-5xl md:text-7xl mb-16 leading-tight">
              A Culture of <span className="font-editorial-italic italic">Relentless</span> Craft.
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {[
                { title: "Taste First", desc: "We believe code and pixels should be as beautiful as the talent we represent. We value aesthetic precision as much as technical robustness." },
                { title: "Radical Ownership", desc: "Every member of the Pholio collective is an architect of the vision. We empower individuals to own their domain entirely." },
                { title: "Verifiable Excellence", desc: "Accuracy is our currency. We build for a future where digital reputation is backed by undeniable proof." },
                { title: "Global Context", desc: "We are remote-first and world-aware. We build tools that scale human connection across every border." }
              ].map((value) => (
                <div key={value.title} className="flex flex-col">
                  <h4 className="font-editorial text-2xl mb-4 text-white">{value.title}</h4>
                  <p className="font-sans text-lg text-white/50 leading-relaxed font-light">{value.desc}</p>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── PERKS ─────────────────────────────────────────────── */}
      <section className="py-32 px-6 bg-white text-[#050505] texture-grain">
        <div className="max-w-6xl mx-auto">
          <RevealSection className="text-center mb-24">
            <h2 className="text-[10px] uppercase tracking-[0.2em] text-[#C9A55A] mb-8 font-semibold">The Pholio Life</h2>
            <h3 className="font-editorial text-5xl md:text-6xl mb-8">
              Exceptional Support for <span className="font-editorial-italic italic">Exceptional</span> Minds.
            </h3>
          </RevealSection>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              "Remote-First Culture",
              "Premium Studio Stipend",
              "Equity for All Employees",
              "Unlimited Sabbaticals",
              "Annual Global Offsites",
              "Biolight Workspace Kit",
              "Health & Wellness Fund",
              "AI Tooling Subscriptions"
            ].map((perk, i) => (
              <RevealSection key={perk} className="p-8 border border-[#050505]/5 flex flex-col justify-between aspect-square">
                <div className="text-[10px] text-[#C9A55A] font-semibold">0{i + 1}</div>
                <div className="font-editorial text-2xl leading-tight">{perk}</div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── OPEN ROLES ─────────────────────────────────────────────── */}
      <section className="py-40 px-6 bg-[#050505]">
        <div className="max-w-5xl mx-auto">
          <RevealSection className="mb-24">
            <h2 className="text-[10px] uppercase tracking-[0.2em] text-[#C9A55A] mb-8 font-semibold">Join Us</h2>
            <h3 className="font-editorial text-5xl md:text-7xl mb-12">
              Ready to leave a <span className="font-editorial-italic italic text-[#C9A55A]">legacy?</span>
            </h3>
          </RevealSection>

          <div className="space-y-1 bg-white/5">
            {departments.map((dept) => (
              <RevealSection key={dept.name} className="bg-[#050505] p-8 md:p-12 border-b border-white/5 last:border-0">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-12">
                  <div className="w-1/3">
                    <h4 className="font-editorial text-3xl text-[#C9A55A]">{dept.name}</h4>
                  </div>
                  <div className="w-full space-y-8">
                    {dept.roles.map((role) => (
                      <div key={role} className="group cursor-pointer flex items-center justify-between border-b border-white/5 pb-8 last:border-0 last:pb-0">
                        <span className="font-editorial text-2xl md:text-3xl group-hover:translate-x-4 transition-transform duration-500">{role}</span>
                        <div className="w-12 h-[1px] bg-[#C9A55A] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />
                      </div>
                    ))}
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER CTA ────────────────────────────────────────────────── */}
      <section className="py-40 px-6 text-center border-t border-white/5">
        <RevealSection>
          <div className="font-editorial text-4xl md:text-6xl mb-12 max-w-4xl mx-auto leading-tight italic font-editorial-italic text-[#C9A55A]">
            Don't see your role? We're always scouting for visionaries.
          </div>
          <a href="mailto:careers@pholio.studio" className="text-[10px] uppercase tracking-[0.4em] text-white hover:text-[#C9A55A] transition-colors duration-300">
            Send a spec application &rarr;
          </a>
        </RevealSection>
      </section>
    </div>
  );
}
