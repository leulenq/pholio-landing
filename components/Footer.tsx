"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

const footerLinks = [
  {
    title: "Platform",
    links: [
      { label: "For Talent", href: `${APP_URL}/casting` },
      { label: "For Agencies", href: `${APP_URL}/login` },
      { label: "Studio+", href: `${APP_URL}/studio-plus` },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "mailto:support@pholio.studio" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
  },
];

const ease = [0.4, 0, 0.2, 1] as const;

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden py-24 sm:py-32"
      style={{
        background:
          "linear-gradient(180deg, var(--color-cream), var(--color-cream-warm))",
        borderTop: "1px solid rgba(0,0,0,0.05)",
      }}
    >
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-16 md:gap-8">
          {/* Brand Column */}
          <motion.div
            className="flex flex-col max-w-sm"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease }}
          >
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
              className="text-base leading-[1.6]"
              style={{ color: "var(--color-text-secondary)" }}
            >
              The industry standard for talent portfolios. AI-curated, visually
              stunning, and directly connected to top global agencies.
            </p>
            <div className="mt-8">
              <a
                href={`${APP_URL}/casting`}
                className="text-xs font-semibold tracking-widest uppercase transition-colors duration-300"
                style={{ color: "var(--color-gold)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--color-gold-hover)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--color-gold)";
                }}
              >
                Join the Roster &rarr;
              </a>
            </div>
          </motion.div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 sm:gap-16">
            {footerLinks.map((column, colIndex) => (
              <motion.div
                key={column.title}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.05 * (colIndex + 1),
                  ease,
                }}
              >
                <h3
                  className="text-xs font-semibold mb-6 tracking-widest uppercase"
                  style={{ color: "var(--color-ink)" }}
                >
                  {column.title}
                </h3>
                <ul className="flex flex-col gap-4">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-cream)] focus-visible:ring-[rgba(201,165,90,0.5)] block py-1"
                        style={{ color: "var(--color-text-secondary)" }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "var(--color-ink)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color =
                            "var(--color-text-secondary)";
                        }}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="mt-24 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease }}
        >
          <p
            className="text-sm font-medium"
            style={{ color: "var(--color-text-secondary)" }}
          >
            &copy; {new Date().getFullYear()} Pholio Studio. All rights
            reserved.
          </p>

          <div className="flex items-center gap-8">
            {/* Social Links */}
            {["Instagram", "LinkedIn", "Twitter"].map((platform) => (
              <a
                key={platform}
                href={`https://${platform.toLowerCase()}.com/pholiostudio`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-cream)] focus-visible:ring-[rgba(201,165,90,0.5)]"
                style={{ color: "var(--color-text-secondary)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--color-ink)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--color-text-secondary)";
                }}
              >
                {platform}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
