"""
Hero model matte extraction.

Turns the source Higgsfield render (grey cyclorama, single subject) into a
transparent WebP frame sequence for the scroll-scrubbed hero.

Why this exists rather than an Adobe export: MP4/H.264 (yuv420p) has no alpha
channel, so any "background removed" MP4 is really the subject flattened onto
white. This produces a real alpha channel instead.

Why WebP frames rather than a video: WebP is the only widely-supported delivery
format that carries alpha (VP9/WebM alpha is not supported in Safari, HEVC alpha
is Safari-only), and a frame sequence scrubs exactly, which a <video> cannot.

Pipeline:
  1. BiRefNet (general-lite) -> alpha per frame. Chosen after a shootout against
     birefnet-portrait (visually identical, 5x slower), isnet-general-use and
     u2net_human_seg (both leave a bright fringe on the legs/boots). Alphas are
     kept in memory as float32; RGB is re-read from disk in pass 3 so we never
     hold 83 full-res colour frames at once (that OOM'd the first version).
  2. Temporal smoothing of alpha across neighbouring frames — per-frame matting
     is independent, so edges shimmer between frames; a small window kills it.
     Then a single union bounding box across the sequence keeps every frame
     mutually registered while dropping empty pixels.
  3. Per frame: PyMatting foreground estimation (edge/hair pixels are a blend of
     subject and grey wall; without unmixing they carry grey and read as a halo
     on the dark hero), crop to the union bbox, downscale, write WebP. Resumable
     — a frame whose WebP already exists is skipped, so an interrupted run can be
     re-run without redoing everything.

Usage:  ../../scratchpad/venv/bin/python extract_hero_matte.py [frames_dir]
"""

import gc
import json
import pathlib
import sys

import numpy as np
from PIL import Image
from pymatting import estimate_foreground_ml
from scipy.ndimage import grey_erosion
from rembg import new_session, remove

# ── knobs ────────────────────────────────────────────────────────────────────
MODEL = "birefnet-general-lite"
FIRST, LAST, STEP = 29, 192, 2   # frames 0-28 are the held hero pose; 29 is rest
TEMPORAL_WINDOW = 1              # +/- N frames averaged into the alpha
# The cyclorama casts a soft floor/wall shadow that BiRefNet keeps as a coherent
# ~0.25-alpha blob (a distinct lump in the alpha histogram, well below the body).
# A smoothstep black-point lift erases it while leaving hair — which is either
# opaque or lives above this floor — untouched. Verified against the worst
# frames (profile/back, where the shadow is largest).
ALPHA_FLOOR_LO = 0.38
ALPHA_FLOOR_HI = 0.58
# The ML foreground decontamination leaves a 1-2px bright ring at sharp
# dark-outfit / bright-wall boundaries (a white line down the legs/arms on the
# dark hero). A small disk erosion of the alpha, applied at output resolution,
# pulls the matte inside that ring. Verified not to harm hair or the thin
# shoulder straps.
ALPHA_ERODE_RADIUS = 1.5
BBOX_PAD = 8                     # px of breathing room around the union bbox
MAX_H = 1000                     # output frame height
WEBP_QUALITY = 82

ROOT = pathlib.Path(__file__).resolve().parents[2]
FRAMES = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "scratchpad/frames"
OUT = ROOT / "public/hero-sequence"
OUT.mkdir(parents=True, exist_ok=True)


def frame_path(idx: int) -> pathlib.Path:
    return FRAMES / f"f{idx:03d}.png"


def main() -> None:
    indices = list(range(FIRST, LAST + 1, STEP))
    if indices[-1] != LAST:
        indices.append(LAST)  # always land on the final pose
    total = len(indices)

    session = new_session(MODEL)

    # ── pass 1: alpha for every frame (float32; RGB not retained) ────────────
    alphas: list[np.ndarray] = []
    for n, idx in enumerate(indices):
        src = Image.open(frame_path(idx)).convert("RGB")
        cut = remove(src, session=session)
        alphas.append(np.asarray(cut.split()[3], dtype=np.float32) / 255.0)
        print(f"matte {n + 1:3d}/{total}  frame {idx:3d}", flush=True)

    # ── pass 2: temporal smoothing, then a single union bbox ─────────────────
    smoothed = []
    for i in range(total):
        lo = max(0, i - TEMPORAL_WINDOW)
        hi = min(total, i + TEMPORAL_WINDOW + 1)
        smoothed.append(np.mean(alphas[lo:hi], axis=0))
    alphas.clear()

    # Lift the black point to erase the floor/wall shadow (see ALPHA_FLOOR_*).
    # Applied before the bbox so the crop tightens around the shadow-free body.
    for i in range(total):
        t = np.clip(
            (smoothed[i] - ALPHA_FLOOR_LO) / (ALPHA_FLOOR_HI - ALPHA_FLOOR_LO), 0, 1
        )
        smoothed[i] = (t * t * (3 - 2 * t)).astype(np.float32)

    h, w = smoothed[0].shape
    union = np.zeros((h, w), dtype=bool)
    for a in smoothed:
        union |= a > 0.02
    ys, xs = np.where(union)
    x0 = max(0, int(xs.min()) - BBOX_PAD)
    y0 = max(0, int(ys.min()) - BBOX_PAD)
    x1 = min(w, int(xs.max()) + 1 + BBOX_PAD)
    y1 = min(h, int(ys.max()) + 1 + BBOX_PAD)
    print(f"union bbox: x{x0}-{x1} y{y0}-{y1}  ({x1-x0}x{y1-y0} of {w}x{h})", flush=True)

    scale = min(1.0, MAX_H / (y1 - y0))
    out_w, out_h = round((x1 - x0) * scale), round((y1 - y0) * scale)

    # ── pass 3: decontaminate, crop, encode — one frame in memory at a time ──
    for i, idx in enumerate(indices):
        dst = OUT / f"{i:03d}.webp"
        if dst.exists():
            print(f"skip  {i + 1:3d}/{total} (exists)", flush=True)
            continue

        rgb = np.asarray(Image.open(frame_path(idx)).convert("RGB"), dtype=np.float64) / 255.0
        alpha = smoothed[i].astype(np.float64)
        fg = estimate_foreground_ml(rgb, alpha)  # unmix subject from grey wall
        rgba = np.dstack([np.clip(fg, 0, 1), np.clip(alpha, 0, 1)])
        img = Image.fromarray((rgba * 255).astype(np.uint8), "RGBA").crop((x0, y0, x1, y1))
        if scale < 1.0:
            img = img.resize((out_w, out_h), Image.LANCZOS)

        # De-fringe: erode alpha at output resolution to drop the contaminated
        # bright edge ring (see ALPHA_ERODE_RADIUS).
        r = int(np.ceil(ALPHA_ERODE_RADIUS))
        yy, xx = np.mgrid[-r:r + 1, -r:r + 1]
        disk = (xx * xx + yy * yy) <= ALPHA_ERODE_RADIUS ** 2
        arr = np.array(img)
        arr[..., 3] = grey_erosion(arr[..., 3], footprint=disk)
        img = Image.fromarray(arr, "RGBA")

        img.save(dst, "WEBP", quality=WEBP_QUALITY, method=6)

        del rgb, alpha, fg, rgba, img
        gc.collect()
        print(f"write {i + 1:3d}/{total}", flush=True)

    (OUT / "manifest.json").write_text(json.dumps({
        "model": MODEL,
        "format": "webp",
        "quality": WEBP_QUALITY,
        "count": total,
        "sourceFrames": indices,
        "restIndex": 0,                 # sequence[0] == source frame 29
        "bbox": {"x": int(x0), "y": int(y0), "w": out_w, "h": out_h},
        "sourceSize": {"w": int(w), "h": int(h)},
    }, indent=2))
    print(f"done -> {OUT} ({total} frames @ {out_w}x{out_h})", flush=True)


if __name__ == "__main__":
    main()
