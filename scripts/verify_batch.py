#!/usr/bin/env python3
"""Batch verification gate for the DermAudit site.

Purpose
    One command that checks every hard invariant after a migration batch.
    It replaces manual spot-checks. It exits non-zero when a hard check fails.

Usage
    python scripts/verify_batch.py                 # full site
    python scripts/verify_batch.py --js             # syntax only
    python scripts/verify_batch.py --no-legacy      # skip pending old-design pages

Exit codes
    0  all hard checks pass
    1  at least one hard check failed

Style notes
    Simplified Technical English. Short sentences. Active voice.
"""

from __future__ import annotations

import argparse
import fnmatch
import glob
import html
import json
import os
import re
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Pages still in the old design. They fail newer checks until Phase 5.
LEGACY_PENDING = {
    "fr/privacy.html", "fr/terms.html", "fr/affiliate-disclosure.html",
    "links.html", "blog.html", "dermaudit.html",
    "tools/skincare-conflict-matrix.html", "es/skincare-conflict-matrix.html",
    "de/skincare-conflict-matrix.html", "fr/skincare-conflict-matrix.html",
    "axavive-review.html", "kerassentials-review.html", "revitag-review.html",
    "es/axavive-review.html", "es/kerassentials-review.html", "es/revitag-review.html",
    "de/axavive-review.html", "de/kerassentials-review.html", "de/revitag-review.html",
    "fr/axavive-review.html", "fr/kerassentials-review.html", "fr/revitag-review.html",
}

BANNED_CLAIMS = re.compile(
    r"clinically\s+(proven|tested|shown)|doctor[- ]formulated|"
    r"probada|probado|cient[ií]ficamente|nachweislich|gepr[uü]ft|klinisch\s+belegt|"
    r"prouv[eé]|cliniquement|formul[eé]\s+par\s+un\s+m[eé]decin|"
    r"\bproven\b",
    re.IGNORECASE,
)

REQUIRED_OFFER_FIELDS = (
    "hasMerchantReturnPolicy",
    "shippingDetails",
    "priceValidUntil",
    "validFrom",
    "itemCondition",
)

FORBIDDEN_RATING_KEYS = ("AggregateRating", "reviewRating")


def rel(path: str) -> str:
    return os.path.relpath(path, ROOT).replace("\\", "/")


# Files that are not site pages. Skip them entirely.
EXCLUDE = re.compile(
    r"(^|/)google[0-9a-f]+\.html$|(^|/)dermaudit\.html$|(^|/)links\.html$"
)

# Blog articles migrate in a later batch. Match them as a family.
LEGACY_PATTERNS = ("blog-*.html", "*/blog-*.html", "*/blog.html")


def is_legacy(name: str) -> bool:
    if name in LEGACY_PENDING:
        return True
    return any(fnmatch.fnmatch(name, pat) for pat in LEGACY_PATTERNS)


def html_files() -> list[str]:
    out = []
    for p in glob.glob(os.path.join(ROOT, "**", "*.html"), recursive=True):
        if ".bak" in p or "node_modules" in p:
            continue
        if EXCLUDE.search(rel(p)):
            continue
        out.append(p)
    return sorted(out)


def js_files() -> list[str]:
    out = []
    for p in glob.glob(os.path.join(ROOT, "**", "*.js"), recursive=True):
        if ".bak" in p or "node_modules" in p:
            continue
        out.append(p)
    return sorted(out)


def read(path: str) -> str:
    with open(path, encoding="utf-8", errors="replace") as f:
        return f.read()


def strip_tags(text: str) -> str:
    text = re.sub(r"<script[\s\S]*?</script>", " ", text, flags=re.I)
    text = re.sub(r"<style[\s\S]*?</style>", " ", text, flags=re.I)
    text = re.sub(r"<[^>]+>", " ", text)
    return re.sub(r"\s+", " ", html.unescape(text)).strip()


# ---------------------------------------------------------------- checks

def check_js_syntax(files: list[str]) -> list[str]:
    issues = []
    for p in files:
        r = subprocess.run(
            ["node", "--check", p], capture_output=True, text=True, timeout=120
        )
        if r.returncode != 0:
            issues.append(f"{rel(p)}: node --check failed: {r.stderr.strip()[:200]}")
    return issues


def check_banned_claims(files: list[str], legacy: bool) -> list[str]:
    issues = []
    for p in files:
        name = rel(p)
        if not legacy and is_legacy(name):
            continue
        for m in BANNED_CLAIMS.finditer(read(p)):
            issues.append(f"{name}: banned claim '{m.group(0)}'")
    return issues


def check_affiliate(files: list[str], legacy: bool) -> list[str]:
    issues = []
    for p in files:
        name = rel(p)
        if not legacy and is_legacy(name):
            continue
        for tag in re.findall(r"<a\b[^>]*>", read(p), re.I):
            if "affiliate-link" not in tag:
                continue
            if "noreferrer" in tag:
                issues.append(f"{name}: affiliate anchor uses rel=noreferrer")
                continue
            for token in ("noopener", "nofollow", "sponsored", "data-product", "data-placement"):
                if token not in tag:
                    issues.append(f"{name}: affiliate anchor missing {token}")
    return issues


def find_products(obj, acc):
    """Collect every dict whose @type is Product."""
    if isinstance(obj, dict):
        t = obj.get("@type")
        types = t if isinstance(t, list) else [t]
        if "Product" in types:
            acc.append(obj)
        for v in obj.values():
            find_products(v, acc)
    elif isinstance(obj, list):
        for item in obj:
            find_products(item, acc)
    return acc


def walk_info(obj, key, acc):
    """Case-insensitive key walk. Returns the key name that matched."""
    if isinstance(obj, dict):
        for k, v in obj.items():
            if str(k).lower() == key.lower():
                acc.append(k)
            walk_info(v, key, acc)
    elif isinstance(obj, list):
        for item in obj:
            walk_info(item, key, acc)
    return acc


def walk_key(obj, key, acc):
    if isinstance(obj, dict):
        for k, v in obj.items():
            if k == key:
                acc.append(v)
            walk_key(v, key, acc)
    elif isinstance(obj, list):
        for item in obj:
            walk_key(item, key, acc)
    return acc


def check_jsonld(files: list[str], legacy: bool) -> list[str]:
    issues = []
    # 404 is served with noindex and describes no real page, so schema.org
    # markup there would assert the existence of a document that has none.
    NO_SCHEMA = {"404.html"}
    for p in files:
        name = rel(p)
        if name in NO_SCHEMA:
            continue
        if not legacy and is_legacy(name):
            continue
        raw = read(p)
        blocks = re.findall(
            r'<script[^>]*application/ld\+json[^>]*>([\s\S]*?)</script>', raw, re.I
        )
        if not blocks:
            issues.append(f"{name}: no JSON-LD block")
            continue
        parsed = []
        for i, b in enumerate(blocks):
            try:
                parsed.append(json.loads(b.strip()))
            except Exception as exc:
                issues.append(f"{name}: JSON-LD block {i} does not parse: {exc}")
        # schema.org writes the property in camelCase (aggregateRating) while the
        # type is PascalCase (AggregateRating). Match both, case-insensitively.
        for key in FORBIDDEN_RATING_KEYS:
            hits = walk_info(parsed, key, [])
            if hits:
                issues.append(f"{name}: forbidden schema key {key} ({len(hits)}x)")
        for found_type in walk_key(parsed, "@type", []):
            vals = found_type if isinstance(found_type, list) else [found_type]
            for val in vals:
                if isinstance(val, str) and val.endswith("Rating"):
                    issues.append(f"{name}: contains @type {val}")
        # Product offers must carry full merchant data. Free tool offers
        # (SoftwareApplication, price 0) do not need return or shipping policy.
        for product in find_products(parsed, []):
            offers = product.get("offers")
            cands = offers if isinstance(offers, list) else [offers]
            pname = str(product.get("name", "?"))[:40]
            for c in cands:
                if not isinstance(c, dict):
                    continue
                for field in REQUIRED_OFFER_FIELDS:
                    if field not in c:
                        issues.append(f"{name}: Product '{pname}' Offer missing {field}")
        # FAQ answers must be plain text
        for ans in walk_key(parsed, "acceptedAnswer", []):
            text = ans.get("text", "") if isinstance(ans, dict) else ""
            if "<" in str(text) and ">" in str(text):
                issues.append(f"{name}: FAQ acceptedAnswer contains HTML")
    return issues


def check_faq_visible(files: list[str], legacy: bool) -> list[str]:
    issues = []
    for p in files:
        name = rel(p)
        if not legacy and is_legacy(name):
            continue
        raw = read(p)
        blocks = re.findall(
            r'<script[^>]*application/ld\+json[^>]*>([\s\S]*?)</script>', raw, re.I
        )
        questions = []
        for b in blocks:
            try:
                data = json.loads(b.strip())
            except Exception:
                continue
            for ent in walk_key(data, "mainEntity", []):
                if isinstance(ent, list):
                    for item in ent:
                        if isinstance(item, dict) and item.get("@type") == "Question":
                            questions.append(strip_tags(str(item.get("name", ""))))
        if not questions:
            continue
        visible = [
            strip_tags(m) for m in re.findall(r"<h[23][^>]*>([\s\S]*?)</h[23]>", raw, re.I)
        ]
        visible_text = strip_tags(raw)
        for q in questions:
            if q and q not in visible_text and not any(q[:40] in v for v in visible):
                issues.append(f"{name}: FAQ question not visible on page: {q[:60]}")
    return issues


def check_images(files: list[str], legacy: bool) -> list[str]:
    issues = []
    for p in files:
        name = rel(p)
        if not legacy and is_legacy(name):
            continue
        for tag in re.findall(r"<img\b[^>]*>", read(p), re.I):
            if 'width="' not in tag or 'height="' not in tag:
                src = re.search(r'src="([^"]*)"', tag)
                issues.append(f"{name}: img without width/height: {src.group(1) if src else '?'}")
    return issues


def check_serp(files: list[str], legacy: bool) -> list[str]:
    issues = []
    for p in files:
        name = rel(p)
        if not legacy and is_legacy(name):
            continue
        raw = read(p)
        m = re.search(r"<title[^>]*>([\s\S]*?)</title>", raw, re.I)
        if not m:
            issues.append(f"{name}: no <title>")
        else:
            t = strip_tags(m.group(1))
            if len(t) > 60:
                issues.append(f"{name}: title {len(t)} chars (>60)")
            if not t:
                issues.append(f"{name}: empty <title>")
        d = re.search(
            r'<meta[^>]*name=["\']description["\'][^>]*content=["\']([^"\']*)["\']', raw, re.I
        )
        if not d:
            issues.append(f"{name}: no meta description")
        elif len(html.unescape(d.group(1))) > 155:
            issues.append(f"{name}: meta description {len(d.group(1))} chars (>155)")
        if not re.search(r'property=["\']og:image["\']', raw, re.I):
            issues.append(f"{name}: no og:image")
    return issues


DESC_NUM = re.compile(r"\b\d{2,}\s?%", re.I)
DESC_EFF = re.compile(
    r"\b(boost|fade|reduce|eliminat|reverse|stimulat|steigert|reduziert|beseitig|"
    r"aufhell|aumenta|elimina|aclara|augmente|réduit|élimine|estompe|efface)\w*", re.I)
DESC_ATTR = re.compile(
    r"manufacturer|hersteller|fabricante|fabricant|reports|berichtet|informa|"
    r"rapporte|study|studie|estudio|étude", re.I)


def check_descriptions(files: list[str], legacy: bool) -> list[str]:
    """A search snippet has no room for a citation, so an efficacy number there
    must name who reported it. Unattributed efficacy in a description is a
    compliance defect, not a style preference."""
    issues = []
    for p in files:
        name = rel(p)
        if not legacy and is_legacy(name):
            continue
        m = re.search(r'<meta[^>]*name="description"[^>]*content="([^"]*)"', read(p), re.I)
        if not m:
            continue
        d = m.group(1)
        if (DESC_NUM.search(d) or DESC_EFF.search(d)) and not DESC_ATTR.search(d):
            issues.append(f"{name}: unattributed efficacy claim in meta description")
    return issues


def check_hreflang(files: list[str], legacy: bool) -> list[str]:
    issues = []
    groups: dict[str, dict[str, set[str]]] = {}
    for p in files:
        name = rel(p)
        if not legacy and is_legacy(name):
            continue
        raw = read(p)
        tags = re.findall(r'<link[^>]*hreflang=["\']([^"\']+)["\'][^>]*href=["\']([^"\']+)["\']', raw, re.I)
        if not tags:
            tags = re.findall(r'<link[^>]*href=["\']([^"\']+)["\'][^>]*hreflang=["\']([^"\']+)["\']', raw, re.I)
            tags = [(h, u) for u, h in tags]
        if not tags:
            continue
        base = re.sub(r"^(es|de|fr)/", "", name)
        groups.setdefault(base, {})[name] = {h.lower() for h, _ in tags}
    for base, members in groups.items():
        if len(members) < 2:
            continue
        union = set().union(*members.values())
        for lang in union:
            missing = [m for m, langs in members.items() if lang not in langs]
            if missing:
                issues.append(f"hreflang '{lang}' missing on: {', '.join(sorted(missing))}")
    return issues


def check_design(files: list[str], legacy: bool) -> list[str]:
    """Every migrated page must carry the new footer shell.

    Without this, a page can pass every content check while still being the old
    design, which is how 16 blog articles sat in the tree looking healthy.
    """
    issues = []
    for p in files:
        name = rel(p)
        if not legacy and is_legacy(name):
            continue
        raw = read(p)
        if len(raw) < 1000:      # pruned meta-refresh stubs are intentional
            continue
        if 'class="fg"' not in raw:
            issues.append(f"{name}: old design, missing footer shell")
    return issues


def migration_backlog(files: list[str]) -> list[str]:
    """Pages still in the old design, counted regardless of legacy flags.

    Walks the disk instead of the checked-file list: pages excluded from the
    individual checks (links.html, dermaudit.html) still exist and still show an
    old design, so they belong in the count.
    """
    out = []
    on_disk = [q for q in glob.glob(os.path.join(ROOT, "**", "*.html"), recursive=True)
               if ".bak" not in q and "node_modules" not in q]
    for p in on_disk:
        raw = read(p)
        if len(raw) < 1000:
            continue
        if 'class="fg"' not in raw:
            out.append(rel(p))
    return out


def check_no_cdn(files: list[str], legacy: bool) -> list[str]:
    issues = []
    for p in files:
        name = rel(p)
        if not legacy and is_legacy(name):
            continue
        raw = read(p)
        for m in re.finditer(r'<(script|link)\b[^>]*(?:src|href)=["\'](https?://[^"\']+)["\']', raw, re.I):
            url = m.group(2)
            # First-party and approved analytics are allowed. No font or icon CDN.
            if "dermaudit.com" in url or "plausible.io" in url:
                continue
            issues.append(f"{name}: external asset {url}")
    return issues


def run_script(name: str) -> list[str]:
    path = os.path.join(ROOT, "scripts", name)
    if not os.path.exists(path):
        return []
    r = subprocess.run(
        [sys.executable, path], capture_output=True, text=True, cwd=ROOT, timeout=600
    )
    if r.returncode != 0:
        tail = (r.stdout + r.stderr).strip().splitlines()[-6:]
        return [f"{name} failed: " + " | ".join(tail)]
    return []


# ---------------------------------------------------------------- main

def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--js", action="store_true", help="run JavaScript syntax check only")
    ap.add_argument("--no-legacy", action="store_true",
                    help="treat old-design pages as expected-fail and skip them")
    args = ap.parse_args()

    js = js_files()
    if args.js:
        issues = check_js_syntax(js)
        for i in issues:
            print("FAIL", i)
        print(f"\nJS syntax: {len(js)} files, {len(issues)} failures")
        return 1 if issues else 0

    pages = html_files()
    legacy_ok = not args.no_legacy

    checks = [
        ("js syntax", lambda: check_js_syntax(js)),
        ("banned claims", lambda: check_banned_claims(pages, legacy_ok)),
        ("affiliate invariants", lambda: check_affiliate(pages, legacy_ok)),
        ("json-ld", lambda: check_jsonld(pages, legacy_ok)),
        ("faq visible", lambda: check_faq_visible(pages, legacy_ok)),
        ("image dimensions", lambda: check_images(pages, legacy_ok)),
        ("serp limits", lambda: check_serp(pages, legacy_ok)),
        ("description claims", lambda: check_descriptions(pages, legacy_ok)),
        ("hreflang", lambda: check_hreflang(pages, legacy_ok)),
        ("no cdn", lambda: check_no_cdn(pages, legacy_ok)),
        ("design shell", lambda: check_design(pages, legacy_ok)),
        ("check_links.py", lambda: run_script("check_links.py")),
        ("sync_layout.py", lambda: run_script("sync_layout.py")),
        ("validate_faq_schema.py", lambda: run_script("validate_faq_schema.py")),
    ]

    total = 0
    print(f"Verifying {len(pages)} pages, {len(js)} scripts\n")
    for label, fn in checks:
        try:
            issues = fn()
        except subprocess.TimeoutExpired:
            issues = [f"{label}: timed out"]
        status = "PASS" if not issues else "FAIL"
        print(f"[{status}] {label} ({len(issues)} issues)")
        for item in issues[:12]:
            print("        ", item)
        if len(issues) > 12:
            print(f"         ... {len(issues) - 12} more")
        total += len(issues)

    backlog = migration_backlog(pages)
    print(f"\nMigration backlog: {len(backlog)} pages still in old design")
    for item in backlog[:12]:
        print("        ", item)
    if len(backlog) > 12:
        print(f"         ... {len(backlog) - 12} more")
    print(f"\nTotal hard failures: {total}")
    return 1 if total else 0


if __name__ == "__main__":
    sys.exit(main())
