"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ExternalLink, Menu, Settings, LogOut, Sparkles, X } from "lucide-react";
import { MARKETING_NAV_LINKS } from "@/lib/marketing-nav-links";
import { PHOLIO_APP_ORIGIN as APP_URL } from "@/lib/pholio-app-origin";

export interface HeaderProps {
  theme?: "light" | "dark";
}

export default function Header({ theme = "dark" }: HeaderProps) {
  const isDark = theme === "dark";
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [isAtHero, setIsAtHero] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [authData, setAuthData] = useState<{
    authenticated?: boolean;
    role?: string;
    profile?: { profile_image?: string; first_name?: string; last_name?: string; slug?: string };
    user?: { email?: string };
    subscription?: { isPro?: boolean };
    completeness?: { percentage?: number };
  } | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || window.matchMedia("(min-width: 1024px)").matches) return;
    if (!isMobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/public/session", { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          setIsAuthenticated(data.authenticated === true);
          if (data.authenticated) setAuthData(data);
        } else {
          setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
      } finally {
        setIsLoadingAuth(false);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    const isHeroPage = pathname === "/";
    setIsAtHero(isHeroPage && window.scrollY < window.innerHeight);
  }, [pathname]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const isHeroPage = pathname === "/";
    setIsAtHero(isHeroPage && latest < window.innerHeight);
    const prev = scrollY.getPrevious() ?? 0;
    if (latest > 120 && latest > prev) {
      setHidden(true);
      setIsMobileMenuOpen(false);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-3 pt-3 md:px-8 md:pt-6 lg:px-8"
      variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
      initial="visible"
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
      style={{
        opacity: isAtHero ? 0 : 1,
        pointerEvents: isAtHero ? "none" : "auto",
        transition: "opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {/* ── Pill: compact rounded shell on mobile / full premium pill on lg+ ───────────── */}
      <div
        className={`group/header relative mx-auto mt-1 w-full max-w-[1280px] rounded-2xl p-px sm:mt-2 lg:mt-6 lg:w-[96%] lg:rounded-[100px] ${
          isDark
            ? "shadow-[0_24px_48px_-16px_rgba(0,0,0,0.75)] lg:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]"
            : "shadow-[0_16px_32px_-8px_rgba(0,0,0,0.06)] lg:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)]"
        }`}
      >
        {/* Animated conic border — desktop only */}
        {isDark && (
          <div className="absolute inset-0 hidden overflow-hidden rounded-2xl opacity-60 lg:block lg:rounded-[100px]">
             <motion.div
                className="absolute top-1/2 left-1/2 w-[300%] h-[300%]"
                style={{
                  originX: 0.5, originY: 0.5, x: "-50%", y: "-50%",
                  background: "conic-gradient(from 0deg, transparent 0%, transparent 70%, rgba(201,165,90,0.8) 90%, transparent 100%)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
          </div>
        )}

        <div
          className="relative overflow-hidden rounded-2xl lg:rounded-[100px]"
          style={{
            background: isDark ? "rgba(10, 10, 12, 0.75)" : "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(32px) saturate(200%)",
            WebkitBackdropFilter: "blur(32px) saturate(200%)",
            boxShadow: isDark ? "inset 0 1px 1px rgba(255,255,255,0.1)" : "inset 0 1px 1px rgba(255,255,255,0.8)",
          }}
        >
          {/* Inner Noise for Physical Texture */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.7\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', mixBlendMode: "overlay" }} />

          <div className="relative z-10 flex h-[54px] items-center justify-between px-4 lg:h-[64px] lg:px-8">

          {/* ── Logo ─────────────────────────────────────────────── */}
          <Link href="/" className="group flex-shrink-0 z-10 focus:outline-none relative" aria-label="Pholio home">
            <span
              className="inline-block"
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 600,
                fontSize: "1.1rem",
                letterSpacing: "0.25em",
                color: "#C9A55A",
                textShadow: isDark ? "0 2px 10px rgba(201,165,90,0.2)" : "none",
              }}
            >
              PHOLIO
            </span>
          </Link>

          {/* ── Desktop Nav ──────────────────────────────────────── */}
          <nav
            className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-1"
            onMouseLeave={() => setHoveredLink(null)}
          >
            {MARKETING_NAV_LINKS.map((link) => {
              const animatedHover = hoveredLink === link.label;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className="relative px-5 py-2 rounded-full focus:outline-none"
                  onMouseEnter={() => setHoveredLink(link.label)}
                >
                  {animatedHover && (
                    <motion.div
                      layoutId="header-nav-hover"
                      className="absolute inset-0 rounded-full"
                      style={{ background: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0,0,0,0.04)" }}
                      transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                    />
                  )}
                  <span
                    className="relative z-10 transition-colors duration-200"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "10px",
                      fontWeight: 600,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: animatedHover ? (isDark ? "#ffffff" : "#0f172a") : (isDark ? "rgba(255,255,255,0.4)" : "rgba(15, 23, 42, 0.4)"),
                    }}
                  >
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* ── Right CTAs ───────────────────────────────────────── */}
          <div
            className="hidden lg:flex items-center gap-5 z-10"
            style={{ opacity: isLoadingAuth ? 0 : 1, transition: "opacity 0.3s ease" }}
          >
            {!isLoadingAuth && isAuthenticated ? (
              <div className="profile-trigger-container" ref={dropdownRef}>
                <button
                  type="button"
                  className="profile-trigger-refined !pr-4"
                  aria-label="User menu"
                  aria-expanded={isProfileOpen}
                  onClick={(e) => { e.stopPropagation(); setIsProfileOpen(!isProfileOpen); }}
                >
                  <div className="avatar-container">
                    {authData?.profile?.profile_image ? (
                      <img src={authData.profile.profile_image} alt="Profile" className="avatar-image" />
                    ) : (
                      <div className="avatar-initials">
                        {authData?.profile?.first_name?.[0]?.toUpperCase() ||
                          authData?.user?.email?.[0]?.toUpperCase() || "?"}
                      </div>
                    )}
                    <div className={`subscription-badge ${authData?.subscription?.isPro ? "pro" : "free"}`} />
                  </div>
                  <span className={`text-[13px] font-medium tracking-wide px-1 whitespace-nowrap ${isDark ? "text-white/90" : "text-[#0f172a]"}`}>
                    {authData?.profile?.first_name
                      ? `${authData.profile.first_name}${authData.profile.last_name ? ` ${authData.profile.last_name}` : ""}`
                      : authData?.user?.email?.split("@")[0] || "User"}
                  </span>
                  <ChevronDown
                    size={13}
                    className={`trigger-chevron ${isProfileOpen ? "rotate" : ""} ${isDark ? "text-white/50" : "text-slate-400"} ml-1`}
                  />
                </button>

                {isProfileOpen && (
                  <div className="profile-dropdown-refined">
                    <div className="dropdown-identity-compact">
                      <div className="identity-avatar">
                        {authData?.profile?.profile_image ? (
                          <img src={authData.profile.profile_image} alt="" />
                        ) : (
                          <div className="avatar-initials">
                            {authData?.profile?.first_name?.[0]?.toUpperCase() ||
                              authData?.user?.email?.[0]?.toUpperCase() || "?"}
                          </div>
                        )}
                      </div>
                      <div className="identity-info">
                        <div className="identity-name">
                          {authData?.profile
                            ? `${authData.profile.first_name} ${authData.profile.last_name}`
                            : "..."}
                        </div>
                        <div className="identity-email">{authData?.user?.email || ""}</div>
                        <div className="identity-meta">
                          <span className="role-badge">
                            {authData?.role === "TALENT" ? "Talent" : "Agency"}
                          </span>
                          <span className="tier-badge">
                            {authData?.subscription?.isPro ? "Studio+" : "Free"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="dropdown-divider" />
                    {authData?.role === "TALENT" && (
                      <>
                        <a
                          href={`${APP_URL}/login`}
                          className="profile-strength-widget"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <div className="widget-header">
                            <span>Profile Strength</span>
                            <span className="strength-percentage">
                              {authData?.completeness?.percentage || 0}%
                            </span>
                          </div>
                          <div className="strength-progress-bar">
                            <div
                              className="progress-fill"
                              style={{ width: `${authData?.completeness?.percentage || 0}%` }}
                            />
                          </div>
                        </a>
                        <div className="dropdown-divider" />
                      </>
                    )}
                    <div className="dropdown-actions dropdown-section">
                      {authData?.role === "TALENT" && authData?.profile?.slug && (
                        <a
                          href={`${APP_URL}/talent/${authData.profile.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="dropdown-item"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <ExternalLink size={16} />
                          <span>View Public Profile</span>
                        </a>
                      )}
                      <a
                        href={`${APP_URL}/login`}
                        className="dropdown-item"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <Settings size={16} />
                        <span>Account Settings</span>
                      </a>
                      {!authData?.subscription?.isPro && (
                        <a
                          href={`${APP_URL}/login`}
                          className="dropdown-item upgrade-item"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <Sparkles size={16} />
                          <span>Upgrade to Studio+</span>
                        </a>
                      )}
                    </div>
                    <div className="dropdown-divider" />
                    <button
                      type="button"
                      className="dropdown-item logout-item"
                      onClick={async (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        try {
                          await fetch("/api/logout", {
                            method: "POST",
                            credentials: "include",
                            headers: { Accept: "application/json" },
                          });
                        } catch {
                          // ignore
                        }
                        setIsProfileOpen(false);
                        window.location.reload();
                      }}
                    >
                      <LogOut size={16} />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <a
                  href={`${APP_URL}/login`}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "10px",
                    fontWeight: 500,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: isDark ? "rgba(255,255,255,0.32)" : "rgba(15, 23, 42, 0.4)",
                    transition: "color 0.2s ease",
                    padding: "0.5rem 0.25rem",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = isDark ? "rgba(255,255,255,0.75)" : "#C9A55A")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = isDark ? "rgba(255,255,255,0.32)" : "rgba(15, 23, 42, 0.4)")}
                >
                  LOG IN
                </a>

                <motion.a
                  href={`${APP_URL}/onboarding`}
                  className="group relative inline-flex items-center justify-center overflow-hidden"
                  whileHover="hover"
                  style={{
                    background: "linear-gradient(135deg, #DFBE76 0%, #A88C44 100%)",
                    color: "#050505",
                    fontFamily: "var(--font-sans)",
                    fontWeight: 700,
                    fontSize: "10px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    padding: "12px 28px",
                    borderRadius: "100px",
                    textDecoration: "none",
                    boxShadow: "0 10px 30px -5px rgba(201,165,90,0.4), inset 0 1px 0 rgba(255,255,255,0.3)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <motion.div
                    className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                    variants={{
                      hover: { x: ["-150%", "150%"], transition: { duration: 0.6, ease: "easeInOut" } }
                    }}
                    initial={{ x: "-150%" }}
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    GET SCOUTED
                  </span>
                </motion.a>
              </>
            )}
          </div>

          {/* ── Mobile menu trigger (lg+ unchanged) ───────────────── */}
          <button
            type="button"
            className="z-50 flex h-10 w-10 items-center justify-center rounded-xl border focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A55A]/40 lg:hidden"
            style={{
              borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(15,23,42,0.1)",
              backgroundColor: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
              color: isMobileMenuOpen ? "#C9A55A" : isDark ? "rgba(255,255,255,0.85)" : "rgba(15,23,42,0.75)",
            }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={20} strokeWidth={1.75} /> : <Menu size={20} strokeWidth={1.75} />}
          </button>
        </div>
      </div>
      </div>

      {/* ══ Mobile menu — lg+ hidden; desktop nav unchanged ═══════ */}
      <motion.div
        className="fixed inset-0 z-40 flex flex-col lg:hidden"
        initial={false}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          pointerEvents: isMobileMenuOpen ? "auto" : "none",
        }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: "rgba(5, 5, 5, 0.98)",
          backdropFilter: "blur(20px)",
          paddingTop: "max(5.5rem, env(safe-area-inset-top))",
        }}
      >
        <div className="flex h-[calc(100dvh-max(5.5rem,env(safe-area-inset-top)))] flex-col px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          <div className="mb-6 flex items-center justify-between border-b border-white/[0.08] pb-4">
            <span
              className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/35"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Menu
            </span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/12 text-white/70 transition-colors hover:bg-white/[0.06]"
            >
              <X size={20} strokeWidth={1.75} />
            </button>
          </div>

          <nav className="flex min-h-0 flex-1 flex-col justify-center gap-0 overflow-y-auto">
            {MARKETING_NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.label}
                initial={false}
                animate={{
                  opacity: isMobileMenuOpen ? 1 : 0,
                  x: isMobileMenuOpen ? 0 : 12,
                }}
                transition={{
                  delay: isMobileMenuOpen ? 0.04 + i * 0.05 : 0,
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  href={link.href}
                  className="block border-b border-white/[0.06] py-5 focus:outline-none focus-visible:bg-white/[0.04]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontWeight: 400,
                      fontSize: "clamp(1.75rem, 6vw, 2.125rem)",
                      letterSpacing: "-0.02em",
                      color: pathname === link.href ? "#C9A55A" : "rgba(255,255,255,0.88)",
                    }}
                  >
                    {link.label}
                  </span>
                </Link>
              </motion.div>
            ))}
          </nav>

          <motion.div
            className="mt-6 flex shrink-0 flex-col gap-3 border-t border-white/[0.08] pt-6"
            initial={false}
            animate={{
              opacity: isMobileMenuOpen ? 1 : 0,
              y: isMobileMenuOpen ? 0 : 10,
            }}
            transition={{
              delay: isMobileMenuOpen ? 0.12 + MARKETING_NAV_LINKS.length * 0.04 : 0,
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ opacity: isLoadingAuth ? 0.25 : 1 }}
          >
            {!isLoadingAuth && isAuthenticated ? (
              <a
                href={`${APP_URL}/login`}
                className="rounded-2xl py-4 text-center text-[11px] font-bold uppercase tracking-[0.14em] text-[#050505]"
                style={{
                  fontFamily: "var(--font-sans)",
                  background: "linear-gradient(135deg, #DFBE76 0%, #A88C44 100%)",
                  boxShadow: "0 8px 24px rgba(201,165,90,0.2)",
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Open dashboard
              </a>
            ) : (
              <>
                <a
                  href={`${APP_URL}/onboarding`}
                  className="rounded-2xl py-4 text-center text-[11px] font-bold uppercase tracking-[0.14em] text-[#050505]"
                  style={{
                    fontFamily: "var(--font-sans)",
                    background: "linear-gradient(135deg, #DFBE76 0%, #A88C44 100%)",
                    boxShadow: "0 8px 24px rgba(201,165,90,0.2)",
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get scouted
                </a>
                <a
                  href={`${APP_URL}/login`}
                  className="py-3 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-white/40"
                  style={{ fontFamily: "var(--font-sans)" }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Log in
                </a>
              </>
            )}
          </motion.div>
        </div>
      </motion.div>
    </motion.header>
  );
}
