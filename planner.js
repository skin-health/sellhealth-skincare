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

  var CATALOG_BY_LANG = {
  "en": {
    "wrinkles": {
      "key": "kollagen",
      "name": "Kollagen Intensiv™ Collagen Renewal Cream",
      "brand": "Skinception",
      "active": "Swiss Syn-Coll® (Palmitoyl Tripeptide-5)",
      "badge": "OPTIMAL MATCH: DAILY COLLAGEN RENEWAL",
      "score": 94,
      "hook": "The manufacturer reports that its Swiss Syn-Coll® peptide formula boosts natural collagen synthesis by up to 354% in vitro to smooth deep expression wrinkles.",
      "img": "/img/optimized/kollagen_boxbottle_lg.webp",
      "affiliateUrl": "https://www.kollagenintensiv.com/ct/282956",
      "reviewUrl": "/kollagen-intensiv-review.html",
      "price": "$59.95 / jar",
      "guarantee": "90-Day Money-Back Guarantee",
      "am": [
        "Gentle hydrating cleanser (low-pH)",
        "Antioxidant serum (Vitamin C or Niacinamide)",
        "Kollagen Intensiv™ (apply thin layer to face and neck)",
        "Broad-spectrum SPF 30+ mineral sunscreen"
      ],
      "pm": [
        "Double cleanse to remove sunscreen and environmental debris",
        "Targeted barrier toner or essence",
        "Kollagen Intensiv™ (generous evening application)",
        "Optional barrier facial oil to lock in peptide matrix"
      ],
      "caution": "Chemically compatible with niacinamide and hyaluronic acid. If using an AHA/BHA exfoliant, alternate nights or wait 20 minutes before applying peptide cream to prevent acid hydrolysis."
    },
    "expression": {
      "key": "synevra",
      "name": "Synevra UltraLift™ Expression Line Protocol",
      "brand": "Synevra Clinical",
      "active": "SYN-AKE® Dipeptide Neuromuscular Complex",
      "badge": "OPTIMAL MATCH: DYNAMIC LINE RELAXATION",
      "score": 91,
      "hook": "The manufacturer reports that its targeted SYN-AKE® dipeptide complex reduces dynamic muscle micro-contractions by up to 82% to smooth forehead furrows and smile creases without needles.",
      "img": "/img/optimized/synevra.webp",
      "affiliateUrl": "https://fa90bat349vj5m8h47ps5z4k7l.hop.clickbank.net",
      "reviewUrl": "/synevra-ultralift-review.html",
      "price": "$79.00 / unit",
      "guarantee": "60-Day Money-Back Guarantee",
      "am": [
        "Gentle cleanser",
        "Synevra UltraLift™ (pat directly into forehead lines and crow's feet)",
        "Lightweight non-comedogenic moisturizer",
        "Daily broad-spectrum sunscreen"
      ],
      "pm": [
        "Thorough evening cleanse",
        "Synevra UltraLift™ (apply to dynamic expression zones)",
        "Restorative peptide or ceramide night cream"
      ],
      "caution": "Avoid mixing with strong direct oxidizers (like high-strength Benzoyl Peroxide) in the exact same layer. Safe to combine with niacinamide and gentle retinoids."
    },
    "spots": {
      "key": "illuminatural",
      "name": "Illuminatural 6i™ Advanced Skin Brightener",
      "brand": "Skinception",
      "active": "Alpha-Arbutin & 5% Niacinamide (Zero Hydroquinone)",
      "badge": "OPTIMAL MATCH: BOTANICAL BRIGHTENING",
      "score": 90,
      "hook": "The manufacturer reports that its 4 botanical brighteners (Alpha-Arbutin, Whitonyl®, Niacinamide) inhibit tyrosinase melanin synthesis without toxic bleaching agents.",
      "img": "/img/optimized/illuminatural6i_icon001_600x600.webp",
      "affiliateUrl": "https://www.illuminatural6i.com/ct/282956",
      "reviewUrl": "/illuminatural-6i-review.html",
      "price": "$59.95 / bottle",
      "guarantee": "90-Day Money-Back Guarantee",
      "am": [
        "Mild balancing cleanser",
        "Illuminatural 6i™ (apply to sun spots and hyperpigmented zones)",
        "Hydrating antioxidant moisturizer",
        "Essential SPF 50 sunscreen (prevents UV-induced melanogenesis)"
      ],
      "pm": [
        "Purifying evening cleanse",
        "Illuminatural 6i™ (full face or targeted dark spot application)",
        "Lipid barrier recovery cream"
      ],
      "caution": "Alpha-arbutin is stable and gentle. Can be used morning and evening. Pair with Vitamin C in the morning for enhanced tyrosinase defense."
    },
    "eyes": {
      "key": "eyelasticity",
      "name": "Eyelasticity™ Age-Defying Eye Therapy",
      "brand": "Skinception",
      "active": "Eyeseryl® (Tetrapeptide-5) + Regu®-Age",
      "badge": "OPTIMAL MATCH: PERIORBITAL EYE THERAPY",
      "score": 89,
      "hook": "Multi-peptide eye formula; the manufacturer reports reduced under-eye fluid puffiness, dark circle chromophore accumulation, and crow's feet within 15 to 28 days.",
      "img": "/img/optimized/eyelasticity800.webp",
      "affiliateUrl": "https://www.naturalhealthsource.com/products/eyelasticity-age-defying-eye-therapy/?aid=282956",
      "reviewUrl": "/eyelasticity-review.html",
      "price": "$59.95 / bottle",
      "guarantee": "67-Day Money-Back Guarantee",
      "am": [
        "Refresh face with cool water or gentle cleanser",
        "Eyelasticity™ (gently tap a pea-sized drop along orbital bone)",
        "Daily moisturizer & facial SPF"
      ],
      "pm": [
        "Gentle eye makeup removal and cleanse",
        "Eyelasticity™ (pat around orbital eye contour)",
        "Restorative evening moisturizer"
      ],
      "caution": "Formulated specifically for the thin periorbital zone. Do not rub vigorously into the eye or combine with harsh exfoliating acids in the orbital area."
    },
    "scars": {
      "key": "dermefface",
      "name": "Dermefface FX7® Scar Remodeling Therapy",
      "brand": "Skinception",
      "active": "10.0% Symglucan® + Pro-Coll-One+",
      "badge": "OPTIMAL MATCH: SCAR REMODELING GEL",
      "score": 92,
      "hook": "Formulated with 10% Symglucan and Pro-Coll-One+; the manufacturer reports up to a 1,190% increase in Type I collagen synthesis to help normalize and flatten scar tissue.",
      "img": "/img/optimized/dermafacereal.webp",
      "affiliateUrl": "https://www.dermeffacefx7.com/ct/282956",
      "reviewUrl": "/dermefface-fx7-review.html",
      "price": "$59.95 / tube",
      "guarantee": "90-Day Money-Back Guarantee",
      "am": [
        "Cleanse scarred zone thoroughly",
        "Dermefface FX7® (massage gently into scar until absorbed)",
        "Sunscreen protection (crucial to protect healing scar tissue from darkening)"
      ],
      "pm": [
        "Evening cleanse",
        "Dermefface FX7® (apply twice daily for optimal cell turnover)",
        "Gentle barrier cream if area feels tight"
      ],
      "caution": "Wait until surgical incisions or open wounds are fully closed before initiating topical scar therapy. Consistent daily application over 60–90 days is essential."
    },
    "hydration": {
      "key": "hydrossential",
      "name": "Hydrossential™ Botanical Hydration Serum",
      "brand": "Hydrossential",
      "active": "Jojoba, Gotu Kola, Aloe Vera & Green Tea",
      "badge": "OPTIMAL MATCH: BOTANICAL HYDRATION",
      "score": 76,
      "hook": "Lightweight 30 ml botanical dropper serum pairing jojoba wax esters, gotu kola, green tea, and aloe vera; exact active percentages are undisclosed in a proprietary blend.",
      "img": "/img/optimized/hydrossential.webp",
      "affiliateUrl": "https://21ac6covthykdn0bzbwe5hhh1d.hop.clickbank.net",
      "reviewUrl": "/hydrossential-review.html",
      "price": "$69.00 / bottle",
      "guarantee": "60-Day Money-Back Guarantee",
      "am": [
        "Gentle hydrating cleanser (non-stripping)",
        "Hydrossential™ (2–3 drops pressed into damp skin)",
        "Barrier moisturizer if skin feels dry",
        "Daily broad-spectrum SPF 30+ sunscreen"
      ],
      "pm": [
        "Mild evening cleanse",
        "Hydrossential™ (apply evenly across face and neck)",
        "Ceramide night cream to seal in hydration"
      ],
      "caution": "Uses a proprietary botanical blend that includes Japanese witch hazel and herbal extracts; patch test first if you have reactive or very dry skin."
    }
  },
  "es": {
    "wrinkles": {
      "key": "kollagen",
      "name": "Kollagen Intensiv™ Crema de Renovación de Colágeno",
      "brand": "Skinception",
      "active": "Syn-Coll® Suizo (Palmitoil Tripéptido-5)",
      "badge": "COINCIDENCIA ÓPTIMA: RENOVACIÓN DIARIA DE COLÁGENO",
      "score": 94,
      "hook": "El fabricante informa que su fórmula con péptido suizo Syn-Coll® estimula la síntesis de colágeno hasta un 354% in vitro para alisar arrugas profundas de expresión.",
      "img": "/img/optimized/kollagen_boxbottle_lg.webp",
      "affiliateUrl": "https://www.kollagenintensiv.com/ct/282956",
      "reviewUrl": "/es/kollagen-intensiv-review.html",
      "price": "$59.95 / tarro",
      "guarantee": "Garantía de 90 días",
      "am": [
        "Limpiador hidratante suave (pH equilibrado)",
        "Sérum antioxidante (Vitamina C o Niacinamida)",
        "Kollagen Intensiv™ (aplicar capa fina en rostro y cuello)",
        "Protector solar mineral amplio espectro SPF 30+"
      ],
      "pm": [
        "Doble limpieza para retirar residuos ambientales",
        "Tónico o esencia hidratante de barrera",
        "Kollagen Intensiv™ (aplicación generosa nocturna)",
        "Aceite facial de barrera opcional para sellar péptidos"
      ],
      "caution": "Compatible químicamente con niacinamida y ácido hialurónico. Si utiliza exfoliantes AHA/BHA, alterne noches o espere 20 minutos para evitar hidrólisis ácida."
    },
    "expression": {
      "key": "synevra",
      "name": "Synevra UltraLift™ Protocolo para Líneas de Expresión",
      "brand": "Synevra Clinical",
      "active": "Complejo Neuromuscular Dipéptido SYN-AKE®",
      "badge": "COINCIDENCIA ÓPTIMA: RELAJACIÓN DE LÍNEAS DINÁMICAS",
      "score": 91,
      "hook": "El fabricante informa que su complejo de dipéptido SYN-AKE® relaja las microcontracciones musculares hasta en un 82% para suavizar surcos de la frente y patas de gallo sin agujas.",
      "img": "/img/optimized/synevra.webp",
      "affiliateUrl": "https://fa90bat349vj5m8h47ps5z4k7l.hop.clickbank.net",
      "reviewUrl": "/es/synevra-ultralift-review.html",
      "price": "$79.00 / unidad",
      "guarantee": "Garantía de 60 días",
      "am": [
        "Limpiador suave",
        "Synevra UltraLift™ (aplicar con toques suaves en frente y patas de gallo)",
        "Hidratante ligera no comedogénica",
        "Protector solar de amplio espectro diario"
      ],
      "pm": [
        "Limpieza facial nocturna completa",
        "Synevra UltraLift™ (aplicar en zonas de expresión dinámica)",
        "Crema reparadora de noche con péptidos o ceramidas"
      ],
      "caution": "Evite mezclar con oxidantes fuertes directos (como Peróxido de Benzoilo concentrado) en la misma capa. Seguro con niacinamida y retinoides suaves."
    },
    "spots": {
      "key": "illuminatural",
      "name": "Illuminatural 6i™ Aclarador Cutáneo Avanzado",
      "brand": "Skinception",
      "active": "Alfa-Arbutina y 5% Niacinamida (Sin Hidroquinona)",
      "badge": "COINCIDENCIA ÓPTIMA: LUMINOSIDAD BOTÁNICA",
      "score": 90,
      "hook": "El fabricante informa que sus activos botánicos (Alfa-Arbutina, Niacinamida) inhiben la síntesis de tirosinasa sin agentes blanqueadores tóxicos.",
      "img": "/img/optimized/illuminatural6i_icon001_600x600.webp",
      "affiliateUrl": "https://www.illuminatural6i.com/ct/282956",
      "reviewUrl": "/es/illuminatural-6i-review.html",
      "price": "$59.95 / frasco",
      "guarantee": "Garantía de 90 días",
      "am": [
        "Limpiador equilibrante suave",
        "Illuminatural 6i™ (aplicar sobre manchas solares e hiperpigmentación)",
        "Hidratante antioxidante",
        "Protector solar SPF 50 imprescindible (previene melanogénesis UV)"
      ],
      "pm": [
        "Limpieza purificante nocturna",
        "Illuminatural 6i™ (aplicación facial completa o focalizada)",
        "Crema recuperadora de barrera lipídica"
      ],
      "caution": "La alfa-arbutina es estable y suave. Apta para uso mañana y noche. Combine con Vitamina C por la mañana para mayor protección contra la tirosinasa."
    },
    "eyes": {
      "key": "eyelasticity",
      "name": "Eyelasticity™ Terapia Antiedad para el Contorno de Ojos",
      "brand": "Skinception",
      "active": "Eyeseryl® (Tetrapéptido-5) + Regu®-Age",
      "badge": "COINCIDENCIA ÓPTIMA: TERAPIA PERIORBITAL",
      "score": 89,
      "hook": "Fórmula multipeptídica; el fabricante informa reducción de bolsas con retención de líquidos, pigmentos oscuros y patas de gallo en 15 a 28 días.",
      "img": "/img/optimized/eyelasticity800.webp",
      "affiliateUrl": "https://www.naturalhealthsource.com/products/eyelasticity-age-defying-eye-therapy/?aid=282956",
      "reviewUrl": "/es/eyelasticity-review.html",
      "price": "$59.95 / frasco",
      "guarantee": "Garantía de 67 días",
      "am": [
        "Refrescar el rostro con agua templada o limpiador suave",
        "Eyelasticity™ (toques suaves de una gota a lo largo del hueso orbital)",
        "Hidratante diaria y protector solar facial"
      ],
      "pm": [
        "Desmaquillado y limpieza ocular suave",
        "Eyelasticity™ (aplicar suavemente en el contorno del ojo)",
        "Hidratante restauradora de noche"
      ],
      "caution": "Formulado específicamente para la zona periorbital fina. No frotar con fuerza en el ojo ni mezclar con ácidos exfoliantes fuertes en el área ocular."
    },
    "scars": {
      "key": "dermefface",
      "name": "Dermefface FX7® Terapia de Remodelación de Cicatrices",
      "brand": "Skinception",
      "active": "10,0% Symglucan® + Pro-Coll-One+",
      "badge": "COINCIDENCIA ÓPTIMA: GEL DE REMODELACIÓN DÉRMICA",
      "score": 92,
      "hook": "Formulado con Symglucan al 10% y Pro-Coll-One+; el fabricante informa un aumento del 1.190% en síntesis de colágeno Tipo I para normalizar y aplanar cicatrices.",
      "img": "/img/optimized/dermafacereal.webp",
      "affiliateUrl": "https://www.dermeffacefx7.com/ct/282956",
      "reviewUrl": "/es/dermefface-fx7-review.html",
      "price": "$59.95 / tubo",
      "guarantee": "Garantía de 90 días",
      "am": [
        "Limpiar bien la zona con cicatriz",
        "Dermefface FX7® (masajear suavemente hasta su completa absorción)",
        "Protección solar estricta (vital para evitar que la cicatriz se oscurezca)"
      ],
      "pm": [
        "Limpieza nocturna suave",
        "Dermefface FX7® (aplicar dos veces al día para óptima regeneración)",
        "Crema emoliente si la zona presenta tirantez"
      ],
      "caution": "Espere a que las incisiones quirúrgicas o heridas abiertas estén totalmente cerradas antes de aplicar. La constancia diaria durante 60–90 días es clave."
    },
    "hydration": {
      "key": "hydrossential",
      "name": "Hydrossential™ Sérum de Hidratación Botánica",
      "brand": "Hydrossential",
      "active": "Jojoba, Gotu Kola, Aloe Vera y Té Verde",
      "badge": "COINCIDENCIA ÓPTIMA: HIDRATACIÓN BOTÁNICA",
      "score": 76,
      "hook": "Sérum ligero con gotero de 30 ml que combina ésteres de jojoba, gotu kola, té verde y aloe vera; los porcentajes exactos no se divulgan en una mezcla patentada.",
      "img": "/img/optimized/hydrossential.webp",
      "affiliateUrl": "https://21ac6covthykdn0bzbwe5hhh1d.hop.clickbank.net",
      "reviewUrl": "/es/hydrossential-review.html",
      "price": "$69.00 / frasco",
      "guarantee": "Garantía de 60 días",
      "am": [
        "Limpiador hidratante suave (sin sulfatos agresivos)",
        "Hydrossential™ (2–3 gotas sobre piel ligeramente húmeda)",
        "Crema de barrera si la piel lo requiere",
        "Protector solar diario de amplio espectro SPF 30+"
      ],
      "pm": [
        "Limpieza nocturna suave",
        "Hydrossential™ (aplicar uniformemente en rostro y cuello)",
        "Crema nocturna con ceramidas para sellar la hidratación"
      ],
      "caution": "Contiene una mezcla botánica patentada con hamamelis japonés y extractos herbales; realice una prueba de parche si tiene piel sensible o muy seca."
    }
  },
  "de": {
    "wrinkles": {
      "key": "kollagen",
      "name": "Kollagen Intensiv™ Kollagen-Erneuerungscreme",
      "brand": "Skinception",
      "active": "Schweizer Syn-Coll® (Palmitoyl Tripeptide-5)",
      "badge": "OPTIMALE FORMEL: TÄGLICHE KOLLAGEN-ERNEUERUNG",
      "score": 94,
      "hook": "Laut Hersteller steigert die Formel mit Schweizer Syn-Coll®-Peptid die körpereigene Kollagensynthese in vitro um bis zu 354%, um tiefe Mimikfalten zu glätten.",
      "img": "/img/optimized/kollagen_boxbottle_lg.webp",
      "affiliateUrl": "https://www.kollagenintensiv.com/ct/282956",
      "reviewUrl": "/de/kollagen-intensiv-review.html",
      "price": "$59.95 / Tiegel",
      "guarantee": "90 Tage Geld-zurück-Garantie",
      "am": [
        "Sanfter, feuchtigkeitsspendender Reiniger (pH-hautneutral)",
        "Antioxidatives Serum (Vitamin C oder Niacinamid)",
        "Kollagen Intensiv™ (dünn auf Gesicht und Hals auftragen)",
        "Breitspektrum-Sonnenschutz SPF 30+ mineralisch"
      ],
      "pm": [
        "Gründliche Doppelreinigung zur Entfernung von Umweltrückständen",
        "Beruhigendes Barriere-Tonikum oder Essenz",
        "Kollagen Intensiv™ (abends großzügig auftragen)",
        "Optionales Gesichtsöl zum Versiegeln der Peptid-Matrix"
      ],
      "caution": "Chemisch verträglich mit Niacinamid und Hyaluronsäure. Bei gleichzeitiger Verwendung von AHA/BHA-Peelings Tage abwechseln oder 20 Minuten Abstand einhalten."
    },
    "expression": {
      "key": "synevra",
      "name": "Synevra UltraLift™ Mimikfalten-Protokoll",
      "brand": "Synevra Clinical",
      "active": "SYN-AKE® Dipeptid-Neuromuskulär-Komplex",
      "badge": "OPTIMALE FORMEL: DYNAMISCHE FALTENGLÄTTUNG",
      "score": 91,
      "hook": "Laut Hersteller reduziert der gezielte SYN-AKE® Dipeptid-Komplex Muskelmikrokontraktionen um bis zu 82%, um Stirnfurchen und Lachfalten nadel-frei zu mildern.",
      "img": "/img/optimized/synevra.webp",
      "affiliateUrl": "https://fa90bat349vj5m8h47ps5z4k7l.hop.clickbank.net",
      "reviewUrl": "/de/synevra-ultralift-review.html",
      "price": "$79.00 / Einheit",
      "guarantee": "60 Tage Geld-zurück-Garantie",
      "am": [
        "Sanfter Gesichtsreiniger",
        "Synevra UltraLift™ (gezielt auf Stirnfalten und Krähenfüße einklopfen)",
        "Leichte, nicht-komedogene Feuchtigkeitscreme",
        "Täglicher Breitspektrum-Sonnenschutz"
      ],
      "pm": [
        "Gründliche Abend-Reinigung",
        "Synevra UltraLift™ (auf dynamische Mimikzonen auftragen)",
        "Regenerierende Peptid- oder Ceramid-Nachtcreme"
      ],
      "caution": "Nicht mit starken direkten Oxidationsmitteln (wie hochkonzentriertem Benzoylperoxid) in derselben Schicht mischen. Sicher mit Niacinamid und milden Retinoiden."
    },
    "spots": {
      "key": "illuminatural",
      "name": "Illuminatural 6i™ Fortschrittlicher Aufheller",
      "brand": "Skinception",
      "active": "Alpha-Arbutin & 5% Niacinamid (Ohne Hydrochinon)",
      "badge": "OPTIMALE FORMEL: PFLANZLICHE AUFHELLUNG",
      "score": 90,
      "hook": "Laut Hersteller hemmen 4 pflanzliche Aufheller (Alpha-Arbutin, Niacinamid) die Tyrosinase-Melaninsynthese ohne aggressive chemische Bleichmittel.",
      "img": "/img/optimized/illuminatural6i_icon001_600x600.webp",
      "affiliateUrl": "https://www.illuminatural6i.com/ct/282956",
      "reviewUrl": "/de/illuminatural-6i-review.html",
      "price": "$59.95 / Flakon",
      "guarantee": "90 Tage Geld-zurück-Garantie",
      "am": [
        "Milder, ausgleichender Gesichtsreiniger",
        "Illuminatural 6i™ (auf Pigmentflecken und Melasma auftragen)",
        "Hydratisierende Antioxidans-Creme",
        "Unverzichtbarer Lichtschutzfaktor SPF 50 (stoppt UV-Melanogenese)"
      ],
      "pm": [
        "Klärende Abend-Reinigung",
        "Illuminatural 6i™ (flächig oder gezielt auf Flecken auftragen)",
        "Lipid-Aufbaucreme zur Barriere-Erholung"
      ],
      "caution": "Alpha-Arbutin ist stabil und sanft. Morgens und abends anwendbar. Morgens ideal mit Vitamin C kombinierbar für doppelte Tyrosinase-Hemmung."
    },
    "eyes": {
      "key": "eyelasticity",
      "name": "Eyelasticity™ Straffende Augen-Therapie",
      "brand": "Skinception",
      "active": "Eyeseryl® (Tetrapeptid-5) + Regu®-Age",
      "badge": "OPTIMALE FORMEL: PERIORBITALE AUGENPFLEGE",
      "score": 89,
      "hook": "Multipeptid-Augenformel: Laut Hersteller werden Flüssigkeitsstauungen, Tränensäcke und dunkle Augenringe innerhalb von 15 bis 28 Tagen spürbar gemildert.",
      "img": "/img/optimized/eyelasticity800.webp",
      "affiliateUrl": "https://www.naturalhealthsource.com/products/eyelasticity-age-defying-eye-therapy/?aid=282956",
      "reviewUrl": "/de/eyelasticity-review.html",
      "price": "$59.95 / Flakon",
      "guarantee": "67 Tage Geld-zurück-Garantie",
      "am": [
        "Gesicht mit lauwarmem Wasser oder mildem Reiniger erfrischen",
        "Eyelasticity™ (tropfengroße Menge sanft entlang der Augenhöhle einklopfen)",
        "Tagescreme & Sonnenschutz"
      ],
      "pm": [
        "Sanfte Augen-Make-up-Entfernung und Reinigung",
        "Eyelasticity™ (sanft um die Augenpartie auftupfen)",
        "Regenerierende Nachtpflege"
      ],
      "caution": "Speziell für die dünne Periorbitalregion formuliert. Nicht ins Auge reiben und nicht mit aggressiven chemischen Peelings im Augenbereich kombinieren."
    },
    "scars": {
      "key": "dermefface",
      "name": "Dermefface FX7® Narben-Reparatur-Therapie",
      "brand": "Skinception",
      "active": "10,0% Symglucan® + Pro-Coll-One+",
      "badge": "OPTIMALE FORMEL: DERMALES NARBEN-GEL",
      "score": 92,
      "hook": "Formuliert mit 10% Symglucan und Pro-Coll-One+; laut Hersteller bis zu +1.190% Zuwachs an Typ-I-Kollagen, um vernarbtes Gewebe zu glätten und anzugleichen.",
      "img": "/img/optimized/dermafacereal.webp",
      "affiliateUrl": "https://www.dermeffacefx7.com/ct/282956",
      "reviewUrl": "/de/dermefface-fx7-review.html",
      "price": "$59.95 / Tube",
      "guarantee": "90 Tage Geld-zurück-Garantie",
      "am": [
        "Narbengewebe gründlich und sanft reinigen",
        "Dermefface FX7® (sanft einmassieren bis vollständig eingezogen)",
        "Strenger Sonnenschutz (schützt heilendes Gewebe vor Hyperpigmentierung)"
      ],
      "pm": [
        "Abend-Reinigung",
        "Dermefface FX7® (2x täglich für optimale Zellerneuerung anwenden)",
        "Sanfte Barrierecreme bei Spannungsgefühl"
      ],
      "caution": "Erst auftragen, wenn Wunden vollständig verheilt und Fäden gezogen sind. Eine kontinuierliche Anwendung über 60–90 Tage ist für sichtbare Glättung essenziell."
    },
    "hydration": {
      "key": "hydrossential",
      "name": "Hydrossential™ Botanisches Feuchtigkeitsserum",
      "brand": "Hydrossential",
      "active": "Jojoba, Gotu Kola, Aloe Vera & Grüntee",
      "badge": "OPTIMALE FORMEL: BOTANISCHE FEUCHTIGKEIT",
      "score": 76,
      "hook": "Leichtes 30-ml-Pipettenserum mit Jojobaöl, Gotu Kola, Grüntee und Aloe Vera; exakte Prozentangaben werden in einer geschützten Mischung nicht veröffentlicht.",
      "img": "/img/optimized/hydrossential.webp",
      "affiliateUrl": "https://21ac6covthykdn0bzbwe5hhh1d.hop.clickbank.net",
      "reviewUrl": "/de/hydrossential-review.html",
      "price": "$69.00 / Flakon",
      "guarantee": "60 Tage Geld-zurück-Garantie",
      "am": [
        "Milder, feuchtigkeitsspendender Reiniger",
        "Hydrossential™ (2–3 Tropfen sanft auf leicht feuchte Haut drücken)",
        "Barrierecreme bei trockenem Hautgefühl",
        "Täglicher Breitspektrum-Sonnenschutz SPF 30+"
      ],
      "pm": [
        "Sanfte Abendreinigung",
        "Hydrossential™ (gleichmäßig auf Gesicht und Hals auftragen)",
        "Ceramid-Nachtcreme zum Versiegeln der Feuchtigkeit"
      ],
      "caution": "Enthält eine geschützte Mischung mit japanischer Zaubernuss und Kräuterextrakten; bei sensibler oder sehr trockener Haut vorab einen Patch-Test durchführen."
    }
  },
  "fr": {
    "wrinkles": {
      "key": "kollagen",
      "name": "Kollagen Intensiv™ Crème de Régénération du Collagène",
      "brand": "Skinception",
      "active": "Syn-Coll® Suisse (Palmitoyl Tripeptide-5)",
      "badge": "CHOIX OPTIMAL : RENOUVELLEMENT QUOTIDIEN DU COLLAGÈNE",
      "score": 94,
      "hook": "Le fabricant rapporte que sa formule au peptide suisse Syn-Coll® stimule la synthèse de collagène jusqu'à 354% in vitro pour lisser les rides profondes.",
      "img": "/img/optimized/kollagen_boxbottle_lg.webp",
      "affiliateUrl": "https://www.kollagenintensiv.com/ct/282956",
      "reviewUrl": "/fr/kollagen-intensiv-review.html",
      "price": "59,95 $ / pot",
      "guarantee": "Garantie de 90 jours",
      "am": [
        "Nettoyant doux hydratant (pH physiologique)",
        "Sérum antioxydant (Vitamine C ou Niacinamide)",
        "Kollagen Intensiv™ (appliquer en fine couche visage et cou)",
        "Protection solaire minérale SPF 30+ à large spectre"
      ],
      "pm": [
        "Double nettoyage pour éliminer les impuretés",
        "Lotion tonique ou essence réparatrice de barrière",
        "Kollagen Intensiv™ (application généreuse le soir)",
        "Huile visage nourrissante facultative pour sceller les peptides"
      ],
      "caution": "Compatible chimiquement avec la niacinamide et l'acide hyaluronique. En cas d'exfoliants AHA/BHA, alterner les soirs ou espacer de 20 minutes pour éviter l'hydrolyse acide."
    },
    "expression": {
      "key": "synevra",
      "name": "Synevra UltraLift™ Protocole Rides d'Expression",
      "brand": "Synevra Clinical",
      "active": "Complexe Neuromusculaire Dipeptide SYN-AKE®",
      "badge": "CHOIX OPTIMAL : RELÂCHEMENT DES RIDES DYNAMIQUES",
      "score": 91,
      "hook": "Le fabricant rapporte que son complexe de dipeptide SYN-AKE® diminue les micro-contractions musculaires jusqu'à 82% pour estomper les rides du front sans aiguilles.",
      "img": "/img/optimized/synevra.webp",
      "affiliateUrl": "https://fa90bat349vj5m8h47ps5z4k7l.hop.clickbank.net",
      "reviewUrl": "/fr/synevra-ultralift-review.html",
      "price": "79,00 $ / unité",
      "guarantee": "Garantie de 60 jours",
      "am": [
        "Nettoyant visage doux",
        "Synevra UltraLift™ (tapoter sur le front et les pattes d'oie)",
        "Crème hydratante fluide non comédogène",
        "Protection solaire quotidienne"
      ],
      "pm": [
        "Nettoyage soigneux du soir",
        "Synevra UltraLift™ (appliquer sur les zones d'expression)",
        "Crème de nuit régénérante aux peptides ou céramides"
      ],
      "caution": "Éviter d'associer avec des oxydants directs puissants (comme le Peroxyde de Benzoyle concentré) dans la même couche. Compatible avec niacinamide et rétinoïdes doux."
    },
    "spots": {
      "key": "illuminatural",
      "name": "Illuminatural 6i™ Éclaircissant Cutané Avancé",
      "brand": "Skinception",
      "active": "Alpha-Arbutine & 5% Niacinamide (Sans Hydroquinone)",
      "badge": "CHOIX OPTIMAL : ÉCLAT BOTANIQUE",
      "score": 90,
      "hook": "Le fabricant rapporte que ses 4 actifs botaniques (Alpha-Arbutine, Niacinamide) neutralisent la tyrosinase sans substances décapantes nocives.",
      "img": "/img/optimized/illuminatural6i_icon001_600x600.webp",
      "affiliateUrl": "https://www.illuminatural6i.com/ct/282956",
      "reviewUrl": "/fr/illuminatural-6i-review.html",
      "price": "59,95 $ / flacon",
      "guarantee": "Garantie de 90 jours",
      "am": [
        "Nettoyant équilibrant doux",
        "Illuminatural 6i™ (appliquer sur les taches solaires et le mélasma)",
        "Hydratant antioxydant",
        "Protection solaire SPF 50 indispensable (bloque la mélanogenèse induite par les UV)"
      ],
      "pm": [
        "Nettoyage purifiant du soir",
        "Illuminatural 6i™ (application complète ou localisée)",
        "Crème barrière réparatrice lipidique"
      ],
      "caution": "L'alpha-arbutine est stable et douce. Utilisable matin et soir. Associer avec de la Vitamine C le matin pour renforcer la protection anti-tyrosinase."
    },
    "eyes": {
      "key": "eyelasticity",
      "name": "Eyelasticity™ Soin Jeunesse Contour des Yeux",
      "brand": "Skinception",
      "active": "Eyeseryl® (Tétrapeptide-5) + Regu®-Age",
      "badge": "CHOIX OPTIMAL : SOIN PÉRI-ORBITAIRE",
      "score": 89,
      "hook": "Soin multi-peptides pour les yeux : le fabricant rapporte une réduction visible des poches d'eau, des cernes foncés et des pattes d'oie en 15 à 28 jours.",
      "img": "/img/optimized/eyelasticity800.webp",
      "affiliateUrl": "https://www.naturalhealthsource.com/products/eyelasticity-age-defying-eye-therapy/?aid=282956",
      "reviewUrl": "/fr/eyelasticity-review.html",
      "price": "59,95 $ / flacon",
      "guarantee": "Garantie de 67 jours",
      "am": [
        "Rafraîchir le visage à l'eau fraîche ou avec un nettoyant doux",
        "Eyelasticity™ (tapoter délicatement une goutte le long de l'os orbitaire)",
        "Hydratant quotidien & SPF visage"
      ],
      "pm": [
        "Démaquillage et nettoyage doux des yeux",
        "Eyelasticity™ (tapoter autour de l'orbite oculaire)",
        "Soin nourrissant de nuit"
      ],
      "caution": "Spécifiquement conçu pour la zone péri-orbitaire fragile. Ne pas frotter vigoureusement ni associer avec des acides exfoliants puissants sur la paupière."
    },
    "scars": {
      "key": "dermefface",
      "name": "Dermefface FX7® Thérapie Réparatrice de Cicatrices",
      "brand": "Skinception",
      "active": "10,0% Symglucan® + Pro-Coll-One+",
      "badge": "CHOIX OPTIMAL : GEL DE REMODELAGE CUTANÉ",
      "score": 92,
      "hook": "Formulé avec 10% de Symglucan et Pro-Coll-One+ ; le fabricant rapporte jusqu'à +1 190% de synthèse de collagène Type I pour lisser et estomper les cicatrices.",
      "img": "/img/optimized/dermafacereal.webp",
      "affiliateUrl": "https://www.dermeffacefx7.com/ct/282956",
      "reviewUrl": "/fr/dermefface-fx7-review.html",
      "price": "59,95 $ / tube",
      "guarantee": "Garantie de 90 jours",
      "am": [
        "Nettoyer soigneusement la zone cicatricielle",
        "Dermefface FX7® (masser délicatement jusqu'à pénétration complète)",
        "Protection solaire haute (primordiale pour éviter l'hyperpigmentation de la cicatrice)"
      ],
      "pm": [
        "Nettoyage doux du soir",
        "Dermefface FX7® (appliquer deux fois par jour pour un renouvellement optimal)",
        "Crème barrière apaisante en cas de tiraillement"
      ],
      "caution": "Attendre la fermeture intégrale de la plaie ou le retrait des points avant d'entamer l'application. Une régularité quotidienne sur 60 à 90 jours est indispensable."
    },
    "hydration": {
      "key": "hydrossential",
      "name": "Hydrossential™ Sérum d'Hydratation Botanique",
      "brand": "Hydrossential",
      "active": "Jojoba, Gotu Kola, Aloe Vera & Thé Vert",
      "badge": "CHOIX OPTIMAL : HYDRATATION BOTANIQUE",
      "score": 76,
      "hook": "Sérum pipette léger de 30 ml associant huile de jojoba, gotu kola, thé vert et aloe vera ; les pourcentages exacts restent non divulgués dans un mélange exclusif.",
      "img": "/img/optimized/hydrossential.webp",
      "affiliateUrl": "https://21ac6covthykdn0bzbwe5hhh1d.hop.clickbank.net",
      "reviewUrl": "/fr/hydrossential-review.html",
      "price": "69,00 $ / flacon",
      "guarantee": "Garantie de 60 jours",
      "am": [
        "Nettoyant doux hydratant",
        "Hydrossential™ (2 à 3 gouttes sur peau légèrement humide)",
        "Crème barrière si la peau tiraille",
        "Protection solaire quotidienne SPF 30+"
      ],
      "pm": [
        "Nettoyage doux du soir",
        "Hydrossential™ (appliquer uniformément sur visage et cou)",
        "Crème de nuit aux céramides pour sceller l'hydratation"
      ],
      "caution": "Contient un mélange exclusif avec hamamélis du Japon et extraits végétaux ; réalisez un test cutané préalable sur peau réactive ou très sèche."
    }
  }
};

  var UI_STRINGS = {
    en: {
      viewOffer: "View Verified Offer",
      readReview: "Read Full Clinical Audit",
      scheduleHeading: "Your Evidence-Based Routine Schedule",
      scheduleSub: "Calibrated for your skin barrier profile.",
      morning: "Morning (AM) Schedule",
      evening: "Evening (PM) Schedule",
      cautionHeading: "Interaction & Collision Guidance:",
      resetBtn: "Retake Routine Assessment",
      backBtn: "Previous Step",
      step: "Step",
      colon: ": ",
      profileSummary: "Profile: {sens} · {fmt} · {exp}",
      sensLabels: { resilient: "Normal / Resilient", sensitive: "Sensitive / Reactive", dry: "Dry / Depleted", oily: "Combination / Oil-Prone" },
      fmtLabels: { cream: "Cream preference", serum: "Serum preference", specialized: "Targeted gel preference" },
      expLabels: { minimalist: "Minimalist (1–2 steps)", intermediate: "Balanced (3–4 steps)", advanced: "Advanced (5+ steps)" },
      sensNotes: {
        resilient: "Resilient barrier: standard twice-daily active cadence is well tolerated.",
        sensitive: "Sensitive barrier: start every other evening for 14 days and buffer over moisturizer after a 24-hour patch test.",
        dry: "Dry barrier: apply on slightly damp skin and seal with a ceramide-rich occlusive cream.",
        oily: "Oil-prone skin: keep base layers lightweight and non-comedogenic; avoid heavy facial oils."
      },
      fmtNotes: {
        cream: "Texture fit: layer lightweight water serums before richer cream steps.",
        serum: "Texture fit: apply serum-weight formulas first on clean skin before moisturizer.",
        specialized: "Texture fit: pat targeted treatments along localized zones without rubbing."
      },
      advStepAM: "Optional antioxidant or niacinamide booster (wait 10–15 min between low-pH layers)",
      advStepPM: "Verify multi-active pairing order in the Conflict Matrix before layering acids or retinoids"
    },
    es: {
      viewOffer: "Ver Oferta Verificada",
      readReview: "Leer Análisis Clínico Completo",
      scheduleHeading: "Tu Calendario de Rutina Basado en Evidencia",
      scheduleSub: "Calibrado para el perfil de barrera cutánea de tu piel.",
      morning: "Protocolo Matutino (Rutina AM)",
      evening: "Protocolo Nocturno (Rutina PM)",
      cautionHeading: "Guía de Interacciones y Prevención de Colisiones:",
      resetBtn: "Repetir Evaluación de Rutina",
      backBtn: "Paso anterior",
      step: "Paso",
      colon: ": ",
      profileSummary: "Perfil: {sens} · {fmt} · {exp}",
      sensLabels: { resilient: "Normal / Resistente", sensitive: "Sensible / Reactiva", dry: "Seca / Deshidratada", oily: "Mixta / Grasa" },
      fmtLabels: { cream: "Preferencia crema", serum: "Preferencia sérum", specialized: "Preferencia gel localizado" },
      expLabels: { minimalist: "Minimalista (1–2 pasos)", intermediate: "Equilibrada (3–4 pasos)", advanced: "Avanzada (5+ pasos)" },
      sensNotes: {
        resilient: "Barrera resistente: la frecuencia estándar de dos veces al día suele tolerarse bien.",
        sensitive: "Piel sensible: comience en noches alternas durante 14 días y amortigüe con hidratante tras prueba de parche de 24 h.",
        dry: "Piel seca: aplique sobre piel ligeramente húmeda y selle con crema rica en ceramidas.",
        oily: "Piel grasa: priorice capas ligeras no comedogénicas y evite aceites pesados."
      },
      fmtNotes: {
        cream: "Ajuste de textura: aplique sérums acuosos antes de cremas más densas.",
        serum: "Ajuste de textura: aplique fórmulas en sérum sobre piel limpia antes de la hidratante.",
        specialized: "Ajuste de textura: aplique con toques suaves en zonas localizadas sin frotar."
      },
      advStepAM: "Refuerzo antioxidante o niacinamida opcional (espere 10–15 min entre capas ácidas)",
      advStepPM: "Verifique el orden de activos en la Matriz de Conflictos antes de combinar ácidos o retinoides"
    },
    de: {
      viewOffer: "Offizielles Angebot ansehen",
      readReview: "Vollständigen Testbericht lesen",
      scheduleHeading: "Ihr evidenzbasierter Pflegeplan",
      scheduleSub: "Abgestimmt auf Ihr Hautbarriere-Profil.",
      morning: "Morgen-Routine (AM)",
      evening: "Abend-Routine (PM)",
      cautionHeading: "Leitfaden zu Wirkstoffinteraktionen:",
      resetBtn: "Routine-Bewertung wiederholen",
      backBtn: "Vorheriger Schritt",
      step: "Schritt",
      colon: ": ",
      profileSummary: "Profil: {sens} · {fmt} · {exp}",
      sensLabels: { resilient: "Normal / Robust", sensitive: "Sensibel / Reaktiv", dry: "Trocken / Feuchtigkeitsarm", oily: "Mischhaut / Ölig" },
      fmtLabels: { cream: "Creme-Präferenz", serum: "Serum-Präferenz", specialized: "Präzisions-Gel" },
      expLabels: { minimalist: "Minimalistisch (1–2 Schritte)", intermediate: "Ausgewogen (3–4 Schritte)", advanced: "Fortgeschritten (5+ Schritte)" },
      sensNotes: {
        resilient: "Robuste Barriere: zweimal tägliche Anwendung wird meist gut vertragen.",
        sensitive: "Sensible Haut: in den ersten 14 Tagen nur jeden zweiten Abend anwenden und nach 24h-Patch-Test über Feuchtigkeitscreme puffern.",
        dry: "Trockene Haut: auf leicht feuchte Haut auftragen und mit Ceramid-Creme versiegeln.",
        oily: "Ölige Haut: leichte, nicht-komedogene Texturen wählen und schwere Gesichtsöle weglassen."
      },
      fmtNotes: {
        cream: "Textur-Hinweis: wässrige Seren stets vor reichhaltigeren Cremes auftragen.",
        serum: "Textur-Hinweis: leichte Seren direkt nach der Reinigung vor der Pflege anwenden.",
        specialized: "Textur-Hinweis: gezielte Pflege sanft auf lokale Zonen einklopfen."
      },
      advStepAM: "Optionales Antioxidans- oder Niacinamid-Serum (10–15 Min. Abstand bei niedrigem pH)",
      advStepPM: "Schichtungsreihenfolge vor Kombination mit Säuren oder Retinoiden in der Konflikt-Matrix prüfen"
    },
    fr: {
      viewOffer: "Voir l'Offre Vérifiée",
      readReview: "Lire l'Audit Clinique Complet",
      scheduleHeading: "Votre Protocole de Routine Fondé sur la Science",
      scheduleSub: "Adapté au profil de votre barrière cutanée.",
      morning: "Protocole Matin (Routine AM)",
      evening: "Protocole Soir (Routine PM)",
      cautionHeading: "Conseils sur les Interactions & Prévention des Conflits :",
      resetBtn: "Recommencer le Diagnostic",
      backBtn: "Étape précédente",
      step: "Étape",
      colon: " : ",
      profileSummary: "Profil : {sens} · {fmt} · {exp}",
      sensLabels: { resilient: "Normale / Résistante", sensitive: "Sensible / Réactive", dry: "Sèche / Déshydratée", oily: "Mixte / Grasse" },
      fmtLabels: { cream: "Préférence crème", serum: "Préférence sérum", specialized: "Gel ciblé" },
      expLabels: { minimalist: "Minimaliste (1–2 étapes)", intermediate: "Équilibrée (3–4 étapes)", advanced: "Avancée (5+ étapes)" },
      sensNotes: {
        resilient: "Barrière résistante : la fréquence standard matin et soir est généralement bien tolérée.",
        sensitive: "Peau sensible : débutez un soir sur deux pendant 14 jours et tamponnez sur une crème après un test cutané de 24 h.",
        dry: "Peau sèche : appliquez sur peau légèrement humide puis scellez avec une crème aux céramides.",
        oily: "Peau grasse : privilégiez des textures légères non comédogènes et évitez les huiles riches."
      },
      fmtNotes: {
        cream: "Conseil texture : appliquez les sérums aqueux avant les crèmes plus riches.",
        serum: "Conseil texture : appliquez le sérum sur peau propre avant votre soin hydratant.",
        specialized: "Conseil texture : tapotez délicatement sur les zones ciblées sans frotter."
      },
      advStepAM: "Sérum antioxydant ou niacinamide en option (patienter 10 à 15 min entre couches acides)",
      advStepPM: "Vérifiez l'ordre des actifs dans la Matrice de Conflits avant d'associer acides ou rétinoïdes"
    }
  };

  var DEFAULT_STATE = {
    step: 1,
    concern: "wrinkles",
    sensitivity: "resilient",
    format: "cream",
    experience: "intermediate"
  };

  var state = Object.assign({}, DEFAULT_STATE);

  function buildCalibratedSteps(match, ui) {
    var am = match.am.slice();
    var pm = match.pm.slice();

    if (state.sensitivity === "oily") {
      pm = pm.filter(function (s) { return !/facial oil|aceite facial|Gesichtsöl|Huile visage/i.test(s); });
    }
    if (state.experience === "minimalist") {
      am = [am[0], am[am.length - 1]];
      if (match.am.length >= 3 && am.indexOf(match.am[match.am.length - 2]) === -1) {
        am = [am[0], match.am[match.am.length - 2], am[am.length - 1]];
      }
      pm = [pm[0], pm[1] || pm[pm.length - 1]];
    } else if (state.experience === "advanced") {
      if (am.length < 4) am.splice(1, 0, ui.advStepAM);
      pm.push(ui.advStepPM);
    }
    return { am: am, pm: pm };
  }

  function updateStepUI(moveFocus) {
    var totalSteps = 4;
    var clamped = Math.min(state.step, totalSteps);
    var pct = Math.min(100, Math.round((clamped / totalSteps) * 100));
    var prog = document.querySelector(".quiz-progress");
    var bar = document.getElementById("quiz-progress-bar");
    if (bar) {
      bar.style.width = pct + "%";
    }
    if (prog) {
      prog.setAttribute("aria-valuenow", String(pct));
    }

    document.querySelectorAll(".quiz-step").forEach(function (el) {
      var stepNum = parseInt(el.dataset.step, 10);
      el.classList.toggle("active", stepNum === state.step);
    });

    var res = document.getElementById("quiz-result");
    if (res) {
      if (state.step > totalSteps) {
        res.style.display = "block";
        renderResultView();
        res.scrollIntoView({ behavior: "smooth", block: "nearest" });
        if (moveFocus) {
          var rh = res.querySelector("h3");
          if (rh) {
            rh.setAttribute("tabindex", "-1");
            rh.focus();
          }
        }
      } else {
        res.style.display = "none";
        if (moveFocus) {
          var activeStep = document.querySelector(".quiz-step.active .quiz-step-title");
          if (activeStep) {
            activeStep.setAttribute("tabindex", "-1");
            activeStep.focus();
          }
        }
      }
    }
  }

  function renderResultView() {
    var res = document.getElementById("quiz-result");
    if (!res) return;

    var curLang = getLang();
    var catalog = CATALOG_BY_LANG[curLang] || CATALOG_BY_LANG.en;
    var ui = UI_STRINGS[curLang] || UI_STRINGS.en;
    var match = catalog[state.concern] || catalog.wrinkles;
    var calibrated = buildCalibratedSteps(match, ui);

    var profileText = ui.profileSummary
      .replace("{sens}", ui.sensLabels[state.sensitivity] || state.sensitivity)
      .replace("{fmt}", ui.fmtLabels[state.format] || state.format)
      .replace("{exp}", ui.expLabels[state.experience] || state.experience);

    var sensNote = ui.sensNotes[state.sensitivity] || "";
    var fmtNote = ui.fmtNotes[state.format] || "";

    var html = '<div class="badge s quiz-badge-ok">' + match.badge + '</div>' +
      '<div class="quiz-res-head">' +
      '<div>' +
      '<h3 class="quiz-res-title">' + match.name + '</h3>' +
      '<span class="quiz-res-active">' + match.active + '</span>' +
      '</div>' +
      '<div class="quiz-res-score">' + match.score + '<small>/100</small></div>' +
      '</div>' +
      '<p class="quiz-profile-line">' + profileText + '</p>' +
      '<p class="quiz-res-hook">' + match.hook + '</p>' +
      '<div class="quiz-res-ctas">' +
      '<a class="btn btn-primary affiliate-link" href="' + match.affiliateUrl + '" rel="noopener nofollow sponsored" target="_blank" data-product="' + match.key + '" data-placement="planner-result">' +
      ui.viewOffer + ' <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>' +
      '<a class="btn btn-ghost" href="' + match.reviewUrl + '">' + ui.readReview + '</a>' +
      '<span class="quiz-res-price">' + match.price + ' · ' + match.guarantee + '</span>' +
      '</div>' +
      '<hr class="quiz-sep">' +
      '<h4 class="quiz-sched-title">' + ui.scheduleHeading + '</h4>' +
      '<p class="quiz-sched-sub">' + ui.scheduleSub + '</p>' +
      '<div class="routine-grid">' +
      '<div class="routine-box">' +
      '<h5><i class="fa-solid fa-sun icon-warn" aria-hidden="true"></i> ' + ui.morning + '</h5>' +
      '<ul class="routine-steps">' +
      calibrated.am.map(function (s, i) { return '<li><strong>' + ui.step + ' ' + (i + 1) + ui.colon + '</strong> ' + s + '</li>'; }).join("") +
      '</ul>' +
      '</div>' +
      '<div class="routine-box">' +
      '<h5><i class="fa-solid fa-clock icon-sci" aria-hidden="true"></i> ' + ui.evening + '</h5>' +
      '<ul class="routine-steps">' +
      calibrated.pm.map(function (s, i) { return '<li><strong>' + ui.step + ' ' + (i + 1) + ui.colon + '</strong> ' + s + '</li>'; }).join("") +
      '</ul>' +
      '</div>' +
      '</div>' +
      '<div class="quiz-caution">' +
      '<strong class="quiz-caution-head"><i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i> ' + ui.cautionHeading + '</strong>' +
      '<p>' + match.caution + '</p>' +
      '<p class="quiz-caution-note">' + sensNote + ' ' + fmtNote + '</p>' +
      '</div>' +
      '<div class="quiz-reset-wrap">' +
      '<button type="button" class="btn btn-ghost" id="quiz-back-result-btn"><i class="fa-solid fa-arrow-left" aria-hidden="true"></i> ' + ui.backBtn + '</button>' +
      '<button type="button" class="btn btn-ghost" id="quiz-reset-btn"><i class="fa-solid fa-rotate-left" aria-hidden="true"></i> ' + ui.resetBtn + '</button>' +
      '</div>';

    res.innerHTML = html;

    var backResultBtn = document.getElementById("quiz-back-result-btn");
    if (backResultBtn) {
      backResultBtn.addEventListener("click", function () {
        state.step = 4;
        updateStepUI(true);
      });
    }

    var resetBtn = document.getElementById("quiz-reset-btn");
    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        state = Object.assign({}, DEFAULT_STATE);
        updateStepUI(true);
      });
    }
  }

  function initQuizEvents() {
    var curLang = getLang();
    var ui = UI_STRINGS[curLang] || UI_STRINGS.en;

    document.querySelectorAll(".quiz-step").forEach(function (stepEl) {
      var stepNum = parseInt(stepEl.dataset.step, 10);
      if (stepNum > 1 && !stepEl.querySelector(".quiz-back-btn")) {
        var nav = document.createElement("div");
        nav.className = "quiz-nav";
        var backBtn = document.createElement("button");
        backBtn.type = "button";
        backBtn.className = "btn btn-ghost quiz-back-btn";
        backBtn.innerHTML = '<i class="fa-solid fa-arrow-left" aria-hidden="true"></i> ' + ui.backBtn;
        backBtn.addEventListener("click", function () {
          state.step = Math.max(1, stepNum - 1);
          updateStepUI(true);
        });
        nav.appendChild(backBtn);
        stepEl.appendChild(nav);
      }

      stepEl.addEventListener("click", function (e) {
        var opt = e.target.closest(".quiz-option");
        if (!opt) return;

        var val = opt.dataset.val;
        if (stepNum === 1) state.concern = val;
        if (stepNum === 2) state.sensitivity = val;
        if (stepNum === 3) state.format = val;
        if (stepNum === 4) state.experience = val;

        state.step = stepNum + 1;
        updateStepUI(true);
      });
    });
  }

  /* Spotlight, tilt, telemetry clock and language switcher live in app.js (single owner). */
  function init() {
    initQuizEvents();
    if (window.DermAudit && typeof window.DermAudit.initLangSwitcher === "function") {
      window.DermAudit.initLangSwitcher();
    }
    updateStepUI(false);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
