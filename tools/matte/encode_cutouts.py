"""
Encode manually-cut-out hero frames into the transparent WebP sequence.

The subject was matted by hand in an external tool (real alpha, full 834x1112
canvas per frame) after the automated matte left grey background blobs the user
couldn't accept. This script does NOT re-matte — it trusts the delivered alpha.
It only registers the sequence: compute one union bounding box across every
frame, crop all frames to it (so they stay mutually registered while scrubbing),
downscale, and encode WebP with alpha.

Ordering: the cutouts arrived with timestamp filenames spanning two editing
sessions. A masked-pixel match against the known-ordered source library proved
that a plain filename sort equals true sequence order, with exactly one source
frame (sequence index 6) missing. So we sort by filename and drop nothing else;
the result is a contiguous 82-frame sequence.

Usage:  /opt/anaconda3/bin/python3.12 encode_cutouts.py <cutouts_dir>
"""

import glob
import json
import pathlib
import sys

import numpy as np
from PIL import Image

BBOX_PAD = 8       # px of breathing room around the union bbox
MAX_H = 1000       # output frame height
WEBP_QUALITY = 82

ROOT = pathlib.Path(__file__).resolve().parents[2]
OUT = ROOT / "public/hero-sequence"


def main() -> None:
    src_dir = pathlib.Path(sys.argv[1])
    files = sorted(src_dir.glob("*.png"))
    if not files:
        raise SystemExit(f"no PNGs in {src_dir}")
    total = len(files)
    print(f"encoding {total} cutouts from {src_dir}", flush=True)

    # ── pass 1: union bbox across every frame's alpha ────────────────────────
    imgs = [Image.open(f).convert("RGBA") for f in files]
    w, h = imgs[0].size
    for im in imgs:
        if im.size != (w, h):
            raise SystemExit(f"size mismatch: {im.size} != {(w, h)}")

    union = np.zeros((h, w), dtype=bool)
    for im in imgs:
        union |= np.asarray(im)[..., 3] > 5  # ~0.02 alpha
    ys, xs = np.where(union)
    x0 = max(0, int(xs.min()) - BBOX_PAD)
    y0 = max(0, int(ys.min()) - BBOX_PAD)
    x1 = min(w, int(xs.max()) + 1 + BBOX_PAD)
    y1 = min(h, int(ys.max()) + 1 + BBOX_PAD)
    print(f"union bbox: x{x0}-{x1} y{y0}-{y1}  ({x1-x0}x{y1-y0} of {w}x{h})", flush=True)

    scale = min(1.0, MAX_H / (y1 - y0))
    out_w, out_h = round((x1 - x0) * scale), round((y1 - y0) * scale)

    # ── pass 2: crop, resize, encode ────────────────────────────────────────
    OUT.mkdir(parents=True, exist_ok=True)
    for i, im in enumerate(imgs):
        crop = im.crop((x0, y0, x1, y1))
        if scale < 1.0:
            crop = crop.resize((out_w, out_h), Image.LANCZOS)
        crop.save(OUT / f"{i:03d}.webp", "WEBP", quality=WEBP_QUALITY, method=6)
        print(f"write {i + 1:3d}/{total}", flush=True)

    (OUT / "manifest.json").write_text(json.dumps({
        "source": "manual-cutout",
        "format": "webp",
        "quality": WEBP_QUALITY,
        "count": total,
        "restIndex": 0,             # sequence[0] == source frame 29 (held hero pose)
        "bbox": {"x": int(x0), "y": int(y0), "w": out_w, "h": out_h},
        "sourceSize": {"w": int(w), "h": int(h)},
    }, indent=2))
    print(f"done -> {OUT} ({total} frames @ {out_w}x{out_h})", flush=True)


if __name__ == "__main__":
    main()
