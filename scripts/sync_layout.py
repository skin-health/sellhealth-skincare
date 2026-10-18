#!/usr/bin/env python3
"""Verify shared layout components across all 61 active HTML pages (ASD-STE100).

Checks:
1. Top announcement bar text matches the canonical string for each language (60 pages).
2. Navigation menu has 2 <button type="button" class="nav-link dropdown-toggle"> elements
   and 15 <a href="..."> links across all 60 pages with <nav>.
3. All 40 review and study pages contain the .related-research-box cross-link component.
4. All 61 active pages have decoded <title> <= 60 chars, <meta name="description"> <= 155 chars,
   and an og:image meta tag.
"""

import glob
import html
import os
import re
import sys

CANONICAL_TOPBAR = {
    "en": "Worldwide Tracked Shipping (100+ Countries) &bull; 60-90 Day Money-Back Guarantee &bull; Free Shipping in the USA",
    "es": "Envíos Internacionales con Seguimiento (100+ Países) &bull; Garantía de devolución de 60-90 días &bull; Envío Gratis en los EE.UU.",
    "de": "Weltweiter Versand mit Sendungsverfolgung (100+ Länder) &bull; 60-90 Tage Geld-zurück-Garantie &bull; Kostenloser Versand in den USA",
    "fr": "Livraison Internationale Suivie (100+ Pays) &bull; Garantie de remboursement de 60 à 90 jours &bull; Livraison Gratuite aux États-Unis",
}


def main() -> int:
    repo_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    os.chdir(repo_root)

    all_html = sorted(
        f for f in glob.glob("**/*.html", recursive=True)
        if not f.startswith(("pics", "Pictures", ".git")) and "googlef" not in f
    )
    active = []
    for f in all_html:
        text = open(f, encoding="utf-8").read()
        if 'http-equiv="refresh"' not in text.lower():
            active.append(f)

    errors = []
    nav_pages = 0
    topbar_pages = 0
    crosslink_pages = 0

    for f in active:
        s = open(f, encoding="utf-8").read()
        parts = f.replace("/", "\\").split("\\")
        lang = parts[0] if parts[0] in ("es", "de", "fr") else "en"

        # 1. Top bar check
        m_tb = re.search(r'<div class="top-bar">.*?(?=<header)', s, re.S)
        if m_tb:
            topbar_pages += 1
            tb_txt = re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", m_tb.group(0))).strip()
            if tb_txt != CANONICAL_TOPBAR[lang]:
                errors.append(f"[TOPBAR] {f}: got '{tb_txt}'")

        # 2. Nav check
        m_nav = re.search(r'<nav class="nav".*?</nav>', s, re.S)
        if m_nav:
            nav_pages += 1
            nav_block = m_nav.group(0)
            btns = re.findall(r'<button\b[^>]*class="nav-link dropdown-toggle[^"]*"', nav_block)
            anchors = re.findall(r'<a\b[^>]*href="([^"]+)"', nav_block)
            if len(btns) != 2:
                errors.append(f"[NAV-BTN] {f}: expected 2 dropdown buttons, got {len(btns)}")
            if len(anchors) != 15:
                errors.append(f"[NAV-LINKS] {f}: expected 15 anchor links, got {len(anchors)}")

        # 3. Cross-link box on review and study pages
        base = os.path.basename(f)
        if base.endswith("-review.html") or base.startswith("blog-") or base == "syn-ake-vs-argireline.html":
            if 'class="related-research-box"' in s:
                crosslink_pages += 1
            else:
                errors.append(f"[CROSSLINK] {f}: missing .related-research-box")

        # 4. Title, description, and og:image check
        m_t = re.search(r"<title>(.*?)</title>", s, re.S)
        t_dec = html.unescape(m_t.group(1).strip()) if m_t else ""
        if not (1 <= len(t_dec) <= 60):
            errors.append(f"[TITLE] {f}: length {len(t_dec)} ({t_dec})")

        m_d = re.search(r'<meta name="description" content="(.*?)"', s, re.S)
        d_dec = html.unescape(m_d.group(1).strip()) if m_d else ""
        if not (1 <= len(d_dec) <= 155):
            errors.append(f"[DESC] {f}: length {len(d_dec)} ({d_dec})")

        if 'property="og:image"' not in s:
            errors.append(f"[OG] {f}: missing og:image")

    print(
        f"active pages: {len(active)}  topbars: {topbar_pages}  navs: {nav_pages}  "
        f"crosslink boxes: {crosslink_pages}  errors: {len(errors)}"
    )
    for err in errors:
        print(" ", err)
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
