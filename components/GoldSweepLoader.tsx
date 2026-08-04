import type { CSSProperties, HTMLAttributes } from "react";
import "./GoldSweepLoader.css";

/**
 * Gold Sweep Loader — the wordmark's gold swish, closed into an orbit.
 *
 * The swish is the ported piece of brand furniture documented in CLAUDE.md
 * under "Ported from pholio-app's talent system": a 1px hairline running
 * `linear-gradient(to right, transparent, gold, transparent)`, solid at the
 * centre and fading to nothing at both edges. It closes the header band
 * (`GoldSweep` in components/header/kit.tsx) and opens the footer.
 *
 * This loader is that exact rule bent into a circle — nothing added, nothing
 * thickened:
 *
 *  - The full hairline ring is the *rule* at rest, held at low opacity.
 *  - The bright arc is the *sweep* — the same transparent → gold → transparent
 *    ramp, laid along the arc rather than along a straight line.
 *  - It travels. That is the whole idea: the swish doesn't spin, it sweeps.
 *
 * Two things keep it from reading as a generic spinner:
 *
 *  1. Weight. The stroke stays at hairline (1–1.75px), never a thick track.
 *     A heavy ring is a progress meter; a hairline is a rule.
 *  2. Cadence. Two nested rotations run at the same period — a constant turn
 *     plus a gentle ±16° eased oscillation. Their sum is a sweep that gathers
 *     speed and settles, and never stalls or reverses. Constant-velocity
 *     rotation is what makes a loader read as machinery.
 *
 * No glow, no pulse, no shimmer. Motion is the only ornament.
 *
 * Deliberately CSS-animated and *not* a client component: a loader is exactly
 * the thing you want available inside a Suspense fallback or a server-rendered
 * shell without dragging a client boundary along with it. Reduced motion is
 * honoured by `prefers-reduced-motion` in the stylesheet, which is the same
 * signal `useReducedMotion()` reads — don't "fix" this by converting it to the
 * hook; that would only cost a hydration round-trip and a flash of motion
 * before it resolves.
 */

/** Brand gold on ink. On cream paper pass `color={GOLD_DARK}` — #C9A55A only
 *  manages ~2:1 there, the same reason the wordmark tracks its paper. */
const GOLD = "#C9A55A";
export const GOLD_DARK = "#A8894E";

/**
 * Degrees of arc the sweep occupies. Must stay under 180: past a half-turn the
 * chord projection below stops being monotonic and the gradient stops would
 * run backwards.
 */
const SPAN = 168;

/**
 * Where the gold peaks along the sweep, 0 = tail, 1 = head. Nudged past centre
 * so the leading edge is the dense one — the difference between a gradient
 * that happens to rotate and a sweep with a direction of travel.
 */
const PEAK = 0.6;

/** Gradient stops used to linearise the ramp along the arc. */
const STOP_COUNT = 13;

const round = (n: number) => Math.round(n * 1000) / 1000;

/** Hairline weight, nudged up with the box so large loaders don't disappear. */
function strokeFor(size: number) {
  if (size <= 28) return 1;
  if (size <= 48) return 1.25;
  if (size <= 64) return 1.5;
  return 1.75;
}

/**
 * Geometry for the sweep: the arc path, plus the gradient that paints it.
 *
 * The gradient runs along the chord between the arc's two endpoints, so a
 * point at angle θ from the arc's midpoint lands at `sin θ / sin(SPAN/2)` on
 * that axis — bunched at the ends, stretched in the middle. Stops are placed
 * at those projected positions with evenly-spaced opacities, which undoes the
 * distortion and gives a ramp that is linear in *arc length*: the straight
 * swish, faithfully wrapped.
 */
function buildSweep(size: number, stroke: number) {
  const c = size / 2;
  const r = (size - stroke) / 2;
  const half = ((SPAN / 2) * Math.PI) / 180;
  // Centred on 12 o'clock, so a reduced-motion render rests with the gold at
  // the top rather than at some arbitrary angle.
  const bisector = -Math.PI / 2;
  const at = (a: number): [number, number] => [
    round(c + r * Math.cos(bisector + a)),
    round(c + r * Math.sin(bisector + a)),
  ];

  const [x1, y1] = at(-half);
  const [x2, y2] = at(half);

  const stops = Array.from({ length: STOP_COUNT }, (_, i) => {
    const t = i / (STOP_COUNT - 1);
    return {
      offset: round((Math.sin((t - 0.5) * 2 * half) / Math.sin(half) + 1) / 2),
      opacity: round(t <= PEAK ? t / PEAK : (1 - t) / (1 - PEAK)),
    };
  });

  return {
    // SPAN < 180, so large-arc-flag is 0; sweep-flag 1 draws it clockwise.
    d: `M ${x1} ${y1} A ${round(r)} ${round(r)} 0 0 1 ${x2} ${y2}`,
    r: round(r),
    c: round(c),
    x1,
    y1,
    x2,
    y2,
    stops,
  };
}

export interface GoldSweepLoaderProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "color"> {
  /** Rendered box in px. Hairline weight scales with it. */
  size?: number;
  /** Sweep colour. The mark is drawn in `currentColor`, so CSS works too. */
  color?: string;
  /** Accessible name announced to assistive tech. */
  label?: string;
}

export default function GoldSweepLoader({
  size = 28,
  color = GOLD,
  label = "Loading",
  className,
  style,
  ...props
}: GoldSweepLoaderProps) {
  const stroke = strokeFor(size);
  const { d, r, c, x1, y1, x2, y2, stops } = buildSweep(size, stroke);

  // Geometry is a pure function of the box, so instances of the same size share
  // an identical gradient. Keying the id off the box instead of a random value
  // keeps the markup stable between server and client render (no useId, no
  // client boundary), and any duplicate id resolves to a definition identical
  // to the one it shadows.
  const gradientId = `pholio-sweep-${size}`;

  const rootStyle: CSSProperties = {
    width: size,
    height: size,
    color,
    ...style,
  };

  return (
    <span
      className={["pholio-loader", className].filter(Boolean).join(" ")}
      role="status"
      aria-live="polite"
      aria-label={label}
      style={rootStyle}
      {...props}
    >
      <span className="pholio-loader__orbit">
        <span className="pholio-loader__cadence">
          <svg
            className="pholio-loader__svg"
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              <linearGradient
                id={gradientId}
                gradientUnits="userSpaceOnUse"
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
              >
                {stops.map((stop, i) => (
                  <stop
                    key={i}
                    offset={stop.offset}
                    stopColor="currentColor"
                    stopOpacity={stop.opacity}
                  />
                ))}
              </linearGradient>
            </defs>

            {/* The rule at rest. */}
            <circle
              cx={c}
              cy={c}
              r={r}
              stroke="currentColor"
              strokeOpacity={0.12}
              strokeWidth={stroke}
            />

            {/* The sweep travelling through it. */}
            <path
              d={d}
              stroke={`url(#${gradientId})`}
              strokeWidth={stroke}
              strokeLinecap="round"
            />
          </svg>
        </span>
      </span>
    </span>
  );
}
