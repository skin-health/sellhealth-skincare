"""Create responsive WebP copies of the infographics (spec B3).

Reads   Pictures/infographic-*.jpg   (originals are never modified)
Writes  img/optimized/<stem>-640.webp, -960.webp, -1376.webp

Dry run by default. Pass --write to create files.
"""
import argparse
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC_GLOB = "Pictures/infographic-*.jpg"
OUT_DIR = ROOT / "img" / "optimized"
WIDTHS = (640, 960, 1376)
EXPECTED_SIZE = (1376, 768)
QUALITY = 75


def plan():
    sources = sorted(ROOT.glob(SRC_GLOB))
    jobs = []
    for src in sources:
        with Image.open(src) as im:
            if im.size != EXPECTED_SIZE:
                raise SystemExit(f"{src.name}: size {im.size}, expected {EXPECTED_SIZE}")
        for w in WIDTHS:
            h = round(EXPECTED_SIZE[1] * w / EXPECTED_SIZE[0])
            jobs.append((src, OUT_DIR / f"{src.stem}-{w}.webp", w, h))
    return sources, jobs


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--write", action="store_true")
    args = ap.parse_args()
    sources, jobs = plan()
    print(f"sources: {len(sources)}  outputs: {len(jobs)}")
    for src, out, w, h in jobs:
        print(f"  {src.relative_to(ROOT).as_posix()} -> {out.relative_to(ROOT).as_posix()} ({w}x{h})")
    if not args.write:
        print("DRY RUN. Nothing written. Re-run with --write.")
        return 0
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    cache = {}
    for src, out, w, h in jobs:
        if src not in cache:
            cache[src] = Image.open(src).convert("RGB")
        resized = cache[src].resize((w, h), Image.Resampling.LANCZOS)
        resized.save(out, "WEBP", quality=QUALITY, method=6)
        print(f"wrote {out.relative_to(ROOT).as_posix()}  {out.stat().st_size / 1024:.0f} KB")
    return 0


if __name__ == "__main__":
    sys.exit(main())
