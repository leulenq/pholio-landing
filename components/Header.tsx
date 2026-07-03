"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ExternalLink, Menu, Settings, LogOut, Sparkles, X } from "lucide-react";
import { MARKETING_NAV_LINKS } from "@/lib/marketing-nav-links";
import { PHOLIO_APP_ORIGIN as APP_URL } from "@/lib/pholio-app-origin";
import { STUDIO_PLUS_SIGNUP_URL } from "@/lib/marketing-pricing";
import { usePholioAuth } from "@/lib/pholio-auth/PholioAuthProvider";

export interface HeaderProps {
  theme?: "light" | "dark";
}

export default function Header({ theme = "dark" }: HeaderProps) {
  const isDark = theme === "dark";
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [hidden, setHidden] = useState(false);
  const [isHomeHeaderActive, setIsHomeHeaderActive] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { session: authData, isLoading: isLoadingAuth, isAuthenticated, logout, dashboardHref } =
    usePholioAuth();
  const goldButtonBackground = "var(--color-gold)";
  const headerBorderSurface = isDark
    ? "linear-gradient(135deg, rgba(255,255,255,0.105) 0%, rgba(201,165,90,0.08) 42%, rgba(255,255,255,0.075) 100%)"
    : "linear-gradient(135deg, rgba(15,23,42,0.08) 0%, rgba(201,165,90,0.12) 52%, rgba(15,23,42,0.06) 100%)";
  const headerShellSurface = isDark
    ? "linear-gradient(135deg, rgba(8,8,8,0.9) 0%, rgba(18,18,18,0.78) 48%, rgba(7,7,7,0.86) 100%)"
    : "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(250,247,242,0.84) 100%)";
  const headerShellShadow = isDark
    ? "0 28px 70px -34px rgba(0,0,0,0.95), 0 0 28px -24px rgba(201,165,90,0.32)"
    : "0 18px 48px -28px rgba(15,23,42,0.28), 0 0 24px -22px rgba(201,165,90,0.24)";

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

  const getHomeHeaderActive = () => {
    if (typeof window === "undefined" || !isHomePage) return false;
    const switchTarget = document.querySelector<HTMLElement>("[data-header-switch='comp-card']");
    if (!switchTarget) return false;
    const switchOffset = Math.max(window.innerHeight * 0.78, 64);
    return switchTarget.getBoundingClientRect().top <= switchOffset;
  };

  useEffect(() => {
    if (!isHomePage) {
      setIsHomeHeaderActive(false);
      return;
    }

    const updateHomeHeaderState = () => {
      setIsHomeHeaderActive(getHomeHeaderActive());
    };

    updateHomeHeaderState();
    window.addEventListener("resize", updateHomeHeaderState);
    return () => window.removeEventListener("resize", updateHomeHeaderState);
  }, [isHomePage]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;

    if (isHomePage) {
      const shouldShowHeader = getHomeHeaderActive();
      setIsHomeHeaderActive(shouldShowHeader);

      if (!shouldShowHeader) {
        setHidden(false);
        setIsMobileMenuOpen(false);
        return;
      }

      if (!isHomeHeaderActive) {
        setHidden(false);
        return;
      }

      if (latest > 120 && latest > prev) {
        setHidden(true);
        setIsMobileMenuOpen(false);
      } else {
        setHidden(false);
      }
      return;
    }

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
      aria-hidden={isHomePage && !isHomeHeaderActive}
      style={{
        opacity: isHomePage && !isHomeHeaderActive ? 0 : 1,
        pointerEvents: isHomePage && !isHomeHeaderActive ? "none" : "auto",
        transition: "opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {/* ── Pill: compact rounded shell on mobile / full premium pill on lg+ ───────────── */}
      <div
        className="group/header relative mx-auto mt-1 w-full max-w-[1280px] rounded-2xl p-px sm:mt-2 lg:mt-6 lg:w-[96%] lg:rounded-[100px]"
        style={{
          background: headerBorderSurface,
          boxShadow: headerShellShadow,
        }}
      >
        {/* Animated conic border — desktop only */}
        {isDark && (
          <div className="absolute inset-0 hidden overflow-hidden rounded-2xl lg:block lg:rounded-[100px]">
             <motion.div
                className="absolute top-1/2 left-1/2 h-[220%] w-[220%]"
                style={{
                  originX: 0.5, originY: 0.5, x: "-50%", y: "-50%",
                  background:
                    "conic-gradient(from 145deg at 50% 50%, transparent 0deg, rgba(201,165,90,0) 96deg, rgba(201,165,90,0.035) 126deg, rgba(212,188,138,0.095) 150deg, rgba(168,137,78,0.045) 178deg, transparent 232deg, transparent 360deg)",
                  filter: "blur(1px)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
              />
          </div>
        )}

        <div
          className="relative overflow-hidden rounded-2xl lg:rounded-[100px]"
          style={{
            background: headerShellSurface,
            backdropFilter: "blur(30px) saturate(160%)",
            WebkitBackdropFilter: "blur(30px) saturate(160%)",
            boxShadow: isDark
              ? "inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(201,165,90,0.08)"
              : "inset 0 1px 0 rgba(255,255,255,0.86), inset 0 -1px 0 rgba(201,165,90,0.14)",
          }}
        >
          {/* Inner Noise for Physical Texture */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.7\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', mixBlendMode: "overlay" }} />
          {isDark && (
            <>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-8 top-0 h-px opacity-35"
                style={{ background: "linear-gradient(to right, transparent, rgba(212,188,138,0.34), transparent)" }}
              />
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute top-0 h-px w-28 md:w-40"
                style={{
                  left: "-12%",
                  background: "linear-gradient(to right, transparent, rgba(212,188,138,0.42), transparent)",
                }}
                animate={{ left: ["-12%", "112%"], opacity: [0, 0.14, 0] }}
                transition={{ duration: 16, repeat: Infinity, ease: [0.22, 1, 0.36, 1], repeatDelay: 4 }}
              />
            </>
          )}

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
	                      style={{
	                        background: isDark
	                          ? "linear-gradient(135deg, rgba(201,165,90,0.12), rgba(255,255,255,0.035))"
	                          : "linear-gradient(135deg, rgba(201,165,90,0.12), rgba(15,23,42,0.035))",
	                        boxShadow: "inset 0 0 0 1px rgba(201,165,90,0.16)",
	                      }}
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
	                      color: animatedHover ? (isDark ? "var(--color-gold-light)" : "var(--color-gold-dark)") : (isDark ? "rgba(255,255,255,0.42)" : "rgba(15, 23, 42, 0.45)"),
	                      textShadow: animatedHover && isDark ? "0 0 14px rgba(201,165,90,0.16)" : "none",
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
                          href={dashboardHref}
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
                        href={`${dashboardHref}/settings`}
                        className="dropdown-item"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <Settings size={16} />
                        <span>Account Settings</span>
                      </a>
                      {!authData?.subscription?.isPro && (
                        <a
                          href={STUDIO_PLUS_SIGNUP_URL}
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
                        setIsProfileOpen(false);
                        await logout();
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
	                  onMouseEnter={(e) => (e.currentTarget.style.color = isDark ? "rgba(212,188,138,0.92)" : "#A8894E")}
	                  onMouseLeave={(e) => (e.currentTarget.style.color = isDark ? "rgba(255,255,255,0.32)" : "rgba(15, 23, 42, 0.4)")}
	                >
                  LOG IN
                </a>

                <motion.a
                  href={`${APP_URL}/onboarding`}
                  className="relative inline-flex items-center justify-center overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A55A]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
                  initial="rest"
                  animate="rest"
                  whileHover="hover"
                  variants={{
                    rest: {
                      boxShadow:
                        "0 6px 16px -14px rgba(201,165,90,0.42), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 0 0 rgba(5,5,5,0)",
                    },
                    hover: {
                      boxShadow:
                        "0 0 0 1px rgba(201,165,90,0.2), 0 12px 30px -22px rgba(201,165,90,0.82), inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -12px 20px rgba(5,5,5,0.1)",
                    },
                  }}
                  transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    backgroundColor: goldButtonBackground,
                    color: "#050505",
                    fontFamily: "var(--font-sans)",
                    fontWeight: 700,
                    fontSize: "10px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    padding: "12px 28px",
                    borderRadius: "100px",
                    textDecoration: "none",
                    boxShadow:
                      "0 6px 16px -14px rgba(201,165,90,0.42), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 0 0 rgba(5,5,5,0)",
                    border: "0",
                  }}
                >
                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    variants={{
                      rest: { opacity: 0 },
                      hover: { opacity: 1 },
                    }}
                    transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 48%, rgba(5,5,5,0.08) 100%)",
                    }}
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
                href={dashboardHref}
                className="rounded-2xl py-4 text-center text-[11px] font-bold uppercase tracking-[0.14em] text-[#050505]"
	                style={{
		                  fontFamily: "var(--font-sans)",
			                  backgroundColor: goldButtonBackground,
			                  boxShadow: "0 6px 16px -14px rgba(201,165,90,0.42), inset 0 1px 0 rgba(255,255,255,0.12)",
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
			                    backgroundColor: goldButtonBackground,
			                    boxShadow: "0 6px 16px -14px rgba(201,165,90,0.42), inset 0 1px 0 rgba(255,255,255,0.12)",
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
