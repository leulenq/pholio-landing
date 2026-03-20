"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ExternalLink, Settings, LogOut, Sparkles } from "lucide-react";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

const LINKS = [
  { label: "TALENT", href: "/talent" },
  { label: "AGENCIES", href: "/agency" },
  { label: "STUDIO+", href: "/#studio-plus" },
];

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
      className="fixed top-0 left-0 right-0 z-50 pt-4 md:pt-6 px-4 md:px-8"
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
      {/* ── Ultra-Premium Pill Container ──────────────────────────────────────────────────── */}
      <div className="relative mx-auto w-[96%] max-w-[1280px] mt-2 sm:mt-6 rounded-[100px] p-[1px] group/header" style={{ boxShadow: isDark ? "0 40px 80px -20px rgba(0,0,0,0.8)" : "0 20px 40px -10px rgba(0,0,0,0.05)" }}>
        {/* Animated Conic Border Glow */}
        {isDark && (
          <div className="absolute inset-0 overflow-hidden rounded-[100px] opacity-60">
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
          className="relative rounded-[100px] overflow-hidden"
          style={{
            background: isDark ? "rgba(10, 10, 12, 0.75)" : "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(32px) saturate(200%)",
            WebkitBackdropFilter: "blur(32px) saturate(200%)",
            boxShadow: isDark ? "inset 0 1px 1px rgba(255,255,255,0.1)" : "inset 0 1px 1px rgba(255,255,255,0.8)",
          }}
        >
          {/* Inner Noise for Physical Texture */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.7\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', mixBlendMode: "overlay" }} />

          <div className="px-6 lg:px-8 h-[64px] flex items-center justify-between relative z-10">

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
            {LINKS.map((link) => {
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
                          href="/login"
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
                        href="/login"
                        className="dropdown-item"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <Settings size={16} />
                        <span>Account Settings</span>
                      </a>
                      {!authData?.subscription?.isPro && (
                        <a
                          href="/login"
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
                  href="/login"
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
                  href="/onboarding"
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

          {/* ── Mobile Hamburger ─────────────────────────────────── */}
          <button
            className="lg:hidden z-50 w-10 h-10 flex flex-col justify-center items-center gap-[5px] focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block w-[22px] h-[1px] transition-all duration-300"
                style={{
                  backgroundColor: isMobileMenuOpen
                    ? "#C9A55A"
                    : isDark ? "rgba(255,255,255,0.75)" : "rgba(15, 23, 42, 0.6)",
                  transform: isMobileMenuOpen
                    ? i === 0 ? "rotate(45deg) translate(4.5px, 4.5px)"
                    : i === 1 ? "scaleX(0)"
                    : "rotate(-45deg) translate(4.5px, -4.5px)"
                    : "none",
                  opacity: isMobileMenuOpen && i === 1 ? 0 : 1,
                  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
            ))}
          </button>
        </div>
      </div>
      </div>

      {/* ══ Mobile Menu Overlay ═══════════════════════════════════ */}
      <motion.div
        className="fixed inset-0 z-40 lg:hidden flex flex-col"
        initial={false}
        animate={{ opacity: isMobileMenuOpen ? 1 : 0, y: isMobileMenuOpen ? 0 : -16 }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        style={{
          pointerEvents: isMobileMenuOpen ? "auto" : "none",
          background: "rgba(5, 5, 5, 0.97)",
          backdropFilter: "blur(24px)",
        }}
      >
        <div className="flex flex-col h-full px-8 pt-[88px] pb-12">

          {/* Nav */}
          <nav className="flex-1 flex flex-col justify-center">
            {LINKS.map((link, i) => (
              <motion.div
                key={link.label}
                initial={false}
                animate={{
                  opacity: isMobileMenuOpen ? 1 : 0,
                  y: isMobileMenuOpen ? 0 : 20,
                }}
                transition={{
                  delay: isMobileMenuOpen ? 0.06 + i * 0.06 : 0,
                  duration: 0.42,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div
                  style={{ height: "1px", background: "rgba(255,255,255,0.06)" }}
                />
                <Link
                  href={link.href}
                  className="flex items-center py-[1.1rem] focus:outline-none"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontWeight: 400,
                      fontSize: "2rem",
                      letterSpacing: "-0.01em",
                      color: pathname === link.href ? "#C9A55A" : "rgba(255,255,255,0.78)",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A55A")}
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color =
                        pathname === link.href ? "#C9A55A" : "rgba(255,255,255,0.78)")
                    }
                  >
                    {link.label}
                  </span>
                </Link>
              </motion.div>
            ))}
            <div style={{ height: "1px", background: "rgba(255,255,255,0.06)" }} />
          </nav>

          {/* CTAs */}
          <motion.div
            className="flex flex-col gap-3 mt-10"
            initial={false}
            animate={{
              opacity: isMobileMenuOpen ? 1 : 0,
              y: isMobileMenuOpen ? 0 : 12,
            }}
            transition={{
              delay: isMobileMenuOpen ? 0.06 + LINKS.length * 0.06 : 0,
              duration: 0.38,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ opacity: isLoadingAuth ? 0.2 : 1 }}
          >
            {!isLoadingAuth && isAuthenticated ? (
              <a
                href={`${APP_URL}/login`}
                className="btn-gold text-[11px] px-7 py-4 text-center"
                style={{ borderRadius: "3px" }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>Dashboard</span>
              </a>
            ) : (
              <>
                <a
                  href="/onboarding"
                  className="btn-gold text-[11px] px-7 py-4 text-center"
                  style={{ borderRadius: "3px" }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>Get Scouted</span>
                </a>
                <a
                  href="/login"
                  className="text-center py-3 transition-colors duration-200"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "10px",
                    fontWeight: 500,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.3)",
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Log In
                </a>
              </>
            )}
          </motion.div>
        </div>
      </motion.div>
    </motion.header>
  );
}
