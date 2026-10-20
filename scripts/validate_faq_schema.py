#!/usr/bin/env python3
"""Comprehensive validator for FAQPage JSON-LD and visible HTML accordion synchronization.

Invariants verified:
1. Every FAQPage has at least 1 FAQ.
2. JSON-LD count matches visible HTML count exactly.
3. Neither name nor acceptedAnswer.text contains any raw HTML markup.
4. Visible question text matches JSON-LD name verbatim (normalized whitespace).
5. Visible answer text matches JSON-LD acceptedAnswer.text verbatim (normalized whitespace).
"""

import glob
import html
import json
import os
import re
import sys


def clean_text(t: str) -> str:
    if not t:
        return ""
    t = re.sub(r"<[^>]+>", " ", t)
    t = html.unescape(t)
    t = re.sub(r"\s+", " ", t).strip()
    return t


def extract_faqs(filepath: str):
    text = open(filepath, encoding="utf-8").read()

    # 1. JSON-LD FAQs
    scripts = re.findall(
        r'<script\b[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>',
        text,
        re.DOTALL | re.IGNORECASE,
    )
    json_faqs = []
    for s in scripts:
        try:
            data = json.loads(s.strip())
        except Exception:
            continue
        items = data.get("@graph", [data]) if isinstance(data, dict) else (data if isinstance(data, list) else [])
        for item in items:
            if isinstance(item, dict) and item.get("@type") == "FAQPage":
                entities = item.get("mainEntity", [])
                if isinstance(entities, dict):
                    entities = [entities]
                for ent in entities:
                    json_faqs.append({
                        "name": ent.get("name", ""),
                        "text": ent.get("acceptedAnswer", {}).get("text", "")
                    })

    # 2. Visible FAQs
    vis_faqs = []
    if "faq-item-card" in text:
        cards = re.findall(
            r'<div class="faq-item faq-item-card">.*?<h3>(.*?)</h3>.*?<p>(.*?)</p>',
            text,
            re.DOTALL,
        )
        for q, a in cards:
            vis_faqs.append({"name": q, "text": a})
    else:
        items = re.findall(
            r'<div class="faq-item">.*?<button class="faq-question".*?<span>(.*?)</span>.*?</button>.*?<div class="faq-answer".*?<p>(.*?)</p>',
            text,
            re.DOTALL,
        )
        for q, a in items:
            vis_faqs.append({"name": q, "text": a})

    return json_faqs, vis_faqs


def main() -> int:
    repo_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    os.chdir(repo_root)

    all_html = sorted(
        f for f in glob.glob("**/*.html", recursive=True)
        if not f.startswith(("pics", "Pictures", ".git")) and "googlef" not in f
    )

    faq_pages = [f for f in all_html if "FAQPage" in open(f, encoding="utf-8").read()]
    print(f"Auditing FAQPage synchronization across {len(faq_pages)} pages...")

    errors = []
    total_questions = 0

    for f in faq_pages:
        j_faqs, v_faqs = extract_faqs(f)

        if not j_faqs:
            errors.append(f"[SCHEMA] {f}: Declares FAQPage but no mainEntity questions extracted.")
            continue

        if len(j_faqs) != len(v_faqs):
            errors.append(f"[COUNT] {f}: JSON-LD declares {len(j_faqs)} FAQs, but visible HTML has {len(v_faqs)}.")
            continue

        total_questions += len(j_faqs)

        for i, (jf, vf) in enumerate(zip(j_faqs, v_faqs)):
            # HTML tag presence in JSON-LD
            if re.search(r"<[^>]+>", jf["name"]):
                errors.append(f"[HTML-IN-JSON] {f} question #{i+1}: Contains raw HTML tags in name.")
            if re.search(r"<[^>]+>", jf["text"]):
                errors.append(f"[HTML-IN-JSON] {f} answer #{i+1}: Contains raw HTML tags in acceptedAnswer.text.")

            # Verbatim text comparison
            jq = clean_text(jf["name"])
            vq = clean_text(vf["name"])
            ja = clean_text(jf["text"])
            va = clean_text(vf["text"])

            if jq != vq:
                errors.append(f"[TEXT-DIFF] {f} Q#{i+1} mismatch:\n  JSON: {jq}\n  VIS : {vq}")
            if ja != va:
                errors.append(f"[TEXT-DIFF] {f} A#{i+1} mismatch:\n  JSON: {ja}\n  VIS : {va}")

    print(f"Pages verified: {len(faq_pages)} | Total synchronized questions: {total_questions} | Errors: {len(errors)}")
    for err in errors:
        print(" ", err)

    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
