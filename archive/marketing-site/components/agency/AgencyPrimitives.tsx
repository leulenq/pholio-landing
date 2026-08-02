"use client";

import type { ReactNode } from "react";

/** Scoped design tokens — set on `.agency-marketing` in globals.css */
export const agency = {
  sectionY: "py-20 md:py-28 lg:py-32",
  container: "mx-auto max-w-6xl px-6 lg:px-10",
} as const;

type SectionVariant = "base" | "elevated" | "panel";

const variantClass: Record<SectionVariant, string> = {
  base: "bg-[var(--agency-bg-0)]",
  elevated: "bg-[var(--agency-bg-1)]",
  panel: "bg-[var(--agency-bg-2)]",
};

export function AgencySection({
  children,
  variant = "base",
  className = "",
  id,
}: {
  children: ReactNode;
  variant?: SectionVariant;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden ${variantClass[variant]} ${agency.sectionY} ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div className="relative z-10">{children}</div>
    </section>
  );
}

export function AgencyEyebrow({ children }: { children: ReactNode }) {
  return (
    <p
      className="mb-4 font-sans text-[0.5625rem] font-semibold uppercase tracking-[0.22em] text-[var(--agency-accent)]"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {children}
    </p>
  );
}

export function AgencyH2({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`font-sans text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-[var(--agency-text)] ${className}`}
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {children}
    </h2>
  );
}

export function AgencyLead({ children }: { children: ReactNode }) {
  return (
    <p
      className="mt-4 max-w-lg text-[0.9375rem] leading-relaxed text-[var(--agency-muted)]"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {children}
    </p>
  );
}

export function AgencyBulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-8 flex flex-col gap-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--agency-accent)] opacity-70"
            aria-hidden
          />
          <span
            className="text-[0.8125rem] leading-relaxed text-[var(--agency-faint)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}
