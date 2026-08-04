import type { CSSProperties, HTMLAttributes, SVGProps } from "react";
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
 * This loader is that rule bent into a circle:
 *
 *  - The full ring is the *rule* at rest, held at low opacity.
 *  - The bright arc is the *sweep* — the same transparent → gold → transparent
 *    ramp, laid along the arc rather than along a straight line.
 *  - It travels. That is the whole idea: the swish doesn't spin, it sweeps.
 *
 * Three things keep it from reading as a generic spinner:
 *
 *  1. Weight. Fine, but deliberately not a hairline: 1.5–2.5px, scaled off the
 *     box. Enough to carry gold at a glance, still nowhere near the
 *     tenth-of-a-diameter band that reads as a progress meter.
 *  2. Cadence. Two nested rotations run at the same period — a constant turn
 *     plus a gentle ±16° eased oscillation. Their sum is a sweep that gathers
 *     speed and settles, and never stalls or reverses. Constant-velocity
 *     rotation is what makes a loader read as machinery.
 *  3. Tips that taper across the stroke, not along it. See below.
 *
 * No glow, no pulse, no shimmer. Motion is the only ornament.
 *
 * ── Why the fade is a conic mask and not an SVG gradient ──────────────────
 *
 * The obvious build — one arc path painted with a <linearGradient> — is
 * subtly wrong, and it shows at the tips. A linear gradient's iso-opacity
 * lines are straight and perpendicular to its axis, while the stroke it is
 * painting curves away from that axis. By the end of a 150° arc the stroke's
 * own direction is within ~15° of those lines, so the fade cuts *lengthwise*
 * along the band instead of across it: the inner edge goes transparent well
 * before the outer one, and the tip ends up shaved off on the diagonal,
 * visibly weighted to one side of the stroke.
 *
 * A conic gradient's iso-opacity lines are radial by construction, so the
 * fade is perpendicular to the stroke everywhere and each tip tapers
 * symmetrically about its centreline. It also removes a whole layer of
 * correction: conic position is proportional to arc length, so the ramp maps
 * straight onto it with no projection maths.
 *
 * The ring itself stays SVG — a stroked <circle> rasterises crisply at any
 * size, where a masked-out CSS ring has to fake its edges with a second
 * gradient. So: SVG draws the band, the mask carries the light.
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

/** Degrees of arc the sweep occupies. */
const SPAN = 150;

/**
 * Where the gold peaks, in normalised arc length: 0 is the trailing tip, 1 the
 * leading one — and the ring turns clockwise, so 1 is the edge that arrives
 * first. Sitting this close to the head gathers the gold into a short bright
 * entry with a long dim tail drawn out behind it, which is what gives the
 * sweep a legible *start*. The rule under the wordmark peaks in the middle;
 * that reads as a ring lit from one side once you bend it into a circle.
 */
const PEAK = 0.86;

/** Above 1, holds the tail dimmer for longer before it builds. */
const TAIL_BIAS = 1.35;

/** Opacity of the resting rule the sweep travels through. */
const TRACK_OPACITY = 0.18;

/** Conic stops used to draw the ramp. Smooth curve, so a coarse walk is fine. */
const SAMPLES = 32;

const round = (n: number) => Math.round(n * 1000) / 1000;

/** Zero slope at both ends — no crease where segments of the ramp meet. */
const smoothstep = (u: number) => u * u * (3 - 2 * u);

/**
 * The ramp along the sweep. Both tips reach zero with zero slope, so each one
 * is a soft rounded lead-in rather than a point or a cut — the leading edge
 * especially. Hold the gold to a hard head and the sweep becomes a dash, and
 * stops reading as the rule under the wordmark, whose signature is that it
 * fades out at its ends.
 */
function rampAt(t: number) {
  if (t <= PEAK) return Math.pow(smoothstep(t / PEAK), TAIL_BIAS);
  return 1 - smoothstep((t - PEAK) / (1 - PEAK));
}

/**
 * The sweep, as a conic gradient over the alpha channel.
 *
 * Rotated so the ramp's peak — not the arc's midpoint — lands at 12 o'clock,
 * which is where a reduced-motion render comes to rest. Anchor the midpoint
 * instead and reshaping the ramp silently drags the still frame off centre.
 *
 * Geometry-free, so it is the same string at every size.
 */
const SWEEP_MASK = (() => {
  const stops = Array.from({ length: SAMPLES + 1 }, (_, i) => {
    const t = i / SAMPLES;
    return `rgba(0,0,0,${round(rampAt(t))}) ${round(t * SPAN)}deg`;
  });
  return `conic-gradient(from ${round(
    -PEAK * SPAN,
  )}deg at 50% 50%, ${stops.join(", ")}, rgba(0,0,0,0) 360deg)`;
})();

/** Stroke weight, nudged up with the box so large loaders stay in proportion. */
function strokeFor(size: number) {
  if (size <= 28) return 1.5;
  if (size <= 48) return 2;
  if (size <= 64) return 2.25;
  return 2.5;
}

export interface GoldSweepLoaderProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "color"> {
  /** Rendered box in px. Stroke weight scales with it. */
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
  const center = size / 2;
  const radius = (size - stroke) / 2;

  const ring = (opacity: number, extraProps: SVGProps<SVGSVGElement>) => (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      {...extraProps}
    >
      <circle
        cx={center}
        cy={center}
        r={radius}
        stroke="currentColor"
        strokeOpacity={opacity}
        strokeWidth={stroke}
      />
    </svg>
  );

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
      {/* The rule at rest. */}
      {ring(TRACK_OPACITY, { className: "pholio-loader__ring" })}

      {/* The sweep travelling through it. */}
      <span className="pholio-loader__orbit">
        <span className="pholio-loader__cadence">
          {ring(1, {
            className: "pholio-loader__sweep",
            style: { WebkitMaskImage: SWEEP_MASK, maskImage: SWEEP_MASK },
          })}
        </span>
      </span>
    </span>
  );
}
