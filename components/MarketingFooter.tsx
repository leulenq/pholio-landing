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
      { label: "For Agencies", href: `${APP_URL}/login` },
      { label: "Studio+", href: `${APP_URL}/studio-plus` },
    ],
  },
  {
    title: "COMPANY",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "mailto:support@pholio.studio" },
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

export default function MarketingFooter() {
  return (
    <div
      className="w-full pt-[16px] px-4 md:px-8 pb-10"
      style={{ backgroundColor: "var(--color-cream)" }}
    >
      <div className="mx-auto w-full max-w-[1600px] flex flex-col gap-4">
        {/* =========================================
            CARD 1 — CTA CARD (dark, rounded)
            ========================================= */}
        <div
          className="flex flex-col items-center text-center w-full"
          style={{
            backgroundColor: "var(--color-ink)",
            borderRadius: "32px",
            padding: "100px 40px",
          }}
        >
          {/* Eyebrow */}
          <span
            className="uppercase"
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 500,
              fontSize: "11px",
              color: "#C9A55A",
              letterSpacing: "0.15em",
              marginBottom: "20px",
            }}
          >
            YOUR NEXT MOVE
          </span>

          {/* Headline */}
          <h2 style={{ marginBottom: "16px", margin: 0, padding: 0 }}>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                fontSize: "52px",
                color: "white",
              }}
            >
              Ready to be{" "}
            </span>
            <span
              className="italic"
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 700,
                fontSize: "52px",
                color: "#C9A55A",
              }}
            >
              seen?
            </span>
          </h2>

          {/* Subtext */}
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 400,
              fontSize: "16px",
              color: "#94a3b8",
              marginTop: "16px",
              maxWidth: "440px",
              margin: "16px auto 0 auto", // Center block
            }}
          >
            Join the platform that top agencies use to scout verified talent.
          </p>

          {/* Buttons Row */}
          <div className="flex flex-row items-center justify-center gap-[16px] mt-[40px]">
            {/* Button 1 */}
            <a
              href={`${APP_URL}/signup`}
              className="uppercase transition-transform duration-300 hover:scale-[1.02]"
              style={{
                backgroundColor: "#C9A55A",
                color: "#0f172a",
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: "13px",
                letterSpacing: "0.08em",
                borderRadius: "100px",
                padding: "14px 32px",
                display: "inline-block",
                textDecoration: "none",
              }}
            >
              START CASTING
            </a>

            {/* Button 2 */}
            <a
              href={`${APP_URL}/login`}
              className="uppercase transition-colors duration-300 group"
              style={{
                backgroundColor: "transparent",
                border: "1px solid #2d3f55",
                color: "white",
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                fontSize: "13px",
                letterSpacing: "0.08em",
                borderRadius: "100px",
                padding: "14px 32px",
                display: "inline-block",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#C9A55A";
                e.currentTarget.style.color = "#C9A55A";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#2d3f55";
                e.currentTarget.style.color = "white";
              }}
            >
              AGENCY LOGIN
            </a>
          </div>
        </div>

        {/* =========================================
            CARD 2 — FOOTER CARD (light, rounded)
            ========================================= */}
        <div
          className="w-full"
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "32px",
            padding: "64px 64px 40px 64px",
            marginBottom: "40px",
            boxShadow: "0 20px 40px -10px rgba(0,0,0,0.03)",
          }}
        >
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
                  }}
                  className="text-ink uppercase transition-colors duration-300 relative group-hover:text-[#c9a55a]"
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
                The industry standard for talent portfolios. AI-curated,
                visually stunning, and directly connected to top global
                agencies.
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
                      color: "#0f172a",
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
                          color: "#64748b",
                          lineHeight: 2.4,
                          display: "block",
                          textDecoration: "none",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "#C9A55A")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "#64748b")
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
              backgroundColor: "#f1f5f9",
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
                    (e.currentTarget.style.color = "#0f172a")
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
