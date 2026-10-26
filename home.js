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

  /* Matrix data is owned by matrix.js (single source of truth). */
  var MATRIX = window.DermAuditMatrix;
  var ORDER = MATRIX.ORDER;
  function getMatrix() { return MATRIX.getMatrix(); }

  /* ---------- REVIEWS DATA BY LANGUAGE (5 products) ---------- */
  var PRODUCTS_BY_LANG = {
  "en": [
    {
      "key": "kollagen",
      "name": "Kollagen Intensiv™",
      "brand": "Skinception",
      "category": "Anti-Aging & Wrinkles",
      "active": "Syn-Coll® (Palmitoyl Tripeptide-5)",
      "img": "/img/optimized/kollagen_boxbottle_lg.webp",
      "width": 700,
      "height": 357,
      "score": 94,
      "verdict": "The manufacturer reports that Swiss Syn-Coll® accelerates collagen synthesis by 354% to smooth deep expression wrinkles.",
      "pros": [
        "Patented Swiss Syn-Coll® peptide technology",
        "90-Day Money-Back Guarantee",
        "Deep cellular hydration and lipid barrier support"
      ],
      "cons": [
        "Premium investment ($59.95 / jar)",
        "Official stock routes sell out quickly"
      ],
      "affiliateUrl": "https://www.kollagenintensiv.com/ct/282956",
      "reviewUrl": "/kollagen-intensiv-review.html",
      "price": "$59.95 / jar",
      "guarantee": "90-Day Guarantee"
    },
    {
      "key": "synevra",
      "name": "Synevra UltraLift™",
      "brand": "Synevra Clinical",
      "category": "Anti-Aging & Expression Lines",
      "active": "SYN-AKE® Dipeptide Complex",
      "img": "/img/optimized/synevra.webp",
      "width": 622,
      "height": 604,
      "score": 91,
      "verdict": "Targeted topical serum engineered with SYN-AKE dipeptide to smooth forehead furrows and dynamic expression creases.",
      "pros": [
        "Targets dynamic expression lines and forehead furrows",
        "SYN-AKE neuromuscular relaxation mechanism",
        "Fast-absorbing dual-action hydration"
      ],
      "cons": [
        "Requires twice-daily consistent application",
        "Single unit investment ($79.00 / unit)"
      ],
      "affiliateUrl": "https://fa90bat349vj5m8h47ps5z4k7l.hop.clickbank.net",
      "reviewUrl": "/synevra-ultralift-review.html",
      "price": "$79.00 / unit",
      "guarantee": "60-Day Guarantee"
    },
    {
      "key": "illuminatural",
      "name": "Illuminatural 6i™",
      "brand": "Skinception",
      "category": "Dark Spots & Brightening",
      "active": "Alpha-Arbutin & 5% Niacinamide",
      "img": "/img/optimized/illuminatural6i_icon001_600x600.webp",
      "width": 600,
      "height": 600,
      "score": 90,
      "verdict": "Formulated with 4 botanical actives to intercept tyrosinase and fade sun spots, melasma, and hyperpigmentation without toxic bleach.",
      "pros": [
        "Zero hydroquinone, mercury, steroids, or bleach",
        "Airless precision dispenser preserves active potency",
        "Dual-pathway tyrosinase inhibition"
      ],
      "cons": [
        "Melanin renewal cycles take 30 to 90 days",
        "Restock waitlists occur during peak demand"
      ],
      "affiliateUrl": "https://www.illuminatural6i.com/ct/282956",
      "reviewUrl": "/illuminatural-6i-review.html",
      "price": "$59.95 / bottle",
      "guarantee": "90-Day Guarantee"
    },
    {
      "key": "eyelasticity",
      "name": "Eyelasticity™",
      "brand": "Skinception",
      "category": "Eyes & Dark Circles",
      "active": "Eyeseryl® (Tetrapeptide-5) + Regu®-Age",
      "img": "/img/optimized/eyelasticity800.webp",
      "width": 798,
      "height": 800,
      "score": 89,
      "verdict": "Multi-peptide eye therapy delivering significant reduction in periorbital puffiness and dark circle chromophore accumulation within 28 days.",
      "pros": [
        "Targets vascular leakage and lymphatic micro-drainage",
        "Non-migrating gel safe for sensitive eye contours",
        "67-Day Money-Back Guarantee"
      ],
      "cons": [
        "Formulated specifically for the delicate periorbital zone",
        "Requires gentle patting rather than vigorous rubbing"
      ],
      "affiliateUrl": "https://www.naturalhealthsource.com/products/eyelasticity-age-defying-eye-therapy/?aid=282956",
      "reviewUrl": "/eyelasticity-review.html",
      "price": "$59.95 / bottle",
      "guarantee": "67-Day Guarantee"
    },
    {
      "key": "dermefface",
      "name": "Dermefface FX7®",
      "brand": "Skinception",
      "category": "Dermal Scar Remodeling",
      "active": "10.0% Symglucan® + Pro-Coll-One+",
      "img": "/img/optimized/dermafacereal.webp",
      "width": 419,
      "height": 747,
      "score": 92,
      "verdict": "Formulated with 10% Symglucan and Pro-Coll-One+; the manufacturer reports up to a 1,190% boost in Type I collagen synthesis to help flatten scars.",
      "pros": [
        "10% Symglucan biological turnover accelerator",
        "Effective on acne marks, surgery scars, and burns",
        "90-Day Money-Back Guarantee"
      ],
      "cons": [
        "Mature or keloid tissue requires 3 to 6 months patience",
        "Daily application discipline is essential"
      ],
      "affiliateUrl": "https://www.dermeffacefx7.com/ct/282956",
      "reviewUrl": "/dermefface-fx7-review.html",
      "price": "$59.95 / tube",
      "guarantee": "90-Day Guarantee"
    }
  ],
  "es": [
    {
      "key": "kollagen",
      "name": "Kollagen Intensiv™",
      "brand": "Skinception",
      "category": "Antienvejecimiento y Arrugas",
      "active": "Syn-Coll® (Palmitoil Tripéptido-5)",
      "img": "/img/optimized/kollagen_boxbottle_lg.webp",
      "width": 700,
      "height": 357,
      "score": 94,
      "verdict": "El fabricante informa que el péptido suizo Syn-Coll® acelera la síntesis de colágeno un 354% para alisar arrugas profundas.",
      "pros": [
        "Aumento del +354% de colágeno con Syn-Coll® informado por el fabricante",
        "Funciona como crema hidratante de día y reparador nocturno",
        "Garantía de devolución de dinero de 90 días"
      ],
      "cons": [
        "Requiere de 30 a 84 días para la remodelación dérmica completa",
        "Inversión premium ($59.95 / tarro)"
      ],
      "affiliateUrl": "https://www.kollagenintensiv.com/ct/282956",
      "reviewUrl": "/es/kollagen-intensiv-review.html",
      "price": "$59.95 / tarro",
      "guarantee": "Garantía de 90 días"
    },
    {
      "key": "synevra",
      "name": "Synevra UltraLift™",
      "brand": "Synevra Clinical",
      "category": "Líneas de Expresión y Entrecejo",
      "active": "Complejo Dipéptido SYN-AKE®",
      "img": "/img/optimized/synevra.webp",
      "width": 622,
      "height": 604,
      "score": 91,
      "verdict": "Sérum tópico dirigido con dipéptido SYN-AKE® para relajar microcontracciones y suavizar surcos y patas de gallo.",
      "pros": [
        "El fabricante informa hasta un 82% menos de frecuencia de contracción",
        "Relajación neuromuscular focalizada en frente y patas de gallo",
        "Garantía oficial de reembolso de 60 días"
      ],
      "cons": [
        "Requiere aplicación diaria constante",
        "Inversión de $79.00 por unidad"
      ],
      "affiliateUrl": "https://fa90bat349vj5m8h47ps5z4k7l.hop.clickbank.net",
      "reviewUrl": "/es/synevra-ultralift-review.html",
      "price": "$79.00 / unidad",
      "guarantee": "Garantía de 60 días"
    },
    {
      "key": "illuminatural",
      "name": "Illuminatural 6i™",
      "brand": "Skinception",
      "category": "Manchas y Tono de Piel",
      "active": "Alfa-Arbutina y 5% Niacinamida",
      "img": "/img/optimized/illuminatural6i_icon001_600x600.webp",
      "width": 600,
      "height": 600,
      "score": 90,
      "verdict": "Diseñado con 4 activos botánicos para bloquear la tirosinasa y aclarar manchas solares y melasma sin lejías tóxicas.",
      "pros": [
        "4 aclaradores botánicos sinérgicos (cero hidroquinona o lejías)",
        "Dispensador hermético airless que protege la potencia activa",
        "Garantía total de devolución de 90 días"
      ],
      "cons": [
        "Ciclos de renovación de melanina tardan entre 30 y 90 días",
        "Es indispensable usar protector solar diario"
      ],
      "affiliateUrl": "https://www.illuminatural6i.com/ct/282956",
      "reviewUrl": "/es/illuminatural-6i-review.html",
      "price": "$59.95 / frasco",
      "guarantee": "Garantía de 90 días"
    },
    {
      "key": "eyelasticity",
      "name": "Eyelasticity™",
      "brand": "Skinception",
      "category": "Ojeras y Bolsas",
      "active": "Eyeseryl® (Tetrapéptido-5) + Regu®-Age",
      "img": "/img/optimized/eyelasticity800.webp",
      "width": 798,
      "height": 800,
      "score": 89,
      "verdict": "Terapia multipeptídica para el contorno de ojos con reducción significativa de hinchazón periorbital y ojeras en 28 días.",
      "pros": [
        "Favorece el drenaje linfático y reduce la microcongestión",
        "Textura gel ligera no grasa segura para ojos sensibles",
        "Garantía de satisfacción de 67 días"
      ],
      "cons": [
        "Formulado exclusivamente para la zona periorbital delicada",
        "Requiere toques suaves con la yema del dedo, sin frotar"
      ],
      "affiliateUrl": "https://www.naturalhealthsource.com/products/eyelasticity-age-defying-eye-therapy/?aid=282956",
      "reviewUrl": "/es/eyelasticity-review.html",
      "price": "$59.95 / frasco",
      "guarantee": "Garantía de 67 días"
    },
    {
      "key": "dermefface",
      "name": "Dermefface FX7®",
      "brand": "Skinception",
      "category": "Remodelación de Cicatrices",
      "active": "Symglucan® 10.0% + Pro-Coll-One+",
      "img": "/img/optimized/dermafacereal.webp",
      "width": 419,
      "height": 747,
      "score": 92,
      "verdict": "Formulado con Symglucan al 10% y Pro-Coll-One+; el fabricante informa un aumento del 1.190% en síntesis de colágeno para aplanar cicatrices.",
      "pros": [
        "Symglucan al 10% para acelerar la renovación celular biológica",
        "Eficaz en marcas de acné, cicatrices quirúrgicas y quemaduras",
        "Garantía de devolución de 90 días"
      ],
      "cons": [
        "Cicatrices maduras requieren entre 3 y 6 meses de constancia",
        "Esperar al cierre total de heridas antes de iniciar"
      ],
      "affiliateUrl": "https://www.dermeffacefx7.com/ct/282956",
      "reviewUrl": "/es/dermefface-fx7-review.html",
      "price": "$59.95 / tubo",
      "guarantee": "Garantía de 90 días"
    }
  ],
  "de": [
    {
      "key": "kollagen",
      "name": "Kollagen Intensiv™",
      "brand": "Skinception",
      "category": "Anti-Aging & Falten",
      "active": "Syn-Coll® (Palmitoyl Tripeptide-5)",
      "img": "/img/optimized/kollagen_boxbottle_lg.webp",
      "width": 700,
      "height": 357,
      "score": 94,
      "verdict": "Laut Hersteller steigert das Schweizer Syn-Coll®-Peptid die Kollagensynthese um 354%, um tiefe Mimikfalten zu glätten.",
      "pros": [
        "Vom Hersteller berichtet: Kollagenanstieg um 354% durch Syn-Coll®",
        "Dient als schützende Tagespflege und regenerative Nachtcreme",
        "Volle 90-Tage Geld-zurück-Garantie"
      ],
      "cons": [
        "Benötigt 30 bis 84 Tage für den zellulären Kollagenaufbau",
        "Premium-Investition ($59.95 / Tiegel)"
      ],
      "affiliateUrl": "https://www.kollagenintensiv.com/ct/282956",
      "reviewUrl": "/de/kollagen-intensiv-review.html",
      "price": "$59.95 / Tiegel",
      "guarantee": "90 Tage Garantie"
    },
    {
      "key": "synevra",
      "name": "Synevra UltraLift™",
      "brand": "Synevra Clinical",
      "category": "Mimikfalten & Stirnlinien",
      "active": "SYN-AKE® Dipeptid-Komplex",
      "img": "/img/optimized/synevra.webp",
      "width": 622,
      "height": 604,
      "score": 91,
      "verdict": "Gezieltes Serum mit SYN-AKE® zur Entspannung von Mikrokontraktionen und Glättung von Stirnfalten und Krähenfüßen.",
      "pros": [
        "Laut Hersteller bis zu 82% weniger Muskelkontraktionsfrequenz",
        "Neuromuskuläre Entspannung ohne Injektionsrisiken",
        "60-Tage Geld-zurück-Garantie"
      ],
      "cons": [
        "Regelmäßige tägliche Anwendung erforderlich",
        "Investition von $79.00 pro Einheit"
      ],
      "affiliateUrl": "https://fa90bat349vj5m8h47ps5z4k7l.hop.clickbank.net",
      "reviewUrl": "/de/synevra-ultralift-review.html",
      "price": "$79.00 / Einheit",
      "guarantee": "60 Tage Garantie"
    },
    {
      "key": "illuminatural",
      "name": "Illuminatural 6i™",
      "brand": "Skinception",
      "category": "Pigmentflecken & Aufhellung",
      "active": "Alpha-Arbutin & 5% Niacinamid",
      "img": "/img/optimized/illuminatural6i_icon001_600x600.webp",
      "width": 600,
      "height": 600,
      "score": 90,
      "verdict": "Formel mit 4 pflanzlichen Wirkstoffen zur Hemmung der Tyrosinase. Mildert Sonnenflecken und Melasma ohne Bleichmittel.",
      "pros": [
        "Botanische Aufheller ohne Hydrochinon, Quecksilber oder Bleichmittel",
        "Airless-Spender schützt lichtempfindliche Wirkstoffe",
        "90-Tage Geld-zurück-Garantie"
      ],
      "cons": [
        "Erneuerungszyklus der Haut benötigt 30 bis 90 Tage",
        "Tagsüber ist täglicher Sonnenschutz zwingend"
      ],
      "affiliateUrl": "https://www.illuminatural6i.com/ct/282956",
      "reviewUrl": "/de/illuminatural-6i-review.html",
      "price": "$59.95 / Flakon",
      "guarantee": "90 Tage Garantie"
    },
    {
      "key": "eyelasticity",
      "name": "Eyelasticity™",
      "brand": "Skinception",
      "category": "Augenringe & Schwellungen",
      "active": "Eyeseryl® (Tetrapeptid-5) + Regu®-Age",
      "img": "/img/optimized/eyelasticity800.webp",
      "width": 798,
      "height": 800,
      "score": 89,
      "verdict": "Multipeptid-Augenpflege zur deutlichen Reduktion von Schwellungen und vaskulären Augenringen innerhalb von 28 Tagen.",
      "pros": [
        "Fördert den Mikrolymphtransport und stärkt Kapillaren",
        "Schnell einziehende Geltextur für die empfindliche Augenpartie",
        "67-Tage Geld-zurück-Garantie"
      ],
      "cons": [
        "Ausschließlich für die zarte Periorbitalzone formuliert",
        "Sanft einklopfen, nicht stark reiben"
      ],
      "affiliateUrl": "https://www.naturalhealthsource.com/products/eyelasticity-age-defying-eye-therapy/?aid=282956",
      "reviewUrl": "/de/eyelasticity-review.html",
      "price": "$59.95 / Flakon",
      "guarantee": "67 Tage Garantie"
    },
    {
      "key": "dermefface",
      "name": "Dermefface FX7®",
      "brand": "Skinception",
      "category": "Dermale Narbenreparatur",
      "active": "10,0% Symglucan® + Pro-Coll-One+",
      "img": "/img/optimized/dermafacereal.webp",
      "width": 419,
      "height": 747,
      "score": 92,
      "verdict": "Formuliert mit 10% Symglucan und Pro-Coll-One+; laut Hersteller bis zu +1.190% Kollagen Typ I zur Narbenglättung.",
      "pros": [
        "10% Symglucan als biologischer Zellerneuerungs-Beschleuniger",
        "Wirksam bei Aknenarben, Operationsnarben und Brandmalen",
        "90-Tage Geld-zurück-Garantie"
      ],
      "cons": [
        "Ältere Narben erfordern 3 bis 6 Monate kontinuierliche Pflege",
        "Erst nach vollständigem Wundverschluss anwenden"
      ],
      "affiliateUrl": "https://www.dermeffacefx7.com/ct/282956",
      "reviewUrl": "/de/dermefface-fx7-review.html",
      "price": "$59.95 / Tube",
      "guarantee": "90 Tage Garantie"
    }
  ],
  "fr": [
    {
      "key": "kollagen",
      "name": "Kollagen Intensiv™",
      "brand": "Skinception",
      "category": "Anti-Âge & Rides",
      "active": "Syn-Coll® (Palmitoyl Tripeptide-5)",
      "img": "/img/optimized/kollagen_boxbottle_lg.webp",
      "width": 700,
      "height": 357,
      "score": 94,
      "verdict": "Le fabricant rapporte que le peptide suisse Syn-Coll® stimule la synthèse de collagène de 354% pour estomper les rides profondes.",
      "pros": [
        "Hausse de +354% de collagène avec Syn-Coll® indiquée par le fabricant",
        "Soin complet hydratant de jour et régénérant de nuit",
        "Garantie satisfait ou remboursé de 90 jours"
      ],
      "cons": [
        "Exige 30 à 84 jours pour un renouvellement matriciel complet",
        "Investissement haut de gamme (59,95 $ / pot)"
      ],
      "affiliateUrl": "https://www.kollagenintensiv.com/ct/282956",
      "reviewUrl": "/fr/kollagen-intensiv-review.html",
      "price": "$59.95 / pot",
      "guarantee": "Garantie de 90 jours"
    },
    {
      "key": "synevra",
      "name": "Synevra UltraLift™",
      "brand": "Synevra Clinical",
      "category": "Rides d'Expression & Front",
      "active": "Complexe Dipeptide SYN-AKE®",
      "img": "/img/optimized/synevra.webp",
      "width": 622,
      "height": 604,
      "score": 91,
      "verdict": "Sérum ciblé au dipeptide SYN-AKE® pour détendre les micro-contractions musculaires et lisser les sillons du front.",
      "pros": [
        "Le fabricant indique jusqu'à 82% de réduction des micro-contractions",
        "Relaxation neuromusculaire ciblée sans injections",
        "Garantie satisfait ou remboursé de 60 jours"
      ],
      "cons": [
        "Exige une régularité d'application quotidienne",
        "Tarif de 79,00 $ par unité"
      ],
      "affiliateUrl": "https://fa90bat349vj5m8h47ps5z4k7l.hop.clickbank.net",
      "reviewUrl": "/fr/synevra-ultralift-review.html",
      "price": "$79.00 / unité",
      "guarantee": "Garantie de 60 jours"
    },
    {
      "key": "illuminatural",
      "name": "Illuminatural 6i™",
      "brand": "Skinception",
      "category": "Taches et Teint",
      "active": "Alpha-Arbutine & 5% Niacinamide",
      "img": "/img/optimized/illuminatural6i_icon001_600x600.webp",
      "width": 600,
      "height": 600,
      "score": 90,
      "verdict": "Formulé avec 4 actifs botaniques pour neutraliser la tyrosinase et éclaircir les taches sans agents décapants.",
      "pros": [
        "Actifs botaniques sans hydroquinone, mercure ni javel",
        "Flacon airless préservant l'activité antioxydante",
        "Garantie intégrale de remboursement de 90 jours"
      ],
      "cons": [
        "Le cycle cellulaire exige entre 30 et 90 jours",
        "Protection solaire quotidienne indispensable"
      ],
      "affiliateUrl": "https://www.illuminatural6i.com/ct/282956",
      "reviewUrl": "/fr/illuminatural-6i-review.html",
      "price": "$59.95 / flacon",
      "guarantee": "Garantie de 90 jours"
    },
    {
      "key": "eyelasticity",
      "name": "Eyelasticity™",
      "brand": "Skinception",
      "category": "Cernes & Poches",
      "active": "Eyeseryl® (Tétrapeptide-5) + Regu®-Age",
      "img": "/img/optimized/eyelasticity800.webp",
      "width": 798,
      "height": 800,
      "score": 89,
      "verdict": "Soin contour des yeux multi-peptides réduisant significativement les poches liquidiennes et les cernes sombres en 28 jours.",
      "pros": [
        "Stimule le micro-drainage lymphatique péri-oculaire",
        "Gel non migrant sécuritaire pour les contours délicats",
        "Garantie satisfait ou remboursé de 67 jours"
      ],
      "cons": [
        "Spécifiquement formulé pour la zone péri-orbitaire fine",
        "Tapoter très délicatement sans frotter vigoureusement"
      ],
      "affiliateUrl": "https://www.naturalhealthsource.com/products/eyelasticity-age-defying-eye-therapy/?aid=282956",
      "reviewUrl": "/fr/eyelasticity-review.html",
      "price": "$59.95 / flacon",
      "guarantee": "Garantie de 67 jours"
    },
    {
      "key": "dermefface",
      "name": "Dermefface FX7®",
      "brand": "Skinception",
      "category": "Remodelage des Cicatrices",
      "active": "10,0% Symglucan® + Pro-Coll-One+",
      "img": "/img/optimized/dermafacereal.webp",
      "width": 419,
      "height": 747,
      "score": 92,
      "verdict": "Formulé avec 10% de Symglucan et Pro-Coll-One+ ; le fabricant indique jusqu'à +1 190% de synthèse de collagène Type I.",
      "pros": [
        "10% de Symglucan pour accélérer le renouvellement cellulaire",
        "Efficace sur marques d'acné, cicatrices post-opératoires et brûlures",
        "Garantie de remboursement de 90 jours"
      ],
      "cons": [
        "Les tissus anciens exigent 3 à 6 mois de soin régulier",
        "Attendre la cicatrisation cutanée complète avant application"
      ],
      "affiliateUrl": "https://www.dermeffacefx7.com/ct/282956",
      "reviewUrl": "/fr/dermefface-fx7-review.html",
      "price": "$59.95 / tube",
      "guarantee": "Garantie de 90 jours"
    }
  ]
};

  /* ---------- BLOG POSTS DATA BY LANGUAGE (3 latest articles) ---------- */
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
    }
  ]
};

  var UI = {
    en: {
      viewOffer: "View Offer",
      review: "Review",
      readMore: "Read the article",
      empty: "Empty",
      steps: [
        "Loading molecular profiles",
        "Comparing formulation pH windows",
        "Checking oxidation and barrier pathways",
        "Cross-referencing evidence grade"
      ],
      irritationLoad: "Irritation load",
      potencyRetained: "Potency retained",
      evidence: "Evidence: ",
      mechanism: "Mechanism",
      routineAdvice: "Routine advice",
      disclaimer: "General education only. Patch test first and consult a dermatologist for prescription or sensitive-skin routines.",
      awaitingInput: "> awaiting input. Select two actives or tap a cell to run check.",
      orderNote: "Reverse order changes the outcome:",
      swapHint: "Press Swap to compare.",
      reversePotency: "Potency",
      cellLabel: "{a} applied first, {b} applied second: {v}",
      nextSteps: "Next steps",
      openPlanner: "Build Routine in Planner",
      auditedFormulas: "View Audited Formulas",
      plannerHref: "/tools/routine-planner.html",
      reviewsHref: "/reviews/"
    },
    es: {
      viewOffer: "Ver Oferta",
      review: "Análisis",
      readMore: "Leer el artículo",
      empty: "Vacío",
      steps: [
        "Cargando perfiles moleculares",
        "Comparando ventanas de pH de formulación",
        "Verificando vías de oxidación y barrera",
        "Cruzando grados de evidencia científica"
      ],
      irritationLoad: "Carga de irritación",
      potencyRetained: "Potencia retenida",
      evidence: "Evidencia: ",
      mechanism: "Mecanismo",
      routineAdvice: "Consejo de rutina",
      disclaimer: "Solo para fines educativos. Realice una prueba de parche y consulte a un dermatólogo.",
      awaitingInput: "> esperando selección. Elige dos activos o toca una celda para analizar.",
      orderNote: "El orden inverso cambia el resultado:",
      swapHint: "Pulsa Intercambiar para comparar.",
      reversePotency: "Potencia",
      cellLabel: "{a} aplicado primero, {b} aplicado después: {v}",
      nextSteps: "Siguientes pasos",
      openPlanner: "Crear rutina en el planificador",
      auditedFormulas: "Ver fórmulas auditadas",
      plannerHref: "/es/tools/routine-planner.html",
      reviewsHref: "/es/reviews/"
    },
    de: {
      viewOffer: "Angebot ansehen",
      review: "Testbericht",
      readMore: "Artikel lesen",
      empty: "Leer",
      steps: [
        "Molekulare Profile laden",
        "pH-Fenster der Formulierung abgleichen",
        "Oxidations- und Barrierewege prüfen",
        "Evidenzgrade abgleichen"
      ],
      irritationLoad: "Irritationslast",
      potencyRetained: "Wirksamkeit erhalten",
      evidence: "Evidenz: ",
      mechanism: "Mechanismus",
      routineAdvice: "Routine-Empfehlung",
      disclaimer: "Nur zu Bildungszwecken. Führen Sie vorab einen Patch-Test durch.",
      awaitingInput: "> warte auf Eingabe. Wählen Sie zwei Wirkstoffe oder tippen Sie eine Zelle an.",
      orderNote: "Die umgekehrte Reihenfolge ändert das Ergebnis:",
      swapHint: "Zum Vergleichen „Tauschen“ drücken.",
      reversePotency: "Potenz",
      cellLabel: "{a} zuerst angewendet, {b} danach angewendet: {v}",
      nextSteps: "Nächste Schritte",
      openPlanner: "Routine im Planer erstellen",
      auditedFormulas: "Geprüfte Formeln ansehen",
      plannerHref: "/de/tools/routine-planner.html",
      reviewsHref: "/de/reviews/"
    },
    fr: {
      viewOffer: "Voir l'offre",
      review: "Avis",
      readMore: "Lire l'article",
      empty: "Vide",
      steps: [
        "Chargement des profils moléculaires",
        "Comparaison des fenêtres de pH",
        "Vérification des voies d'oxydation et de barrière",
        "Croisement des niveaux de preuve"
      ],
      irritationLoad: "Charge d'irritation",
      potencyRetained: "Efficacité préservée",
      evidence: "Niveau de preuve : ",
      mechanism: "Mécanisme",
      routineAdvice: "Conseil de routine",
      disclaimer: "À visée éducative uniquement. Effectuez un test cutané préalable.",
      awaitingInput: "> en attente de sélection. Choisissez deux actifs ou touchez une case pour analyser.",
      orderNote: "L'ordre inverse change le résultat :",
      swapHint: "Appuyez sur Inverser pour comparer.",
      reversePotency: "Potence",
      cellLabel: "{a} appliqué en premier, {b} appliqué ensuite : {v}",
      nextSteps: "Étapes suivantes",
      openPlanner: "Créer une routine dans le planificateur",
      auditedFormulas: "Consulter les formules auditées",
      plannerHref: "/fr/tools/routine-planner.html",
      reviewsHref: "/fr/reviews/"
    }
  };

  /* ---------- STATE ---------- */
  var activeA = null;
  var activeB = null;
  var busy = false;
  var hasResult = false;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function $(id) {
    return document.getElementById(id);
  }



  /* ---------- MATRIX INITIALIZATION ---------- */
  function renderChips() {
    var m = getMatrix();
    var ING = m.ING;

    var chipsA = $("chips-a");
    var chipsB = $("chips-b");

    if (chipsA) {
      chipsA.innerHTML = ORDER.map(function (k) {
        return '<button type="button" class="chip" data-k="' + k + '" data-slot="a" aria-pressed="false" title="' + ING[k].c + '">' + ING[k].n + '</button>';
      }).join("");
    }

    if (chipsB) {
      chipsB.innerHTML = ORDER.map(function (k) {
        return '<button type="button" class="chip" data-k="' + k + '" data-slot="b" aria-pressed="false" title="' + ING[k].c + '">' + ING[k].n + '</button>';
      }).join("");
    }
  }

  /* The grid is a button group, not an ARIA table. Every cell button
     carries a full order-aware label, so no row/column roles are needed. */
  function renderGrid() {
    var grid = $("grid");
    if (!grid) return;

    var m = getMatrix();
    var ING = m.ING;
    var VERD = m.VERD;
    var ui = UI[getLang()] || UI.en;

    var html = '<div class="h" aria-hidden="true"></div>';
    ORDER.forEach(function (k) {
      html += '<div class="h" aria-hidden="true">' + k + '</div>';
    });
    ORDER.forEach(function (r) {
      html += '<div class="h rh" aria-hidden="true">' + r + '</div>';
      ORDER.forEach(function (c) {
        if (r === c) {
          html += '<div class="cell self" aria-hidden="true"></div>';
          return;
        }
        var rec = MATRIX.lookup(r, c);
        var v = rec.verdict;
        var label = ui.cellLabel.replace("{a}", ING[r].n).replace("{b}", ING[c].n).replace("{v}", VERD[v]);
        html += '<button type="button" class="cell ' + v + '" data-a="' + r + '" data-b="' + c + '" tabindex="-1" aria-label="' + label + '">' +
          (v === "s" ? "+" : v === "c" ? "!" : "•") + '</button>';
      });
    });
    grid.innerHTML = html;
    /* Roving tabindex: the grid is ONE tab stop. Arrow keys move inside it. */
    var first = grid.querySelector(".cell:not(.self)");
    if (first) first.setAttribute("tabindex", "0");
  }

  function updateUI() {
    var m = getMatrix();
    var ING = m.ING;
    var curLang = getLang();
    var ui = UI[curLang] || UI.en;

    var slotA = $("slot-a");
    var slotB = $("slot-b");
    var runBtn = $("run-btn");
    var swapBtn = $("swap-btn");
    var clearBtn = $("clear-btn");
    var count = $("count");

    if (slotA) {
      slotA.classList.toggle("on", !!activeA);
      var strongA = slotA.querySelector("strong");
      if (strongA) strongA.textContent = activeA ? ING[activeA].n : ui.empty;
    }

    if (slotB) {
      slotB.classList.toggle("on", !!activeB);
      var strongB = slotB.querySelector("strong");
      if (strongB) strongB.textContent = activeB ? ING[activeB].n : ui.empty;
    }

    /* Pressed state mirrors slot content. A chip is disabled while a scan
       runs, or when its active already occupies the opposite slot. */
    document.querySelectorAll("#chips-a .chip").forEach(function (c) {
      c.setAttribute("aria-pressed", String(c.dataset.k === activeA));
      c.disabled = busy || c.dataset.k === activeB;
    });
    document.querySelectorAll("#chips-b .chip").forEach(function (c) {
      c.setAttribute("aria-pressed", String(c.dataset.k === activeB));
      c.disabled = busy || c.dataset.k === activeA;
    });

    document.querySelectorAll(".cell.sel").forEach(function (c) {
      c.classList.remove("sel");
    });
    if (activeA && activeB) {
      document.querySelectorAll(".cell:not(.self)").forEach(function (c) {
        if (c.dataset.a === activeA && c.dataset.b === activeB) {
          c.classList.add("sel");
        }
      });
    }

    if (count) {
      var n = (activeA ? 1 : 0) + (activeB ? 1 : 0);
      count.textContent = n + " / 2";
    }

    var canRun = !!(activeA && activeB && activeA !== activeB && !busy);
    if (runBtn) runBtn.disabled = !canRun;
    if (swapBtn) swapBtn.disabled = !canRun;
    if (clearBtn) clearBtn.disabled = busy;
  }

  function setSlot(slot, activeKey) {
    if (busy) return;
    /* Duplicate pairings are invalid: an active never interacts with itself. */
    if (slot === "a" && activeKey === activeB) return;
    if (slot === "b" && activeKey === activeA) return;
    if (slot === "a") {
      activeA = (activeA === activeKey) ? null : activeKey;
    } else {
      activeB = (activeB === activeKey) ? null : activeKey;
    }
    updateUI();
  }

  function runCheck() {
    if (!activeA || !activeB || activeA === activeB || busy) return;
    busy = true;
    updateUI();

    var out = $("output");
    if (!out) {
      busy = false;
      return;
    }
    out.removeAttribute("hidden");

    var curLang = getLang();
    var ui = UI[curLang] || UI.en;
    var m = getMatrix();
    var ING = m.ING;

    var a = activeA;
    var b = activeB;
    var steps = [
      ui.steps[0] + ": " + ING[a].n + " → " + ING[b].n,
      ui.steps[1],
      ui.steps[2],
      ui.steps[3]
    ];

    out.innerHTML = '<div class="scan"><p>&gt; initializing scan…</p><div class="bar"><i id="bi"></i></div><div id="log"></div></div>';
    var i = 0;
    var gap = reduce ? 0 : 350;

    function tick() {
      if (i < steps.length) {
        var p = document.createElement("p");
        p.textContent = "> " + steps[i];
        var log = $("log");
        if (log) log.appendChild(p);
        var bi = $("bi");
        if (bi) bi.style.width = ((i + 1) / steps.length * 100) + "%";
        i++;
        setTimeout(tick, gap);
      } else {
        busy = false;
        renderResult(a, b);
        updateUI();
      }
    }
    tick();
  }

  function meter(label, val, max, color, suffix) {
    return '<div class="metric"><div><span>' + label + '</span><span>' + val + suffix + '</span></div>' +
      '<div class="m"><i style="width:0;background:' + color + ';box-shadow:0 0 10px ' + color + '" data-w="' + (val / max * 100) + '"></i></div></div>';
  }

  function renderResult(a, b) {
    var out = $("output");
    if (!out) return;
    hasResult = true;

    var curLang = getLang();
    var ui = UI[curLang] || UI.en;
    var m = getMatrix();
    var ING = m.ING;
    var VERD = m.VERD;

    var rec = MATRIX.lookup(a, b);
    if (!rec) return;

    var v = rec.verdict;
    var irCol = rec.irritation >= 7 ? "var(--bad)" : rec.irritation >= 4 ? "var(--warn)" : "var(--safe)";
    var poCol = rec.potency < 60 ? "var(--bad)" : rec.potency < 85 ? "var(--warn)" : "var(--safe)";

    var reverseNoteHtml = "";
    if (rec.reversedDiffers && rec.reverse) {
      var rev = rec.reverse;
      var revV = rev.verdict;
      var revBadge = (revV === "s" ? "✔" : revV === "c" ? "⚠" : "●") + " " + (VERD[revV] || revV);
      reverseNoteHtml = '<div class="order-diff">' +
        '<strong>' + ui.orderNote + '</strong> ' +
        ING[b].n + ' → ' + ING[a].n + ' (' + revBadge + ', ' + ui.reversePotency + ': ' + rev.potency + '%). ' +
        '<span class="ev">' + ui.swapHint + '</span>' +
        '</div>';
    }

    var actionsHtml = '<div class="out-actions">' +
      '<div class="out-actions-head"><i class="fa-solid fa-layer-group" aria-hidden="true"></i><span>' + ui.nextSteps + '</span></div>' +
      '<div class="out-actions-btns">' +
      '<a href="' + ui.plannerHref + '" class="btn btn-out"><i class="fa-solid fa-clipboard-check" aria-hidden="true"></i>' + ui.openPlanner + '</a>' +
      '<a href="' + ui.reviewsHref + '" class="btn btn-out sec"><i class="fa-solid fa-list-check" aria-hidden="true"></i>' + ui.auditedFormulas + '</a>' +
      '</div></div>';

    out.innerHTML = '<div class="res"><div>' +
      '<span class="badge ' + v + '">' + (v === "s" ? "✔" : v === "c" ? "⚠" : "●") + " " + VERD[v] + '</span>' +
      '<div class="pair">' + ING[a].n + ' → ' + ING[b].n + '</div>' +
      meter(ui.irritationLoad, rec.irritation, 10, irCol, "/10") +
      meter(ui.potencyRetained, rec.potency, 100, poCol, "%") +
      '<p class="ev">' + ui.evidence + rec.evidence + '</p></div><div>' +
      '<div class="blk"><h4>' + ui.mechanism + '</h4><p>' + rec.mechanism + '</p></div>' +
      '<div class="blk"><h4>' + ui.routineAdvice + '</h4><p><span class="sched">' + rec.schedule + '</span>' + rec.advice + '</p></div>' +
      reverseNoteHtml +
      '<p class="ev">' + ui.disclaimer + '</p></div>' +
      actionsHtml +
      '</div>';

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        document.querySelectorAll("#output .m i").forEach(function (e) {
          e.style.width = e.dataset.w + "%";
        });
      });
    });

    out.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: window.innerWidth <= 768 ? "start" : "nearest" });
  }

  function initMatrixEvents() {
    var chipsA = $("chips-a");
    if (chipsA) {
      chipsA.addEventListener("click", function (e) {
        var c = e.target.closest(".chip");
        if (c && !c.disabled) setSlot("a", c.dataset.k);
      });
    }

    var chipsB = $("chips-b");
    if (chipsB) {
      chipsB.addEventListener("click", function (e) {
        var c = e.target.closest(".chip");
        if (c && !c.disabled) setSlot("b", c.dataset.k);
      });
    }

    /* Per-slot filter inputs. Matches on key, name and category. */
    var ING = getMatrix().ING;
    [["filter-a", "chips-a"], ["filter-b", "chips-b"]].forEach(function (pair) {
      var inp = $(pair[0]);
      if (!inp) return;
      inp.addEventListener("input", function () {
        var q = this.value.trim().toLowerCase();
        document.querySelectorAll("#" + pair[1] + " .chip").forEach(function (c) {
          var k = c.dataset.k;
          var hay = (k + " " + ING[k].n + " " + ING[k].c).toLowerCase();
          c.hidden = q !== "" && hay.indexOf(q) === -1;
        });
      });
    });

    var grid = $("grid");
    if (grid) {
      grid.addEventListener("click", function (e) {
        var cell = e.target.closest(".cell:not(.self)");
        if (!cell || busy) return;
        activeA = cell.dataset.a;
        activeB = cell.dataset.b;
        updateUI();
        runCheck();
      });

      /* Arrow-key navigation over the 7x7 matrix. Self cells are skipped.
         Enter and Space activate the native button. */
      grid.addEventListener("keydown", function (e) {
        var cell = e.target.closest(".cell:not(.self)");
        if (!cell) return;
        var keys = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown", "Home", "End"];
        if (keys.indexOf(e.key) === -1) return;
        e.preventDefault();

        var rows = ORDER, cols = ORDER;
        var r = rows.indexOf(cell.dataset.a);
        var c = cols.indexOf(cell.dataset.b);
        var step = 0;

        if (e.key === "ArrowRight") step = 1;
        else if (e.key === "ArrowLeft") step = -1;
        else if (e.key === "ArrowDown") step = 7;
        else if (e.key === "ArrowUp") step = -7;

        if (e.key === "Home") {
          c = 0;
          if (r === 0) c = 1;
        } else if (e.key === "End") {
          c = 6;
          if (r === 6) c = 5;
        } else {
          var total = 49;
          var idx = r * 7 + c;
          for (var guard = 0; guard < total; guard++) {
            idx += step;
            if (idx < 0 || idx >= total) return;
            var nr = Math.floor(idx / 7), nc = idx % 7;
            if (nr !== nc) { r = nr; c = nc; break; }
          }
        }

        if (r === c) return;
        var target = grid.querySelector('.cell[data-a="' + rows[r] + '"][data-b="' + cols[c] + '"]');
        if (!target) return;
        var all = grid.querySelectorAll(".cell:not(.self)");
        Array.prototype.forEach.call(all, function (n) { n.setAttribute("tabindex", "-1"); });
        target.setAttribute("tabindex", "0");
        target.focus();
      });
    }

    var runBtn = $("run-btn");
    if (runBtn) runBtn.addEventListener("click", runCheck);

    var swapBtn = $("swap-btn");
    if (swapBtn) {
      swapBtn.addEventListener("click", function () {
        if (!activeA || !activeB || busy) return;
        var tmp = activeA;
        activeA = activeB;
        activeB = tmp;
        updateUI();
        /* Re-render only when a scan already produced a result. Swap never
           reveals an uncalculated outcome. */
        if (hasResult) {
          renderResult(activeA, activeB);
        }
      });
    }

    var clearBtn = $("clear-btn");
    if (clearBtn) {
      clearBtn.addEventListener("click", function () {
        if (busy) return;
        activeA = null;
        activeB = null;
        hasResult = false;
        updateUI();
        var ui = UI[getLang()] || UI.en;
        var out = $("output");
        if (out) {
          out.innerHTML = '<p class="idle">' + ui.awaitingInput + '</p>';
        }
      });
    }
  }

  /* ---------- RENDER REVIEWS (5 audited cards) ---------- */
  function renderReviews() {
    var grid = $("reviews-grid");
    if (!grid) return;

    var curLang = getLang();
    var list = PRODUCTS_BY_LANG[curLang] || PRODUCTS_BY_LANG.en;
    var ui = UI[curLang] || UI.en;

    var html = list.map(function (p) {
      return '<article class="glass rev">' +
        '<div class="top">' +
        '<div>' +
        '<h3>' + p.name + '</h3>' +
        '<div class="brandn">' + p.brand + ' · ' + p.category + '</div>' +
        '</div>' +
        '<div class="score" aria-label="Score ' + p.score + ' out of 100">' + p.score + '<small>/100</small></div>' +
        '</div>' +
        '<div class="m" role="img" aria-label="Score meter"><i style="width:' + p.score + '%;background:linear-gradient(90deg,var(--violet),var(--sci));box-shadow:0 0 10px var(--sci)"></i></div>' +
        '<div class="tags"><span class="tag">' + p.active + '</span><span class="tag">' + p.guarantee + '</span></div>' +
        '<div class="pc">' +
        '<span><b class="p">+</b> ' + p.pros[0] + '</span>' +
        '<span><b class="q">−</b> ' + p.cons[0] + '</span>' +
        '</div>' +
        '<p class="verdict">"' + p.verdict + '"</p>' +
        '<div style="display:flex;gap:.5rem;margin-top:auto;">' +
        '<a class="btn affiliate-link" href="' + p.affiliateUrl + '" rel="noopener nofollow sponsored" target="_blank" data-product="' + p.key + '" data-placement="home-card" style="flex:1;text-align:center;">' + ui.viewOffer + ' <i class="fa-solid fa-arrow-up-right-from-square"></i></a>' +
        '<a class="btn ghost" href="' + p.reviewUrl + '" style="text-align:center;">' + ui.review + '</a>' +
        '</div>' +
        '<div class="price">' + p.price + ' · ' + p.guarantee + '</div>' +
        '</article>';
    }).join("");

    grid.innerHTML = html;
  }

  /* ---------- RENDER BLOG (3 latest articles) ---------- */
  function renderBlog() {
    var grid = $("blog-grid");
    if (!grid) return;

    var curLang = getLang();
    var list = POSTS_BY_LANG[curLang] || POSTS_BY_LANG.en;
    var ui = UI[curLang] || UI.en;

    var html = list.map(function (p) {
      return '<article class="glass post">' +
        '<div class="meta">' +
        '<span class="cat">' + p.category + '</span>' +
        '<time datetime="' + p.iso + '"><span>' + p.date + '</span></time>' +
        '<span>' + p.readTime + '</span>' +
        '</div>' +
        '<h3>' + p.title + '</h3>' +
        '<p>' + p.excerpt + '</p>' +
        '<a class="more" href="' + p.url + '" aria-label="' + ui.readMore + ': ' + p.title + '">' + ui.readMore + ' <i class="fa-solid fa-arrow-right"></i></a>' +
        '</article>';
    }).join("");

    grid.innerHTML = html;
  }

  /* Spotlight, tilt, telemetry clock, and language switcher live in app.js (single owner). */

  /* ---------- INITIALIZATION ---------- */
  function updateMatrixCounts() {
    if (!MATRIX || !MATRIX.stats) return;
    var st = MATRIX.stats();
    document.querySelectorAll('[data-matrix-count="ordered"]').forEach(function (el) {
      el.textContent = String(st.ordered);
    });
  }

  /* ---------- INITIALIZATION ---------- */
  function init() {
    updateMatrixCounts();
    renderChips();
    renderGrid();
    initMatrixEvents();
    renderReviews();
    renderBlog();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
