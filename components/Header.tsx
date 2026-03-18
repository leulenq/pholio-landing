"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ExternalLink, Settings, LogOut, Sparkles } from "lucide-react";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export default function Header() {
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [isAtHero, setIsAtHero] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(true);
  const [authData, setAuthData] = useState<{
    authenticated?: boolean;
    role?: string;
    profile?: { profile_image?: string; first_name?: string; last_name?: string; slug?: string };
    user?: { email?: string };
    subscription?: { isPro?: boolean };
    completeness?: { percentage?: number };
  } | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        const response = await fetch(`/api/public/session`, {
          credentials: "include", 
        });
        
        if (response.ok) {
          const data = await response.json();
          setIsAuthenticated(data.authenticated === true);
          if (data.authenticated) setAuthData(data);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error("Failed to check auth status:", err);
        setIsAuthenticated(false);
      } finally {
        setIsLoadingAuth(false);
      }
    };

    checkAuth();
  }, []);

  // Handle initial scroll state and visibility
  useEffect(() => {
    const updateVisibility = () => {
      const vh = window.innerHeight;
      const currentScroll = window.scrollY;
      const isHeroPage = pathname === "/" || pathname === "/for-talent";

      if (isHeroPage && currentScroll < vh) {
        setIsAtHero(true);
      } else {
        setIsAtHero(false);
      }
    };

    updateVisibility();
    // Also listen to standard window scroll for secondary checks if needed, 
    // although useMotionValueEvent handles the "change" part.
  }, [pathname]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const isHeroPage = pathname === "/" || pathname === "/for-talent";
    const vh = typeof window !== 'undefined' ? window.innerHeight : 1000;

    // Hide header if on a hero page and within first 100vh
    if (isHeroPage && latest < vh) {
      setIsAtHero(true);
    } else {
      setIsAtHero(false);
    }

    const previous = scrollY.getPrevious() || 0;
    if (latest > 120 && latest > previous) {
      setHidden(true);
      setIsMobileMenuOpen(false);
    } else {
      setHidden(false);
    }
  });

  const links = [
    { label: "ABOUT", href: "/about-us" },
    { label: "CAREERS", href: "/careers" },
    { label: "FOR TALENT", href: "/for-talent" },
    { label: "FOR AGENCIES", href: "/#agencies" },
    { label: "PLATFORM", href: "/#platform" },
    { label: "STUDIO+", href: "/#studio-plus" },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isAtHero ? "opacity-0 pointer-events-none translate-y-[-10px]" : "opacity-100 pointer-events-auto"
      }`}
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      initial="visible"
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="w-full px-6 lg:px-12 py-4 max-w-[1440px] mx-auto mt-2">
        <div className="flex items-center justify-between pointer-events-auto transition-all duration-500">
          {/* Logo */}
          <Link
            href="/"
            className="flex flex-col items-center justify-center z-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 group"
          >
            <div className="flex items-center overflow-hidden pt-1 block" style={{ height: "36px" }}>
              {"PHOLIO".split("").map((letter, i) => (
                <motion.span
                  key={i}
                  className="text-2xl sm:text-3xl"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontWeight: 400,
                    letterSpacing: "0.2em",
                    color: "rgba(220, 230, 245, 0.95)",
                    transition: "color 0.3s ease",
                    display: "inline-block",
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.15 + i * 0.05,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <span className="group-hover:text-[#C9A55A] transition-colors duration-300">
                    {letter}
                  </span>
                </motion.span>
              ))}
            </div>
            {/* Gold sweep underline on hover */}
            <div
              className="mt-1 h-[1.5px] rounded-full w-0 group-hover:w-full transition-all duration-500 ease-out"
              style={{
                background:
                  "linear-gradient(to right, transparent, #C9A55A, transparent)",
              }}
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-50">
            <nav
              className="flex items-center p-1.5 rounded-full relative"
              style={{
                backgroundColor: "rgba(20, 25, 30, 0.4)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 4px 24px -4px rgba(0, 0, 0, 0.2)",
              }}
              onMouseLeave={() => setHoveredLink(null)}
            >
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="relative px-6 py-2.5 text-[11px] font-medium tracking-[0.2em] uppercase transition-colors duration-300 focus:outline-none rounded-full"
                  style={{
                    color:
                      hoveredLink === link.label
                        ? "rgba(255, 255, 255, 1)"
                        : "rgba(255, 255, 255, 0.6)",
                  }}
                  onMouseEnter={() => setHoveredLink(link.label)}
                >
                  {hoveredLink === link.label && (
                    <motion.div
                      layoutId="header-pill-highlight"
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 35,
                      }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          <div
            className="hidden md:flex items-center gap-5 z-50 transition-opacity duration-300"
            style={{ opacity: isLoadingAuth ? 0.3 : 1 }}
          >
            {!isLoadingAuth && isAuthenticated ? (
              <div className="profile-trigger-container" ref={dropdownRef}>
                <button 
                  type="button" 
                  className="profile-trigger-refined !pr-4"
                  aria-label="User menu" 
                  aria-expanded={isProfileOpen}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsProfileOpen(!isProfileOpen);
                  }}
                >
                  <div className="avatar-container">
                    {authData?.profile?.profile_image ? (
                      <img src={authData.profile.profile_image} alt="Profile" className="avatar-image" />
                    ) : (
                      <div className="avatar-initials">
                        {authData?.profile?.first_name?.[0]?.toUpperCase() || authData?.user?.email?.[0]?.toUpperCase() || '?'}
                      </div>
                    )}
                    <div className={`subscription-badge ${authData?.subscription?.isPro ? 'pro' : 'free'}`} />
                  </div>
                  
                  <span className="text-[13px] font-medium text-white/95 tracking-wide px-1 whitespace-nowrap">
                    {authData?.profile?.first_name 
                      ? `${authData.profile.first_name}${authData.profile.last_name ? ` ${authData.profile.last_name}` : ''}` 
                      : authData?.user?.email?.split('@')[0] || 'User'}
                  </span>

                  <ChevronDown 
                    size={14} 
                    className={`trigger-chevron ${isProfileOpen ? 'rotate' : ''} text-white/70 ml-1`} 
                  />
                </button>

                {isProfileOpen && (
                  <div className="profile-dropdown-refined">
                    {/* Compact Identity Header */}
                    <div className="dropdown-identity-compact">
                      <div className="identity-avatar">
                        {authData?.profile?.profile_image ? (
                          <img src={authData.profile.profile_image} alt="" />
                        ) : (
                          <div className="avatar-initials">
                            {authData?.profile?.first_name?.[0]?.toUpperCase() || authData?.user?.email?.[0]?.toUpperCase() || '?'}
                          </div>
                        )}
                      </div>
                      <div className="identity-info">
                        <div className="identity-name">
                          {authData?.profile ? `${authData.profile.first_name} ${authData.profile.last_name}` : '...'}
                        </div>
                        <div className="identity-email">{authData?.user?.email || ''}</div>
                        <div className="identity-meta">
                          <span className="role-badge">{authData?.role === 'TALENT' ? 'Talent' : 'Agency'}</span>
                          <span className="tier-badge">{authData?.subscription?.isPro ? 'Studio+' : 'Free'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="dropdown-divider" />

                    {/* Profile Strength Widget */}
                    {authData?.role === 'TALENT' && (
                      <>
                        <a 
                          href={`${APP_URL}/login`}
                          className="profile-strength-widget"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <div className="widget-header">
                            <span>Profile Strength</span>
                            <span className="strength-percentage">{authData?.completeness?.percentage || 0}%</span>
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

                    {/* Quick Actions */}
                    <div className="dropdown-actions dropdown-section">
                      {authData?.role === 'TALENT' && authData?.profile?.slug && (
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

                    {/* Logout */}
                    <button 
                      type="button" 
                      className="dropdown-item logout-item" 
                      onClick={async (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        try {
                          await fetch(`/api/logout`, { 
                            method: 'POST', 
                            credentials: 'include',
                            headers: { 'Accept': 'application/json' }
                          });
                          setIsProfileOpen(false);
                          window.location.reload();
                        } catch (err) {
                          console.error("Logout failed:", err);
                          setIsProfileOpen(false);
                          window.location.reload();
                        }
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
                  className="text-[11px] font-medium tracking-[0.15em] uppercase text-white/60 hover:text-white transition-colors duration-300 px-3 py-2"
                >
                  LOG IN
                </a>
                <a
                  href={`${APP_URL}/onboarding`}
                  className="relative text-[11px] font-bold tracking-[0.15em] uppercase px-6 py-3 rounded-full focus:outline-none overflow-hidden group transition-transform duration-300 hover:scale-[1.02]"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-dark) 100%)",
                    color: "var(--color-velvet)",
                    boxShadow: "0 4px 15px rgba(201, 165, 90, 0.2)",
                  }}
                >
                  <span className="relative z-10">GET SCOUTED</span>
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--color-gold-light) 0%, var(--color-gold) 100%)",
                    }}
                  />
                </a>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden z-50 p-2 relative flex flex-col justify-center items-center w-10 h-10 focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(201,165,90,0.1)] focus-visible:rounded-lg pointer-events-auto"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block absolute h-[1px] w-5 transition-all duration-200"
                style={{
                  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                  backgroundColor: isMobileMenuOpen
                    ? "var(--color-gold)"
                    : "var(--color-text-on-dark)",
                  transform: isMobileMenuOpen
                    ? i === 0
                      ? "rotate(45deg)"
                      : i === 1
                        ? "scaleX(0)"
                        : "rotate(-45deg)"
                    : i === 0
                      ? "translateY(-5px)"
                      : i === 1
                        ? "translateY(0)"
                        : "translateY(5px)",
                  opacity: isMobileMenuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <motion.div
        className="fixed inset-0 z-40 flex flex-col items-center justify-center px-8 md:hidden"
        initial={false}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          y: isMobileMenuOpen ? 0 : -20,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          pointerEvents: isMobileMenuOpen ? "auto" : "none",
          backgroundColor: "rgba(5, 5, 5, 0.97)",
          backdropFilter: "blur(40px)",
        }}
      >
        <nav className="flex flex-col items-center gap-7 mb-10">
          {links.map((link, i) => (
            <motion.div
              key={link.label}
              initial={false}
              animate={{
                opacity: isMobileMenuOpen ? 1 : 0,
                y: isMobileMenuOpen ? 0 : 20,
              }}
              transition={{
                delay: isMobileMenuOpen ? 0.1 + i * 0.06 : 0,
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                href={link.href}
                className="font-editorial text-[1.75rem] transition-colors duration-200"
                style={{ color: "rgba(255, 255, 255, 0.95)" }}
                onClick={() => setIsMobileMenuOpen(false)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--color-gold)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(255, 255, 255, 0.95)";
                }}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        <div
          className="w-12 h-[1px] mb-10"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(201,165,90,0.4), transparent)",
          }}
        />

        <div 
          className="flex flex-col items-center gap-5 transition-opacity duration-300"
          style={{ opacity: isLoadingAuth ? 0.3 : 1 }}
        >
          {!isLoadingAuth && isAuthenticated ? (
            <a
              href={`${APP_URL}/login`}
              className="btn-gold rounded-lg text-[13px] px-7 py-3.5 min-w-[140px]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span>Dashboard</span>
            </a>
          ) : (
            <>
              <a
                href={`${APP_URL}/onboarding`}
                className="btn-gold rounded-lg text-[13px] px-7 py-3.5 min-w-[140px]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>Get Scouted</span>
              </a>
              <a
                href={`${APP_URL}/login`}
                className="text-base font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(201,165,90,0.2)] focus-visible:rounded-lg px-3 py-2"
                style={{ color: "rgba(255, 255, 255, 0.75)" }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Log In
              </a>
            </>
          )}
        </div>
      </motion.div>
    </motion.header>
  );
}
