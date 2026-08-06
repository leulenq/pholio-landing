// landing/components/talent/shared.tsx
"use client";

// ── FilmGrain ───────────────────────────────────────────────────────
// SVG fractalNoise overlay. Identical to SceneCompCard treatment.
export function FilmGrain() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[1] mix-blend-soft-light"
      style={{
        opacity: 0.02,
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        backgroundSize: "150px 150px",
      }}
    />
  );
}

// ── RuleLines ───────────────────────────────────────────────────────
// Two vertical 1px gold editorial rule lines at 8% from each edge.
export function RuleLines() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[2] overflow-hidden"
    >
      <div
        style={{
          position: "absolute",
          left: "8%",
          top: 0,
          bottom: 0,
          width: 1,
          background:
            "linear-gradient(to bottom, transparent, rgba(201,165,90,0.06) 30%, rgba(201,165,90,0.06) 70%, transparent)",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: "8%",
          top: 0,
          bottom: 0,
          width: 1,
          background:
            "linear-gradient(to bottom, transparent, rgba(201,165,90,0.04) 40%, rgba(201,165,90,0.04) 60%, transparent)",
        }}
      />
    </div>
  );
}

// ── GhostWatermark ──────────────────────────────────────────────────
// Near-invisible serif chapter marker ("01", "02", "03") at right edge.
export function GhostWatermark({ label }: { label: string }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute z-[1] select-none"
      style={{
        right: "6%",
        top: "50%",
        transform: "translateY(-50%)",
        opacity: 0.018,
      }}
    >
      <span
        className="font-editorial"
        style={{
          fontSize: "clamp(18rem, 28vw, 32rem)",
          lineHeight: 0.8,
          color: "#C9A55A",
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ── AiBadge ─────────────────────────────────────────────────────────
// Small pill badge used in Section 3 (AI Selected) and Section 4 (Format Matched).
export function AiBadge({ label }: { label: string }) {
  return (
    <span
      className="text-[9px] uppercase tracking-[0.08em] font-semibold px-2 py-1 rounded-full flex items-center gap-1.5"
      style={{
        color: "#C9A55A",
        backgroundColor: "rgba(201,165,90,0.08)",
        border: "1px solid rgba(201,165,90,0.2)",
        backdropFilter: "blur(8px)",
        whiteSpace: "nowrap",
      }}
    >
      <svg width="8" height="8" viewBox="0 0 16 16" fill="none">
        <path
          d="M8 1l1.5 4.5L14 8l-4.5 1.5L8 14l-1.5-4.5L2 8l4.5-1.5L8 1z"
          fill="#C9A55A"
          opacity="0.8"
        />
      </svg>
      {label}
    </span>
  );
}
