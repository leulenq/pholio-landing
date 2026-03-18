"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform, useReducedMotion } from "framer-motion";

// CSS import for the replica
import "../styles/OverviewPage.css";

// ════════════════════════════════════════════════════════════
// DATA
// ════════════════════════════════════════════════════════════

const PIPELINE = [
  {
    id: 1, name: 'Amara Johnson', archetype: 'editorial', archetypeLabel: 'Editorial',
    city: 'New York', match: 97, applied: '2h ago', status: 'new',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200',
  },
  {
    id: 2, name: 'Sofia Chen', archetype: 'runway', archetypeLabel: 'Runway',
    city: 'Los Angeles', match: 94, applied: '4h ago', status: 'review',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200',
  },
  {
    id: 3, name: 'Zara Williams', archetype: 'commercial', archetypeLabel: 'Commercial',
    city: 'Miami', match: 88, applied: 'Yesterday', status: 'new',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=200&h=200',
  },
  {
    id: 4, name: 'Elena Marcus', archetype: 'editorial', archetypeLabel: 'Editorial',
    city: 'New York', match: 91, applied: 'Yesterday', status: 'accepted',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=200&h=200',
  },
  {
    id: 5, name: 'Mia Thompson', archetype: 'lifestyle', archetypeLabel: 'Lifestyle',
    city: 'Chicago', match: 85, applied: '2d ago', status: 'declined',
    avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&q=80&w=200&h=200',
  },
];

const ARCHETYPES = [
  { name: 'Editorial', pct: 45, color: '#C9A55A' },
  { name: 'Runway', pct: 28, color: '#0f172a' },
  { name: 'Commercial', pct: 17, color: '#94a3b8' },
  { name: 'Lifestyle', pct: 10, color: '#cbd5e1' },
];

const PIPELINE_STAGES = [
  { label: 'New', count: 47, color: '#3b82f6', pct: 52 },
  { label: 'Review', count: 12, color: '#C9A55A', pct: 13 },
  { label: 'Accepted', count: 8, color: '#22c55e', pct: 9 },
  { label: 'Declined', count: 23, color: '#94a3b8', pct: 26 },
];

// ════════════════════════════════════════════════════════════
// MINI VISUALIZATIONS (SVG)
// ════════════════════════════════════════════════════════════

function Sparkline() {
  const points = [12, 18, 14, 22, 20, 28, 35, 31, 40, 38, 47];
  const max = Math.max(...points);
  const min = Math.min(...points);
  const w = 80, h = 32;
  const path = points
    .map((v, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - ((v - min) / (max - min)) * h;
      return `${i === 0 ? 'M' : 'L'}${x},${y}`;
    })
    .join(' ');

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="ov-sparkline">
      <defs>
        <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={path + ` L${w},${h} L0,${h} Z`} fill="url(#sparkGrad)" />
      <path d={path} fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ProgressRing({ pct, size = 56, stroke = 5 }: { pct: number, size?: number, stroke?: number }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;
  return (
    <svg width={size} height={size} className="ov-ring">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#f1f0ee" strokeWidth={stroke} />
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke="#C9A55A" strokeWidth={stroke}
        strokeDasharray={c} strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        className="ov-ring-progress"
      />
      <text x="50%" y="50%" textAnchor="middle" dy="0.35em" className="ov-ring-text">
        {pct}%
      </text>
    </svg>
  );
}

function MiniBars() {
  const bars = [
    { label: 'SS26', pct: 50, color: '#C9A55A' },
    { label: 'FW25', pct: 33, color: '#0f172a' },
    { label: 'Res.', pct: 17, color: '#94a3b8' },
  ];
  return (
    <div className="ov-minibars">
      {bars.map(b => (
        <div key={b.label} className="ov-minibar-row">
          <span className="ov-minibar-label">{b.label}</span>
          <div className="ov-minibar-track">
            <div className="ov-minibar-fill" style={{ width: `${b.pct}%`, background: b.color }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function CalendarDots() {
  // 7 days, some have interviews
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const active = [true, false, true, true, false, true, false];
  return (
    <div className="ov-cal-dots">
      {days.map((d, i) => (
        <div key={i} className="ov-cal-day">
          <span className="ov-cal-letter">{d}</span>
          <span className={`ov-cal-dot ${active[i] ? 'ov-cal-dot--on' : ''}`} />
        </div>
      ))}
    </div>
  );
}

export default function SceneAgencyView() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const mockupY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0px", "0px"] : ["50px", "-50px"]
  );

  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 15 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring" as const, stiffness: 60, damping: 14 }
    }
  };


  return (
    <section
      id="agencies"
      ref={sectionRef}
      className="relative py-28 md:py-40 overflow-hidden texture-grain"
      style={{ backgroundColor: "var(--color-cream)" }}
    >
      {/* Subtle decorative line */}
      <div className="absolute top-0 inset-x-0 h-px divider-gold-center" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-16 lg:gap-24 items-center">
          {/* Top: narrative */}
          <motion.div
            className="text-center flex flex-col items-center max-w-3xl"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className="text-label mb-6 block"
              style={{ color: "var(--color-gold)" }}
            >
              Agency Perspective
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl mb-7 leading-[1.05]">
              See how agencies{" "}
              <span
                className="font-editorial-italic"
                style={{ color: "var(--color-gold)" }}
              >
                see you.
              </span>
            </h2>
            <p
              className="text-base md:text-lg leading-relaxed mb-10"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Agencies use Pholio to discover, filter, and shortlist talent.
              Your verified profile is their first impression — and the one
              they bookmark.
            </p>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
              {[
                "340+ partner agencies actively scouting",
                "Real-time application status",
                "Visibility into profile views",
                "Direct messaging from verified agencies",
              ].map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <div
                    className="h-1 w-1 rounded-full shrink-0"
                    style={{ backgroundColor: "var(--color-gold)" }}
                  />
                  <span
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {f}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Bottom: Agency dashboard mockup — parallax outer, reveal inner */}
          <motion.div style={{ y: mockupY }} className="relative z-10 w-full max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="w-full relative shadow-2xl rounded-2xl overflow-hidden bg-[#F8F7F4] border border-[#E8E5E1]"
            >
              {/* Fake Window Header */}
              <div className="flex items-center px-4 py-3 bg-[#ffffff] border-b border-[#E8E5E1]">
                <div className="flex gap-2 mr-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e]/80"></div>
                </div>
                <div className="flex-1 text-center">
                  <div className="inline-flex items-center gap-2 bg-[#f4f4f5] px-3 py-1 rounded text-[10px] font-medium text-gray-500">
                    <span className="w-3 h-3 text-[#C9A55A]">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                      </svg>
                    </span>
                    agency.pholio.com/dashboard
                  </div>
                </div>
              </div>

              {/* Main App Layout */}
              <div className="flex h-[800px] overflow-hidden bg-[#F8F7F4] text-left">
                
                {/* Agency Sidebar Mockup */}
                <div className="w-[240px] border-r border-[#E8E5E1] bg-white flex flex-col shrink-0 hidden md:flex">
                  <div className="px-6 py-8">
                    {/* Logo Mock */}
                    <div className="font-serif text-lg tracking-[0.2em] text-[#0f172a] mb-12">PHOLIO</div>
                    
                    {/* Nav Links */}
                    <nav className="flex flex-col gap-2">
                      <div className="flex items-center gap-3 px-3 py-2 bg-[#f4f4f5] text-[#0f172a] rounded-lg font-medium text-sm">
                        <svg className="w-4 h-4 text-[#C9A55A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                        Overview
                      </div>
                      <div className="flex items-center gap-3 px-3 py-2 text-gray-500 hover:text-[#0f172a] hover:bg-gray-50 rounded-lg font-medium text-sm transition-colors">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                        Discover
                      </div>
                      <div className="flex items-center gap-3 px-3 py-2 text-gray-500 hover:text-[#0f172a] hover:bg-gray-50 rounded-lg font-medium text-sm transition-colors">
                        <div className="flex justify-between items-center w-full">
                          <div className="flex items-center gap-3">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                            Applicants
                          </div>
                          <span className="bg-[#22c55e]/10 text-[#16a34a] text-[10px] font-bold px-1.5 py-0.5 rounded-full">47</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 px-3 py-2 text-gray-500 hover:text-[#0f172a] hover:bg-gray-50 rounded-lg font-medium text-sm transition-colors">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
                        Castings
                      </div>
                      <div className="flex items-center gap-3 px-3 py-2 text-gray-500 hover:text-[#0f172a] hover:bg-gray-50 rounded-lg font-medium text-sm transition-colors">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>
                        Boards
                      </div>
                    </nav>
                  </div>

                  <div className="mt-auto px-6 py-6 border-t border-[#E8E5E1]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#0f172a] text-white flex items-center justify-center text-xs font-medium">SO</div>
                      <div>
                        <div className="text-sm font-medium text-[#0f172a]">Sarah O.</div>
                        <div className="text-[10px] text-gray-500">Elite Agency NYC</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main 1:1 Content Replica */}
                <div className="flex-1 overflow-y-auto w-full relative">
                  <motion.div 
                    className="ov-page"
                    initial="hidden"
                    animate={inView ? "show" : "hidden"}
                    variants={containerVars}
                  >
              
                    {/* ── Hero Welcome Block ── */}
                    <motion.section className="ov-hero" variants={itemVars}>
                      <div className="ov-hero-content">
                        <h1 className="ov-hero-title ov-hero-title-gold">
                          <span className="ov-hero-line">Good evening, Sarah.</span>
                          <span className="ov-hero-line">Here&apos;s where your roster stands today.</span>
                        </h1>
                        <p className="ov-hero-sub">
                          <span className="ov-stat-label">Spring ’26</span>
                          <span className="ov-hero-div">|</span>
                          <span className="ov-stat-wrap"><span className="ov-stat-num">6</span> <span className="ov-stat-label">active castings</span></span>
                          <span className="ov-hero-div">|</span>
                          <span className="ov-stat-wrap"><span className="ov-stat-num">47</span> <span className="ov-stat-label">new applications</span></span>
                        </p>
                      </div>
                    </motion.section>
              
                    {/* ── Row 1: KPI cards ── */}
                    <motion.div className="ov-kpi-grid" variants={itemVars}>
                      <motion.div className="ov-kpi">
                        <div className="ov-kpi-head">
                          <span className="ov-kpi-label">Applications</span>
                          <span className="ov-kpi-change positive">+12</span>
                        </div>
                        <div className="ov-kpi-body">
                          <span className="ov-kpi-number">47</span>
                          <Sparkline />
                        </div>
                      </motion.div>
              
                      <motion.div className="ov-kpi">
                        <div className="ov-kpi-head">
                          <span className="ov-kpi-label">Match Score</span>
                          <a href="#" className="ov-kpi-link">View more</a>
                        </div>
                        <div className="ov-kpi-body ov-kpi-body--center">
                          <ProgressRing pct={91} />
                        </div>
                      </motion.div>
              
                      <motion.div className="ov-kpi">
                        <div className="ov-kpi-head">
                          <span className="ov-kpi-label">Shortlisted</span>
                          <a href="#" className="ov-kpi-link">View more</a>
                        </div>
                        <div className="ov-kpi-body">
                          <span className="ov-kpi-number">12</span>
                          <MiniBars />
                        </div>
                      </motion.div>
              
                      <motion.div className="ov-kpi">
                        <div className="ov-kpi-head">
                          <span className="ov-kpi-label">Interviews</span>
                          <span className="ov-kpi-sub-label">This week</span>
                        </div>
                        <div className="ov-kpi-body">
                          <span className="ov-kpi-number">8</span>
                          <CalendarDots />
                        </div>
                      </motion.div>
                    </motion.div>
              
                    {/* ── Row 2: Applications + Promo ── */}
                    <motion.div className="ov-row-2" variants={itemVars}>
                      {/* Applications card */}
                      <motion.div className="ov-card ov-card--apps">
                        <div className="ov-card-header">
                          <h2 className="ov-card-title">New Applications</h2>
                          <button className="ov-sort-btn">
                            Newest
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
                          </button>
                        </div>
              
                        <div className="ov-app-list">
                          {PIPELINE.map(t => (
                            <motion.div
                              key={t.id}
                              className="ov-app-row p-0 pointer-events-none"
                            >
                              <img src={t.avatar} alt={t.name} className="ov-app-avatar" />
                              <div className="ov-app-info">
                                <span className="ov-app-name">{t.name}</span>
                                <span className="ov-app-meta">
                                  <span className="ov-app-badge">{t.archetypeLabel}</span>
                                  {t.city} · {t.applied}
                                </span>
                              </div>
                              <span className="ov-app-match">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                                {t.match}%
                              </span>
                            </motion.div>
                          ))}
                        </div>
              
                        <button className="ov-view-all cursor-default">
                          View all 47 applications
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 19L19 5M19 5v14M19 5h-14"/></svg>
                        </button>
                      </motion.div>
              
                      {/* Dark editorial promo card */}
                      <motion.div className="ov-promo">
                        <div className="ov-promo-content">
                          <span className="ov-promo-eyebrow">DISCOVER</span>
                          <h3 className="ov-promo-heading">Explore New Talent</h3>
                          <p className="ov-promo-body">
                            Browse AI-matched profiles from our curated talent network. Updated in real time.
                          </p>
                          <div className="ov-promo-cta cursor-default w-fit">
                            Discover
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 19L19 5M19 5v14M19 5h-14"/></svg>
                          </div>
                        </div>
                        <div className="ov-promo-glow" />
                      </motion.div>
                    </motion.div>
              
                    {/* ── Row 3: Pipeline + Archetypes ── */}
                    <motion.div className="ov-row-3" variants={itemVars}>
                      {/* Pipeline card */}
                      <motion.div className="ov-card">
                        <div className="ov-card-header">
                          <h2 className="ov-card-title">Pipeline</h2>
                        </div>
              
                        {/* Stacked bar */}
                        <div className="ov-pipeline-bar">
                          {PIPELINE_STAGES.map(s => (
                            <div
                              key={s.label}
                              className="ov-pipeline-seg"
                              style={{ width: `${s.pct}%`, background: s.color }}
                              title={`${s.label}: ${s.count}`}
                            />
                          ))}
                        </div>
              
                        <div className="ov-pipeline-legend">
                          {PIPELINE_STAGES.map(s => (
                            <div key={s.label} className="ov-legend-item">
                              <span className="ov-legend-dot" style={{ background: s.color }} />
                              <span className="ov-legend-label">{s.label}</span>
                              <span className="ov-legend-count">{s.count}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
              
                      {/* Archetypes card */}
                      <motion.div className="ov-card">
                        <div className="ov-card-header">
                          <h2 className="ov-card-title">Archetypes</h2>
                        </div>
              
                        <div className="ov-arch-list">
                          {ARCHETYPES.map(a => (
                            <div key={a.name} className="ov-arch-row">
                              <div className="ov-arch-top">
                                <span className="ov-arch-name">{a.name}</span>
                                <span className="ov-arch-pct">{a.pct}%</span>
                              </div>
                              <div className="ov-arch-track">
                                <div className="ov-arch-fill" style={{ width: `${a.pct}%`, background: a.color }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
