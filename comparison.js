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

  var PRODUCTS = {
  "en": [
    {
      "key": "kollagen",
      "name": "Kollagen Intensiv™",
      "brand": "Skinception",
      "category": "Anti-Aging & Wrinkles",
      "active": "Syn-Coll® (Palmitoyl Tripeptide-5)",
      "img": "/img/optimized/kollagen_boxbottle_lg.webp",
      "score": 94,
      "concern": "Facial Wrinkles & Collagen Loss",
      "price": "$59.95 / jar",
      "guarantee": "90-Day Money-Back Guarantee",
      "affiliateUrl": "https://www.kollagenintensiv.com/ct/282956",
      "reviewUrl": "/kollagen-intensiv-review.html"
    },
    {
      "key": "synevra",
      "name": "Synevra UltraLift™",
      "brand": "Synevra Clinical",
      "category": "Anti-Aging & Expression Lines",
      "active": "SYN-AKE® Dipeptide Complex",
      "img": "/img/optimized/synevra.webp",
      "score": 91,
      "concern": "Dynamic Expression Lines & Forehead Furrows",
      "price": "$79.00 / unit",
      "guarantee": "60-Day Money-Back Guarantee",
      "affiliateUrl": "https://fa90bat349vj5m8h47ps5z4k7l.hop.clickbank.net",
      "reviewUrl": "/synevra-ultralift-review.html"
    },
    {
      "key": "illuminatural",
      "name": "Illuminatural 6i™",
      "brand": "Skinception",
      "category": "Dark Spots & Brightening",
      "active": "Alpha-Arbutin & 5% Niacinamide",
      "img": "/img/optimized/illuminatural6i_icon001_600x600.webp",
      "score": 90,
      "concern": "Sun Spots, Melasma & Hyperpigmentation",
      "price": "$59.95 / bottle",
      "guarantee": "90-Day Money-Back Guarantee",
      "affiliateUrl": "https://www.illuminatural6i.com/ct/282956",
      "reviewUrl": "/illuminatural-6i-review.html"
    },
    {
      "key": "eyelasticity",
      "name": "Eyelasticity™",
      "brand": "Skinception",
      "category": "Eyes & Dark Circles",
      "active": "Eyeseryl® (Tetrapeptide-5) + Regu®-Age",
      "img": "/img/optimized/eyelasticity800.webp",
      "score": 89,
      "concern": "Under-Eye Dark Circles & Puffy Bags",
      "price": "$59.95 / bottle",
      "guarantee": "67-Day Money-Back Guarantee",
      "affiliateUrl": "https://www.naturalhealthsource.com/products/eyelasticity-age-defying-eye-therapy/?aid=282956",
      "reviewUrl": "/eyelasticity-review.html"
    },
    {
      "key": "dermefface",
      "name": "Dermefface FX7®",
      "brand": "Skinception",
      "category": "Dermal Scar Remodeling",
      "active": "10.0% Symglucan® + Pro-Coll-One+",
      "img": "/img/optimized/dermafacereal.webp",
      "score": 92,
      "concern": "Dermal Scar Remodeling & Textural Recovery",
      "price": "$59.95 / tube",
      "guarantee": "90-Day Money-Back Guarantee",
      "affiliateUrl": "https://www.dermeffacefx7.com/ct/282956",
      "reviewUrl": "/dermefface-fx7-review.html"
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
      "score": 94,
      "concern": "Arrugas Faciales y Pérdida de Colágeno",
      "price": "$59.95 / tarro",
      "guarantee": "Garantía de devolución de 90 días",
      "affiliateUrl": "https://www.kollagenintensiv.com/ct/282956",
      "reviewUrl": "/es/kollagen-intensiv-review.html"
    },
    {
      "key": "synevra",
      "name": "Synevra UltraLift™",
      "brand": "Synevra Clinical",
      "category": "Líneas de Expresión y Entrecejo",
      "active": "Complejo Dipéptido SYN-AKE®",
      "img": "/img/optimized/synevra.webp",
      "score": 91,
      "concern": "Líneas de Expresión y Surcos de la Frente",
      "price": "$79.00 / unidad",
      "guarantee": "Garantía de devolución de 60 días",
      "affiliateUrl": "https://fa90bat349vj5m8h47ps5z4k7l.hop.clickbank.net",
      "reviewUrl": "/es/synevra-ultralift-review.html"
    },
    {
      "key": "illuminatural",
      "name": "Illuminatural 6i™",
      "brand": "Skinception",
      "category": "Manchas y Tono de Piel",
      "active": "Alfa-Arbutina y 5% Niacinamida",
      "img": "/img/optimized/illuminatural6i_icon001_600x600.webp",
      "score": 90,
      "concern": "Manchas Solares, Melasma e Hiperpigmentación",
      "price": "$59.95 / frasco",
      "guarantee": "Garantía de devolución de 90 días",
      "affiliateUrl": "https://www.illuminatural6i.com/ct/282956",
      "reviewUrl": "/es/illuminatural-6i-review.html"
    },
    {
      "key": "eyelasticity",
      "name": "Eyelasticity™",
      "brand": "Skinception",
      "category": "Ojeras y Bolsas",
      "active": "Eyeseryl® (Tetrapéptido-5) + Regu®-Age",
      "img": "/img/optimized/eyelasticity800.webp",
      "score": 89,
      "concern": "Ojeras y Bolsas Periorbitales",
      "price": "$59.95 / frasco",
      "guarantee": "Garantía de devolución de 67 días",
      "affiliateUrl": "https://www.naturalhealthsource.com/products/eyelasticity-age-defying-eye-therapy/?aid=282956",
      "reviewUrl": "/es/eyelasticity-review.html"
    },
    {
      "key": "dermefface",
      "name": "Dermefface FX7®",
      "brand": "Skinception",
      "category": "Remodelación de Cicatrices",
      "active": "Symglucan® 10.0% + Pro-Coll-One+",
      "img": "/img/optimized/dermafacereal.webp",
      "score": 92,
      "concern": "Remodelación de Cicatrices y Recuperación Dérmica",
      "price": "$59.95 / tubo",
      "guarantee": "Garantía de devolución de 90 días",
      "affiliateUrl": "https://www.dermeffacefx7.com/ct/282956",
      "reviewUrl": "/es/dermefface-fx7-review.html"
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
      "score": 94,
      "concern": "Gesichtsfalten & Kollagenverlust",
      "price": "$59.95 / Tiegel",
      "guarantee": "90-Tage Geld-zurück-Garantie",
      "affiliateUrl": "https://www.kollagenintensiv.com/ct/282956",
      "reviewUrl": "/de/kollagen-intensiv-review.html"
    },
    {
      "key": "synevra",
      "name": "Synevra UltraLift™",
      "brand": "Synevra Clinical",
      "category": "Mimikfalten & Stirnlinien",
      "active": "SYN-AKE® Dipeptid-Komplex",
      "img": "/img/optimized/synevra.webp",
      "score": 91,
      "concern": "Dynamische Mimikfalten & Stirnfurchen",
      "price": "$79.00 / Einheit",
      "guarantee": "60-Tage Geld-zurück-Garantie",
      "affiliateUrl": "https://fa90bat349vj5m8h47ps5z4k7l.hop.clickbank.net",
      "reviewUrl": "/de/synevra-ultralift-review.html"
    },
    {
      "key": "illuminatural",
      "name": "Illuminatural 6i™",
      "brand": "Skinception",
      "category": "Pigmentflecken & Aufhellung",
      "active": "Alpha-Arbutin & 5% Niacinamid",
      "img": "/img/optimized/illuminatural6i_icon001_600x600.webp",
      "score": 90,
      "concern": "Sonnenflecken, Melasma & Hyperpigmentierung",
      "price": "$59.95 / Flakon",
      "guarantee": "90-Tage Geld-zurück-Garantie",
      "affiliateUrl": "https://www.illuminatural6i.com/ct/282956",
      "reviewUrl": "/de/illuminatural-6i-review.html"
    },
    {
      "key": "eyelasticity",
      "name": "Eyelasticity™",
      "brand": "Skinception",
      "category": "Augenringe & Schwellungen",
      "active": "Eyeseryl® (Tetrapeptid-5) + Regu®-Age",
      "img": "/img/optimized/eyelasticity800.webp",
      "score": 89,
      "concern": "Augenringe & Schwellungen",
      "price": "$59.95 / Flakon",
      "guarantee": "67-Tage Geld-zurück-Garantie",
      "affiliateUrl": "https://www.naturalhealthsource.com/products/eyelasticity-age-defying-eye-therapy/?aid=282956",
      "reviewUrl": "/de/eyelasticity-review.html"
    },
    {
      "key": "dermefface",
      "name": "Dermefface FX7®",
      "brand": "Skinception",
      "category": "Dermale Narbenreparatur",
      "active": "10,0% Symglucan® + Pro-Coll-One+",
      "img": "/img/optimized/dermafacereal.webp",
      "score": 92,
      "concern": "Dermale Narbenremodellierung & Texturregeneration",
      "price": "$59.95 / Tube",
      "guarantee": "90-Tage Geld-zurück-Garantie",
      "affiliateUrl": "https://www.dermeffacefx7.com/ct/282956",
      "reviewUrl": "/de/dermefface-fx7-review.html"
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
      "score": 94,
      "concern": "Rides Faciales & Perte de Collagène",
      "price": "$59.95 / pot",
      "guarantee": "Garantie de remboursement de 90 jours",
      "affiliateUrl": "https://www.kollagenintensiv.com/ct/282956",
      "reviewUrl": "/fr/kollagen-intensiv-review.html"
    },
    {
      "key": "synevra",
      "name": "Synevra UltraLift™",
      "brand": "Synevra Clinical",
      "category": "Rides d'Expression & Front",
      "active": "Complexe Dipeptide SYN-AKE®",
      "img": "/img/optimized/synevra.webp",
      "score": 91,
      "concern": "Rides d'Expression & Sillons Frontaux",
      "price": "$79.00 / unité",
      "guarantee": "Garantie de remboursement de 60 jours",
      "affiliateUrl": "https://fa90bat349vj5m8h47ps5z4k7l.hop.clickbank.net",
      "reviewUrl": "/fr/synevra-ultralift-review.html"
    },
    {
      "key": "illuminatural",
      "name": "Illuminatural 6i™",
      "brand": "Skinception",
      "category": "Taches et Teint",
      "active": "Alpha-Arbutine & 5% Niacinamide",
      "img": "/img/optimized/illuminatural6i_icon001_600x600.webp",
      "score": 90,
      "concern": "Taches Solaires, Mélasma & Hyperpigmentation",
      "price": "$59.95 / flacon",
      "guarantee": "Garantie de remboursement de 90 jours",
      "affiliateUrl": "https://www.illuminatural6i.com/ct/282956",
      "reviewUrl": "/fr/illuminatural-6i-review.html"
    },
    {
      "key": "eyelasticity",
      "name": "Eyelasticity™",
      "brand": "Skinception",
      "category": "Cernes & Poches",
      "active": "Eyeseryl® (Tétrapeptide-5) + Regu®-Age",
      "img": "/img/optimized/eyelasticity800.webp",
      "score": 89,
      "concern": "Cernes Péri-Orbitaires & Poches Sous les Yeux",
      "price": "$59.95 / flacon",
      "guarantee": "Garantie de remboursement de 67 jours",
      "affiliateUrl": "https://www.naturalhealthsource.com/products/eyelasticity-age-defying-eye-therapy/?aid=282956",
      "reviewUrl": "/fr/eyelasticity-review.html"
    },
    {
      "key": "dermefface",
      "name": "Dermefface FX7®",
      "brand": "Skinception",
      "category": "Remodelage des Cicatrices",
      "active": "10,0% Symglucan® + Pro-Coll-One+",
      "img": "/img/optimized/dermafacereal.webp",
      "score": 92,
      "concern": "Remodelage des Cicatrices & Réparation Cutanée",
      "price": "$59.95 / tube",
      "guarantee": "Garantie de remboursement de 90 jours",
      "affiliateUrl": "https://www.dermeffacefx7.com/ct/282956",
      "reviewUrl": "/fr/dermefface-fx7-review.html"
    }
  ]
};

  var LABELS = {
    en: { viewOffer: "View Offer", review: "Review" },
    es: { viewOffer: "Ver Oferta", review: "Análisis" },
    de: { viewOffer: "Angebot ansehen", review: "Testbericht" },
    fr: { viewOffer: "Voir l'offre", review: "Lire l'avis" }
  };

  function renderTable() {
    var tbody = document.getElementById("comparison-tbody");
    if (!tbody) return;

    var curLang = getLang();
    var list = PRODUCTS[curLang] || PRODUCTS.en;
    var lbl = LABELS[curLang] || LABELS.en;

    var html = list.map(function (p) {
      return '<tr>' +
        '<td>' +
        '<div style="display:flex;align-items:center;gap:.75rem;">' +
        '<img src="' + p.img + '" alt="' + p.name + '" width="48" height="48" style="object-fit:cover;border-radius:8px;border:1px solid var(--line);background:rgba(0,0,0,.3);" loading="lazy">' +
        '<div>' +
        '<strong style="display:block;color:var(--text);font-size:.95rem;">' + p.name + '</strong>' +
        '<span style="font-size:.75rem;color:var(--mute);font-family:var(--mono);">' + p.brand + '</span>' +
        '</div>' +
        '</div>' +
        '</td>' +
        '<td><span class="tag" style="font-size:.78rem;">' + p.active + '</span></td>' +
        '<td style="color:var(--text);font-size:.88rem;">' + p.concern + '</td>' +
        '<td>' +
        '<div style="font-family:var(--display);font-weight:700;font-size:1.15rem;color:var(--sci);">' + p.score + '<small style="font-size:.75rem;color:var(--mute);">/100</small></div>' +
        '</td>' +
        '<td style="font-family:var(--mono);font-size:.85rem;color:var(--text);">' + p.price + '</td>' +
        '<td><span style="font-size:.82rem;color:var(--safe);">' + p.guarantee + '</span></td>' +
        '<td>' +
        '<div style="display:flex;flex-direction:column;gap:.35rem;">' +
        '<a class="btn btn-primary affiliate-link" href="' + p.affiliateUrl + '" rel="noopener nofollow sponsored" target="_blank" data-product="' + p.key + '" data-placement="comparison-row" style="padding:.35rem .6rem;font-size:.75rem;text-align:center;">' + lbl.viewOffer + ' <i class="fa-solid fa-arrow-up-right-from-square"></i></a>' +
        '<a class="btn btn-ghost" href="' + p.reviewUrl + '" style="padding:.35rem .6rem;font-size:.75rem;text-align:center;">' + lbl.review + '</a>' +
        '</div>' +
        '</td>' +
        '</tr>';
    }).join("");

    tbody.innerHTML = html;
  }

  /* Spotlight, tilt, telemetry clock and language switcher live in app.js (single owner). */
  function init() {
    renderTable();
    if (window.DermAudit && typeof window.DermAudit.initLangSwitcher === "function") {
      window.DermAudit.initLangSwitcher();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
