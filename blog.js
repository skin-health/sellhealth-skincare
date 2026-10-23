(function () {
  "use strict";

  function getLang() {
    var lang = (document.documentElement.lang || "").toLowerCase().slice(0, 2);
    if (["en", "es", "de", "fr"].indexOf(lang) !== -1) return lang;
    var path = window.location.pathname;
    if (path.indexOf("/es/") !== -1 || path === "/es" || path.indexOf("/es") === 0) return "es";
    if (path.indexOf("/de/") !== -1 || path === "/de" || path.indexOf("/de") === 0) return "de";
    if (path.indexOf("/fr/") !== -1 || path === "/fr" || path.indexOf("/fr") === 0) return "fr";
    return "en";
  }

  var POSTS_BY_LANG = {
  "en": [
    {
      "title": "Alpha-Arbutin vs Hydroquinone: Safe Melanin Inhibition",
      "category": "Formulation Science",
      "date": "Oct 14, 2026",
      "iso": "2026-10-14",
      "readTime": "7 min read",
      "excerpt": "Why alpha-arbutin safely inhibits tyrosinase activity without the cytotoxic, ochronosis, and rebound hyperpigmentation risks associated with hydroquinone.",
      "url": "/blog-alpha-arbutin-vs-hydroquinone.html"
    },
    {
      "title": "How to Fade Acne Scars: Remodeling the Dermal Matrix",
      "category": "Scar Remodeling",
      "date": "Oct 8, 2026",
      "iso": "2026-10-08",
      "readTime": "6 min read",
      "excerpt": "The biological stages of wound recovery, fibroblast migration, and how 10% Symglucan plus pro-collagen peptides accelerate scar remodeling.",
      "url": "/blog-how-to-fade-acne-scars.html"
    },
    {
      "title": "Syn-Coll vs Retinol: Peptide Collagen Synthesis",
      "category": "Peptide Science",
      "date": "Oct 2, 2026",
      "iso": "2026-10-02",
      "readTime": "6 min read",
      "excerpt": "Comparing Palmitoyl Tripeptide-5 against retinol for cellular matrix remodeling, TGF-beta activation, and barrier tolerance without retinoid peeling.",
      "url": "/blog-syn-coll-vs-retinol.html"
    },
    {
      "title": "Under-Eye Dark Circles & Microcirculation",
      "category": "Periorbital Science",
      "date": "Sep 21, 2026",
      "iso": "2026-09-21",
      "readTime": "5 min read",
      "excerpt": "How vascular leakage, biliverdin pigment accumulation, and sluggish lymphatic drainage create under-eye shadows, and the peptides that target them.",
      "url": "/blog-under-eye-circles-microcirculation.html"
    },
    {
      "title": "SYN-AKE vs Argireline: Expression Line Peptides Compared",
      "category": "Neuro-Peptides",
      "date": "Sep 10, 2026",
      "iso": "2026-09-10",
      "readTime": "8 min read",
      "excerpt": "In-depth clinical comparison of the Temple Viper venom mimic dipeptide vs acetyl hexapeptide-8 for relaxing dynamic forehead wrinkles.",
      "url": "/syn-ake-vs-argireline.html"
    }
  ],
  "es": [
    {
      "title": "Alfa-Arbutina frente a Hidroquinona: Inhibición de melanina sin toxicidad",
      "category": "Ciencia de Formulación",
      "date": "14 de octubre de 2026",
      "iso": "2026-10-14",
      "readTime": "7 min de lectura",
      "excerpt": "Por qué la alfa-arbutina inhibe eficazmente la tirosinasa sin los riesgos citotóxicos, ocronosis y efecto rebote asociados a la hidroquinona.",
      "url": "/es/blog-alpha-arbutin-vs-hydroquinone.html"
    },
    {
      "title": "Cómo atenuar cicatrices de acné: Remodelación de la matriz dérmica",
      "category": "Remodelación Tisular",
      "date": "8 de octubre de 2026",
      "iso": "2026-10-08",
      "readTime": "6 min de lectura",
      "excerpt": "Fases biológicas de la cicatrización, migración de fibroblastos y cómo el Symglucan al 10% con péptidos acelera la remodelación del tejido.",
      "url": "/es/blog-how-to-fade-acne-scars.html"
    },
    {
      "title": "Syn-Coll frente a Retinol: Síntesis de colágeno sin descamación",
      "category": "Ciencia de Péptidos",
      "date": "2 de octubre de 2026",
      "iso": "2026-10-02",
      "readTime": "6 min de lectura",
      "excerpt": "Comparativa de Palmitoyl Tripeptide-5 frente al retinol en remodelación de la matriz, activación de TGF-beta y tolerancia de la barrera cutánea.",
      "url": "/es/blog-syn-coll-vs-retinol.html"
    },
    {
      "title": "Ojeras y microcirculación periorbital: Tratamiento de congestión vascular",
      "category": "Ciencia Periorbital",
      "date": "21 de septiembre de 2026",
      "iso": "2026-09-21",
      "readTime": "5 min de lectura",
      "excerpt": "Cómo la permeabilidad vascular, acumulación de biliverdina y drenaje linfático deficiente provocan ojeras oscuras, y los péptidos que las atenúan.",
      "url": "/es/blog-under-eye-circles-microcirculation.html"
    },
    {
      "title": "SYN-AKE frente a Argireline: Comparativa de péptidos para líneas de expresión",
      "category": "Neuropéptidos",
      "date": "10 de septiembre de 2026",
      "iso": "2026-09-10",
      "readTime": "8 min de lectura",
      "excerpt": "Comparativa bioquímica en profundidad del dipéptido biomimético frente a Acetyl Hexapeptide-8 para relajar las arrugas dinámicas del rostro.",
      "url": "/es/syn-ake-vs-argireline.html"
    }
  ],
  "de": [
    {
      "title": "Alpha-Arbutin vs. Hydrochinon: Sichere Melaninhemmung ohne Zytotoxizität",
      "category": "Formel-Wissenschaft",
      "date": "14. Oktober 2026",
      "iso": "2026-10-14",
      "readTime": "7 Min. Lesezeit",
      "excerpt": "Warum Alpha-Arbutin die Tyrosinase sicher hemmt, ohne die zytotoxischen Ochronose- und Rebound-Risiken von herkömmlichem Hydrochinon.",
      "url": "/de/blog-alpha-arbutin-vs-hydroquinone.html"
    },
    {
      "title": "Aknenarben glätten: Umbau der extrazellulären Matrix durch Peptide",
      "category": "Narbenreparatur",
      "date": "8. Oktober 2026",
      "iso": "2026-10-08",
      "readTime": "6 Min. Lesezeit",
      "excerpt": "Die biologischen Phasen der Wundheilung, Fibroblasten-Migration und wie 10% Symglucan plus Pro-Kollagen-Peptide Narbengewebe regenerieren.",
      "url": "/de/blog-how-to-fade-acne-scars.html"
    },
    {
      "title": "Syn-Coll vs. Retinol: Peptid-Kollagensynthese ohne Retinoid-Reizung",
      "category": "Peptid-Wissenschaft",
      "date": "2. Oktober 2026",
      "iso": "2026-10-02",
      "readTime": "6 Min. Lesezeit",
      "excerpt": "Palmitoyl Tripeptide-5 im direkten Vergleich mit Retinol: TGF-beta-Aktivierung, Matrix-Remodellierung und Barriereverträglichkeit ohne Schuppung.",
      "url": "/de/blog-syn-coll-vs-retinol.html"
    },
    {
      "title": "Dunkle Augenringe & Mikrozirkulation: Vaskuläre und lymphatische Ursachen",
      "category": "Periorbitale Pflege",
      "date": "21. September 2026",
      "iso": "2026-09-21",
      "readTime": "5 Min. Lesezeit",
      "excerpt": "Wie Gefäßdurchlässigkeit, Biliverdin-Pigmente und träge Lymphdrainage periorbitale Schatten erzeugen und welche Peptide gezielt ansetzen.",
      "url": "/de/blog-under-eye-circles-microcirculation.html"
    },
    {
      "title": "SYN-AKE vs. Argireline: Mimikfalten-Peptide im klinischen Vergleich",
      "category": "Neuropeptide",
      "date": "10. September 2026",
      "iso": "2026-09-10",
      "readTime": "8 Min. Lesezeit",
      "excerpt": "Biochemischer Vergleich zwischen dem biomimetischen Schlangengift-Dipeptid und Acetyl Hexapeptide-8 zur Entspannung dynamischer Stirnfalten.",
      "url": "/de/syn-ake-vs-argireline.html"
    }
  ],
  "fr": [
    {
      "title": "Alpha-Arbutine vs Hydroquinone : Dépigmentation sans cytotoxicité",
      "category": "Science de la Formulation",
      "date": "14 octobre 2026",
      "iso": "2026-10-14",
      "readTime": "7 min de lecture",
      "excerpt": "Pourquoi l'alpha-arbutine neutralise l'activité de la tyrosinase sans les risques d'ochronose et d'effet rebond associés à l'hydroquinone.",
      "url": "/fr/blog-alpha-arbutin-vs-hydroquinone.html"
    },
    {
      "title": "Atténuer les cicatrices d'acné : Remodelage de la matrice dermique",
      "category": "Réparation Cutanée",
      "date": "8 octobre 2026",
      "iso": "2026-10-08",
      "readTime": "6 min de lecture",
      "excerpt": "Les étapes biologiques de la cicatrisation, la migration fibroblastique et l'apport de 10% de Symglucan et de peptides régénérants.",
      "url": "/fr/blog-how-to-fade-acne-scars.html"
    },
    {
      "title": "Syn-Coll vs Rétinol : Synthèse de collagène par peptides sans desquamation",
      "category": "Science des Peptides",
      "date": "2 octobre 2026",
      "iso": "2026-10-02",
      "readTime": "6 min de lecture",
      "excerpt": "Comparatif du Palmitoyl Tripeptide-5 face au rétinol : activation du TGF-bêta, synthèse de collagène et tolérance sans irritation.",
      "url": "/fr/blog-syn-coll-vs-retinol.html"
    },
    {
      "title": "Cernes vasculaires et microcirculation : Résorption des pigments sanguins",
      "category": "Science Péri-Orbitaire",
      "date": "21 septembre 2026",
      "iso": "2026-09-21",
      "readTime": "5 min de lecture",
      "excerpt": "Origine des cernes péri-orbitaires : fuites capillaires, stagnation de biliverdine et drainage lymphatique, et les peptides ciblés.",
      "url": "/fr/blog-under-eye-circles-microcirculation.html"
    },
    {
      "title": "SYN-AKE vs Argireline : Comparatif des peptides pour rides d'expression",
      "category": "Neuropeptides",
      "date": "10 septembre 2026",
      "iso": "2026-09-10",
      "readTime": "8 min de lecture",
      "excerpt": "Analyse biochimique comparative détaillée entre le dipéptide biomimétique et l'Acétyl Hexapeptide-8 pour relâcher les tensions musculaires du visage.",
      "url": "/fr/syn-ake-vs-argireline.html"
    }
  ]
};

  var LABELS = {
    en: { readMore: "Read the article" },
    es: { readMore: "Leer el artículo" },
    de: { readMore: "Artikel lesen" },
    fr: { readMore: "Lire l'article" }
  };

  function renderBlog() {
    var grid = document.getElementById("blog-grid");
    if (!grid) return;

    var curLang = getLang();
    var list = POSTS_BY_LANG[curLang] || POSTS_BY_LANG.en;
    var lbl = LABELS[curLang] || LABELS.en;

    var html = list.map(function (p) {
      return '<article class="glass post">' +
        '<div class="meta">' +
        '<span class="cat">' + p.category + '</span>' +
        '<time datetime="' + p.iso + '"><span>' + p.date + '</span></time>' +
        '<span>' + p.readTime + '</span>' +
        '</div>' +
        '<h3>' + p.title + '</h3>' +
        '<p>' + p.excerpt + '</p>' +
        '<a class="more" href="' + p.url + '" aria-label="' + lbl.readMore + ': ' + p.title + '">' + lbl.readMore + ' <i class="fa-solid fa-arrow-right"></i></a>' +
        '</article>';
    }).join("");

    grid.innerHTML = html;
  }

  /* ---------- HOVER FX ---------- */
  function initHoverFX() {
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce && window.matchMedia("(hover: hover)").matches) {
      document.addEventListener("pointermove", function (e) {
        var g = e.target.closest && e.target.closest(".glass");
        if (!g) return;
        var r = g.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
        g.style.setProperty("--mx", x + "px");
        g.style.setProperty("--my", y + "px");
        if (g.classList.contains("rev") || g.classList.contains("post")) {
          g.style.setProperty("--ry", ((x / r.width - .5) * 6).toFixed(2) + "deg");
          g.style.setProperty("--rx", ((.5 - y / r.height) * 6).toFixed(2) + "deg");
        }
      });
      document.addEventListener("pointerout", function (e) {
        var g = e.target.closest && e.target.closest(".rev,.post");
        if (g && !g.contains(e.relatedTarget)) {
          g.style.setProperty("--rx", "0deg");
          g.style.setProperty("--ry", "0deg");
        }
      });
    }
  }
  /* ---------- TELEMETRY CLOCK ---------- */
  function startClock() {
    var clk = document.getElementById("clock");
    if (!clk) return;
    function update() {
      clk.textContent = new Date().toISOString().slice(11, 19) + " UTC";
    }
    update();
    setInterval(update, 1000);
  }

  /* ---------- LANGUAGE SWITCHER ---------- */
  function initLangSwitcher() {
    var switcher = document.querySelector(".lang-switcher");
    if (!switcher) return;
    var btn = switcher.querySelector(".lang-btn");
    var menu = switcher.querySelector("#lang-menu");
    if (!btn || !menu) return;

    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var isHidden = menu.hasAttribute("hidden");
      if (isHidden) {
        menu.removeAttribute("hidden");
        btn.setAttribute("aria-expanded", "true");
      } else {
        menu.setAttribute("hidden", "");
        btn.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("click", function (e) {
      if (!switcher.contains(e.target)) {
        menu.setAttribute("hidden", "");
        btn.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !menu.hasAttribute("hidden")) {
        menu.setAttribute("hidden", "");
        btn.setAttribute("aria-expanded", "false");
        btn.focus();
      }
    });
  }

  function init() {
    renderBlog();
    initLangSwitcher();
    startClock();
    initHoverFX();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
