#!/usr/bin/env python3
"""Generate sitemap.xml from the pages actually on disk.

Usage:
    python scripts/build_sitemap.py            # write sitemap.xml
    python scripts/build_sitemap.py --dry-run  # print what would be written
"""

import argparse
import os
import sys
from datetime import date

ROOT = os.getcwd()
BASE = "https://dermaudit.com"

# Never publish these.
EXCLUDE_FILES = {
    "404.html",
    "dermaudit.html",          # design prototype
    "links.html",              # retired link hub
    "blog.html",               # replaced by /blog/
    "es/blog.html", "de/blog.html", "fr/blog.html",
    "axavive-review.html", "kerassentials-review.html", "revitag-review.html",
    "es/axavive-review.html", "es/kerassentials-review.html", "es/revitag-review.html",
    "de/axavive-review.html", "de/kerassentials-review.html", "de/revitag-review.html",
    "fr/axavive-review.html", "fr/kerassentials-review.html", "fr/revitag-review.html",
}

EXCLUDE_DIRS = {"_archive", "node_modules", ".git", "scripts", "data", "_verify",
                 "uv", ".venv", "venv", "__pycache__"}


def collect():
    urls = []
    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames[:] = [d for d in dirnames if d not in EXCLUDE_DIRS and not d.startswith(".")]
        for fn in filenames:
            if not fn.endswith(".html"):
                continue
            if fn.startswith("google") or ".stub." in fn or fn.startswith("_verify"):
                continue
            full = os.path.join(dirpath, fn)
            rel = os.path.relpath(full, ROOT).replace("\\", "/")
            if rel in EXCLUDE_FILES:
                continue
            # a page that tells crawlers to stay away must not be advertised here
            try:
                head = open(full, encoding="utf-8", errors="replace").read(4000)
            except OSError:
                continue
            if len(head) < 900 or "meta-refresh" in head.lower() or "noindex" in head.lower():
                continue
            urls.append(rel)
    return sorted(urls)


def to_loc(rel):
    if rel == "index.html":
        return BASE + "/"
    if rel.endswith("/index.html"):
        return f"{BASE}/{rel[:-len('index.html')]}"
    return f"{BASE}/{rel}"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    rels = collect()
    today = date.today().isoformat()

    lines = ['<?xml version="1.0" encoding="UTF-8"?>',
             '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for rel in rels:
        lines.append("  <url>")
        lines.append(f"    <loc>{to_loc(rel)}</loc>")
        lines.append(f"    <lastmod>{today}</lastmod>")
        lines.append("  </url>")
    lines.append("</urlset>")
    xml = "\n".join(lines) + "\n"

    if args.dry_run:
        print(f"{len(rels)} URLs")
        for rel in rels:
            print("  ", to_loc(rel))
        return

    with open(os.path.join(ROOT, "sitemap.xml"), "w", encoding="utf-8", newline="\n") as f:
        f.write(xml)
    print(f"wrote sitemap.xml with {len(rels)} URLs")


if __name__ == "__main__":
    sys.exit(main())
