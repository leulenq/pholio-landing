"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Twitter, Instagram, Linkedin } from "lucide-react";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

const footerLinks = [
  {
    title: "PLATFORM",
    links: [
      { label: "For Talent", href: "/for-talent" },
      { label: "For Agencies", href: "/login" },
      { label: "Studio+", href: `${APP_URL}/studio-plus` },
    ],
  },
  {
    title: "COMPANY",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "LEGAL",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
  },
];

export interface MarketingFooterProps {
  theme?: "light" | "dark";
}

export default function MarketingFooter({ theme = "light" }: MarketingFooterProps) {
  const isDark = theme === "dark";

  return (
    <div
      className={`w-full pt-[16px] px-4 md:px-8 pb-10 ${isDark ? "bg-[#0A0A0F]" : ""}`}
      style={!isDark ? { backgroundColor: "var(--color-cream)" } : {}}
    >
      <div className="mx-auto w-full max-w-[1600px] flex flex-col gap-4">
        {/* =========================================
            CARD 2 — FOOTER CARD
            ========================================= */}
        <div
          className="w-full relative overflow-hidden"
          style={{
            backgroundColor: isDark ? "#111116" : "#ffffff",
            borderRadius: "32px",
            padding: "64px 64px 40px 64px",
            marginBottom: "40px",
            boxShadow: isDark
              ? "0 0 0 1px rgba(255,255,255,0.05), 0 20px 40px -10px rgba(0,0,0,0.5)"
              : "0 20px 40px -10px rgba(0,0,0,0.03)",
          }}
        >
          {isDark && (
            <div className="absolute inset-0 pointer-events-none" style={{
              background: "radial-gradient(circle at top right, rgba(201, 165, 90, 0.05), transparent 40%), radial-gradient(circle at bottom left, rgba(255, 255, 255, 0.02), transparent 40%)",
            }} />
          )}

          {/* TOP SECTION */}
          <div className="flex flex-col md:flex-row items-start justify-between w-full">
            {/* LEFT BLOCK */}
            <div style={{ maxWidth: "260px" }}>
              <Link
                href="/"
                className="inline-flex items-center gap-3 no-underline transition-transform duration-300 w-fit mb-6 group hover:translate-x-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/30 z-50"
              >
                <span
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.75rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    color: isDark ? "#ffffff" : "var(--color-ink)",
                  }}
                  className="uppercase transition-colors duration-300 relative group-hover:text-[#c9a55a]"
                >
                  PHOLIO
                </span>
                <span
                  className="w-1 rounded-sm transition-all duration-300 group-hover:scale-y-110 h-6 group-hover:h-[28px]"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(201, 165, 90, 1) 0%, rgba(201, 165, 90, 0.6) 100%)",
                  }}
                />
              </Link>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 400,
                  fontSize: "13px",
                  color: "#94a3b8",
                  lineHeight: 1.75,
                  marginTop: "10px",
                }}
              >
                Built for talent. Trusted by agencies. AI-curated portfolios,
                directly connected to top global agencies.
              </p>

              {/* Social Icons */}
              <div className="flex flex-row items-center gap-[16px] mt-[20px]">
                <a
                  href="https://twitter.com/pholiostudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-150"
                  style={{ color: "#94a3b8" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#0f172a")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#94a3b8")
                  }
                  aria-label="Twitter"
                >
                  <Twitter size={16} />
                </a>
                <a
                  href="https://instagram.com/pholiostudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-150"
                  style={{ color: "#94a3b8" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#0f172a")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#94a3b8")
                  }
                  aria-label="Instagram"
                >
                  <Instagram size={16} />
                </a>
                <a
                  href="https://linkedin.com/company/pholiostudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-150"
                  style={{ color: "#94a3b8" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#0f172a")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#94a3b8")
                  }
                  aria-label="LinkedIn"
                >
                  <Linkedin size={16} />
                </a>
              </div>
            </div>

            {/* RIGHT BLOCK (Links) */}
            <div
              className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-[40px] mt-[40px] md:mt-0"
              style={{ paddingLeft: "80px" }}
            >
              {footerLinks.map((column) => (
                <div key={column.title} className="flex flex-col">
                  <span
                    className="uppercase"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontWeight: 600,
                      fontSize: "11px",
                      color: isDark ? "#e2e8f0" : "#0f172a",
                      letterSpacing: "0.1em",
                      marginBottom: "16px",
                      display: "block",
                    }}
                  >
                    {column.title}
                  </span>
                  <div className="flex flex-col">
                    {column.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        className="transition-colors duration-150"
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontWeight: 400,
                          fontSize: "13px",
                          color: isDark ? "#94a3b8" : "#64748b",
                          lineHeight: 2.4,
                          display: "block",
                          textDecoration: "none",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "#C9A55A")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = isDark ? "#94a3b8" : "#64748b")
                        }
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM SECTION */}
          <div
            style={{
              height: "1px",
              backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "#f1f5f9",
              width: "100%",
              margin: "32px 0 20px 0",
            }}
          />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 400,
                fontSize: "12px",
                color: "#94a3b8",
              }}
            >
              &copy; {new Date().getFullYear()} Pholio Studio. All rights
              reserved.
            </span>

            <div className="flex flex-row gap-[20px]">
              {footerLinks[2].links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="transition-colors duration-150"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 400,
                    fontSize: "12px",
                    color: "#94a3b8",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = isDark ? "#ffffff" : "#0f172a")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#94a3b8")
                  }
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
