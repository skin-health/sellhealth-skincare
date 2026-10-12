"""Check relative links and asset references across the sitemap URLs (spec E1).

Read-only. Reads sitemap.xml, maps each <loc> to a file on disk, then checks every
relative href/src in that file. A target passes when the file exists. A directory
target passes when it contains index.html. External, mailto, tel, data and
fragment-only links are skipped.

Exit code 0 when every reference resolves. Exit code 1 otherwise.
"""
import re
import sys
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parent.parent
SITE = "https://dermaudit.com/"
NS = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
SKIP = ("http://", "https://", "//", "mailto:", "tel:", "data:", "javascript:", "#")


class RefParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.refs = []

    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        if tag in ("a", "link") and d.get("href"):
            self.refs.append(d["href"])
        if tag in ("img", "script", "source") and d.get("src"):
            self.refs.append(d["src"])
        if tag == "source":
            srcset = d.get("srcset")
            if srcset:
                for part in srcset.split(","):
                    url = part.strip().split(" ")[0]
                    if url:
                        self.refs.append(url)


def loc_to_file(loc):
    rel = loc[len(SITE):] if loc.startswith(SITE) else loc
    if rel == "" or rel.endswith("/"):
        rel = rel + "index.html"
    return ROOT / rel


def resolve(page: Path, ref: str):
    target = unquote(urlsplit(ref).path)
    if not target:
        return None
    if target.startswith("/"):
        return ROOT / target.lstrip("/")
    return (page.parent / target).resolve()


def main():
    tree = ET.parse(ROOT / "sitemap.xml")
    locs = [u.findtext("s:loc", namespaces=NS) for u in tree.getroot().findall("s:url", NS)]
    pages = []
    missing_pages = []
    for loc in locs:
        f = loc_to_file(loc)
        (pages if f.exists() else missing_pages).append(f)
    broken = []
    checked = 0
    for page in pages:
        parser = RefParser()
        parser.feed(page.read_text(encoding="utf-8"))
        for ref in parser.refs:
            if ref.startswith(SKIP):
                continue
            checked += 1
            target = resolve(page, ref)
            if target is None:
                continue
            ok = target.is_file() or (target.is_dir() and (target / "index.html").is_file())
            if not ok:
                broken.append((page.relative_to(ROOT).as_posix(), ref))
    print(f"sitemap URLs: {len(locs)}  mapped to files: {len(pages)}  unmapped: {len(missing_pages)}")
    for f in missing_pages:
        print(f"  UNMAPPED sitemap target: {f.relative_to(ROOT).as_posix()}")
    print(f"local references checked: {checked}  broken: {len(broken)}")
    for page, ref in broken:
        print(f"  BROKEN in {page}: {ref}")
    return 1 if (broken or missing_pages) else 0


if __name__ == "__main__":
    sys.exit(main())
