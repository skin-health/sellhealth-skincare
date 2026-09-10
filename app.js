/* ==========================================================================
   DERM AUDIT JOURNAL - INTERACTIVE LOGIC & AFFILIATE MANAGEMENT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initAffiliateLinks();
  initFAQ();
  initNavigation();
  initScrollReveal();
  initHeroSelector();
});

/* ==========================================================================
   1. AFFILIATE LINK MANAGEMENT & STORAGE
   ========================================================================== */

// Default Affiliate Links (SellHealth & ClickBank) - Immutable
const DEFAULT_LINKS = Object.freeze({
  kollagen: 'https://www.kollagenintensiv.com/ct/282956',
  illuminatural: 'https://www.illuminatural6i.com/ct/282956',
  dermefface: 'https://www.dermeffacefx7.com/ct/282956',
  synevra: 'https://fa90bat349vj5m8h47ps5z4k7l.hop.clickbank.net',
  eyelasticity: 'https://www.naturalhealthsource.com/products/eyelasticity-age-defying-eye-therapy/?aid=282956'
});

function sanitizeAndValidateAffiliateLink(rawUrl, productKey) {
  if (!rawUrl) return DEFAULT_LINKS[productKey];
  
  const cleanVal = rawUrl.trim();
  
  // If it is just a numeric string, build the proper SellHealth URL
  if (/^\d+$/.test(cleanVal)) {
    if (productKey === 'kollagen') {
      return `https://www.kollagenintensiv.com/ct/${cleanVal}`;
    } else if (productKey === 'illuminatural') {
      return `https://www.illuminatural6i.com/ct/${cleanVal}`;
    } else if (productKey === 'dermefface') {
      return `https://www.dermeffacefx7.com/ct/${cleanVal}`;
    } else if (productKey === 'eyelasticity') {
      return `https://www.naturalhealthsource.com/products/eyelasticity-age-defying-eye-therapy/?aid=${cleanVal}`;
    }
  }
  
  // If it is a full URL, validate it
  try {
    const parsed = new URL(cleanVal);
    // Enforce HTTPS protocol
    if (parsed.protocol !== 'https:') {
      return DEFAULT_LINKS[productKey];
    }

    // ClickBank link validation with strict domain boundary check
    if (productKey === 'synevra') {
      const isClickBankHost = /^(?:[a-z0-9_-]+\.)?hop\.clickbank\.net$/i.test(parsed.hostname) ||
                              parsed.hostname === 'clickbank.net' ||
                              parsed.hostname === 'www.clickbank.net';
      if (isClickBankHost) {
        return cleanVal;
      }
      return DEFAULT_LINKS[productKey];
    }

    // NaturalHealthSource validation with strict host, path and numeric affiliate ID
    if (productKey === 'eyelasticity') {
      const isNhsHost = parsed.hostname === 'www.naturalhealthsource.com' || parsed.hostname === 'naturalhealthsource.com';
      const isValidPath = parsed.pathname.startsWith('/products/eyelasticity-age-defying-eye-therapy');
      const aidVal = parsed.searchParams.get('aid');
      const isValidAid = aidVal !== null && /^\d+$/.test(aidVal);

      if (isNhsHost && isValidPath && isValidAid) {
        return `https://www.naturalhealthsource.com/products/eyelasticity-age-defying-eye-therapy/?aid=${aidVal}`;
      }
      return DEFAULT_LINKS[productKey];
    }

    // SellHealth domain matching
    let expectedHost, expectedHostAlt;
    if (productKey === 'kollagen') {
      expectedHost = 'www.kollagenintensiv.com';
      expectedHostAlt = 'kollagenintensiv.com';
    } else if (productKey === 'illuminatural') {
      expectedHost = 'www.illuminatural6i.com';
      expectedHostAlt = 'illuminatural6i.com';
    } else if (productKey === 'dermefface') {
      expectedHost = 'www.dermeffacefx7.com';
      expectedHostAlt = 'dermeffacefx7.com';
    } else {
      return DEFAULT_LINKS[productKey];
    }

    if (parsed.hostname !== expectedHost && parsed.hostname !== expectedHostAlt) {
      return DEFAULT_LINKS[productKey];
    }

    // Enforce pathname structure /ct/numericId with trailing slash tolerance and search query preservation
    const cleanPath = parsed.pathname.replace(/\/+$/, '');
    const pathParts = cleanPath.split('/');
    if (pathParts.length === 3 && pathParts[1] === 'ct' && /^\d+$/.test(pathParts[2])) {
      const searchString = parsed.search || '';
      return `https://www.${expectedHostAlt}/ct/${pathParts[2]}${searchString}`;
    }
  } catch (e) {
    // Return default URL if parsing fails
  }
  
  return DEFAULT_LINKS[productKey];
}

function getAffiliateLinks() {
  let savedKollagen = null;
  let savedIlluminatural = null;
  let savedDermefface = null;
  let savedSynevra = null;
  let savedEyelasticity = null;
  
  try {
    savedKollagen = localStorage.getItem('sellhealth_kollagen_link');
    savedIlluminatural = localStorage.getItem('sellhealth_illuminatural_link');
    savedDermefface = localStorage.getItem('sellhealth_dermefface_link');
    savedSynevra = localStorage.getItem('affiliate_synevra_link');
    savedEyelasticity = localStorage.getItem('sellhealth_eyelasticity_link');
  } catch (e) {
    /* Silent fallback — default affiliate links are used automatically. */
  }

  return {
    kollagen: sanitizeAndValidateAffiliateLink(savedKollagen, 'kollagen'),
    illuminatural: sanitizeAndValidateAffiliateLink(savedIlluminatural, 'illuminatural'),
    dermefface: sanitizeAndValidateAffiliateLink(savedDermefface, 'dermefface'),
    synevra: sanitizeAndValidateAffiliateLink(savedSynevra, 'synevra'),
    eyelasticity: sanitizeAndValidateAffiliateLink(savedEyelasticity, 'eyelasticity')
  };
}

function applyAffiliateLinks() {
  const links = getAffiliateLinks();
  const affiliateElements = document.querySelectorAll('.affiliate-link');

  affiliateElements.forEach(el => {
    const productKey = el.getAttribute('data-product');
    if (productKey && links[productKey]) {
      el.setAttribute('href', links[productKey]);
    }
  });
}

function initAffiliateLinks() {
  applyAffiliateLinks();
}

/* ==========================================================================
   2. INTERACTIVE SKIN QUIZ LOGIC (GLOBAL SCOPE)
   ========================================================================== */

let quizAnswers = {
  concern: '',
  skinType: '',
  age: ''
};

window.selectQuizOption = function(step, value) {
  if (step === 1) quizAnswers.concern = value;
  if (step === 2) quizAnswers.skinType = value;
  if (step === 3) quizAnswers.age = value;

  const currentStepEl = document.querySelector(`.quiz-step[data-step="${step}"]`);
  const nextStepEl = document.querySelector(`.quiz-step[data-step="${step + 1}"]`);

  if (currentStepEl) currentStepEl.classList.remove('active');

  if (nextStepEl) {
    nextStepEl.classList.add('active');
  } else {
    showQuizResults();
  }
};

const I18N_QUIZ = {
  en: {
    readReview: 'Read In-Depth Review',
    age60: 'For deep-set concerns in the 60+ age range, clinical-strength formulas deliver the most noticeable structural repair.',
    age40: 'At ages 40–59, active remodeling and targeted signaling produce fast, visible improvements.',
    age20: 'Starting in your 20s–30s, early clinical intervention stops damage in its tracks and preserves youthful resilience.',
    routineSerum: 'Your preference for a concentrated targeted serum provides fast-absorbing active zone delivery.',
    routineSpecialized: 'Your preference for a precision applicator ensures high-potency delivery exactly where you need it.',
    routineCream: 'Your preference for a daily barrier cream provides continuous 24-hour hydration and nourishing protection.',
    catalog: {
      kollagen: {
        title: 'Match: Kollagen Intensiv™ Collagen Renewal Cream',
        shortName: 'Kollagen Intensiv™',
        badge: 'TOP PICK: DAILY COLLAGEN RENEWAL',
        img: 'Pictures/KollagenIntensiv.jpg',
        hook: 'Clinically proven Swiss Syn-Coll® formula boosts natural collagen synthesis by 354% to restore youthful dermal bounce and smooth deep wrinkles.',
        reviewUrl: 'kollagen-intensiv-review.html',
        linkKey: 'kollagen',
        btnText: 'Claim Official Discount'
      },
      synevra: {
        title: 'Match: Synevra UltraLift™ Expression Line Protocol',
        shortName: 'Synevra UltraLift™',
        badge: 'TOP PICK: DYNAMIC LINE RELAXATION',
        img: 'Pictures/synevra.jpg',
        hook: 'Targeted SYN-AKE® dipeptide relaxes dynamic muscle twitching by 82% to smooth forehead furrows and smile creases without needles.',
        reviewUrl: 'synevra-ultralift-review.html',
        linkKey: 'synevra',
        btnText: 'Claim Official Offer'
      },
      eyelasticity: {
        title: 'Match: Eyelasticity™ Age-Defying Eye Therapy',
        shortName: 'Eyelasticity™',
        badge: 'TOP PICK: PERIORBITAL EYE THERAPY',
        img: 'Pictures/eyelasticity.png',
        hook: 'Doctor-formulated multi-peptide therapy (Eyeseryl® + Regu®-Age) drains fluid bags, seals leaky micro-capillaries, and smooths crow\'s feet without milia risk.',
        reviewUrl: 'eyelasticity-review.html',
        linkKey: 'eyelasticity',
        btnText: 'Claim Official Offer'
      },
      illuminatural: {
        title: 'Match: Illuminatural 6i™ Advanced Skin Brightener',
        shortName: 'Illuminatural 6i™',
        badge: 'TOP PICK: BOTANICAL BRIGHTENING',
        img: 'Pictures/illuminatural.jpg',
        hook: '6 synergistic plant-based brighteners (Alpha-Arbutin, Whitonyl®, Niacinamide) interrupt melanin overproduction without dangerous bleaches.',
        reviewUrl: 'illuminatural-6i-review.html',
        linkKey: 'illuminatural',
        btnText: 'Claim Official Discount'
      },
      dermefface: {
        title: 'Match: Dermefface FX7® Scar Remodeling Therapy',
        shortName: 'Dermefface FX7®',
        badge: 'TOP PICK: SCAR REMODELING GEL',
        img: 'Pictures/dermefface.jpg',
        hook: 'Symglucan (10%) and Pro-Coll-One+ stimulate smooth Type I collagen synthesis by 1,190% to flatten surgical marks, cuts, and acne scars.',
        reviewUrl: 'dermefface-fx7-review.html',
        linkKey: 'dermefface',
        btnText: 'Claim Official Discount'
      },
    }
  },
  es: {
    readReview: 'Leer Análisis Clínico',
    age60: 'Para arrugas profundas a partir de los 60 años, las fórmulas clínicas restauran la estructura dérmica con máxima eficacia.',
    age40: 'Entre los 40 y 59 años, la renovación activa y péptidos específicos producen mejoras visibles rápidas.',
    age20: 'En los 20 y 30 años, la intervención clínica temprana previene el daño celular y mantiene la elasticidad.',
    routineSerum: 'Tu preferencia por un sérum concentrado ofrece absorción rápida y máxima potencia en zonas clave.',
    routineSpecialized: 'Tu preferencia por un aplicador de precisión garantiza alta concentración donde más lo necesitas.',
    routineCream: 'Tu preferencia por una crema de barrera diaria brinda hidratación continua por 24 horas.',
    catalog: {
      kollagen: {
        title: 'Coincidencia: Crema Antiarrugas Kollagen Intensiv™',
        shortName: 'Kollagen Intensiv™',
        badge: 'SELECCIÓN: RENOVACIÓN DE COLÁGENO',
        img: 'Pictures/KollagenIntensiv.jpg',
        hook: 'Fórmula suiza con Syn-Coll® clínicamente probada: estimula el colágeno en un +354% para alisar arrugas profundas.',
        reviewUrl: 'kollagen-intensiv-review.html',
        linkKey: 'kollagen',
        btnText: 'Obtener Descuento Oficial'
      },
      synevra: {
        title: 'Coincidencia: Protocolo Synevra UltraLift™',
        shortName: 'Synevra UltraLift™',
        badge: 'SELECCIÓN: LÍNEAS DE EXPRESIÓN',
        img: 'Pictures/synevra.jpg',
        hook: 'Dipéptido SYN-AKE® que relaja las microcontracciones faciales en un 82% para suavizar líneas de expresión sin agujas.',
        reviewUrl: 'synevra-ultralift-review.html',
        linkKey: 'synevra',
        btnText: 'Ver Oferta Oficial'
      },
      eyelasticity: {
        title: 'Coincidencia: Eyelasticity™ Terapia Ocular Antienvejecimiento',
        shortName: 'Eyelasticity™',
        badge: 'SELECCIÓN: TERAPIA PERIORBITAL',
        img: 'Pictures/eyelasticity.png',
        hook: 'Fórmula peptídica médica (Eyeseryl® + Regu®-Age) que drena líquidos retenidos, sella microcapilares y suaviza patas de gallo sin riesgo de milium.',
        reviewUrl: 'eyelasticity-review.html',
        linkKey: 'eyelasticity',
        btnText: 'Ver Oferta Oficial'
      },
      illuminatural: {
        title: 'Coincidencia: Aclarador Facial Illuminatural 6i™',
        shortName: 'Illuminatural 6i™',
        badge: 'SELECCIÓN: LUMINOSIDAD BOTÁNICA',
        img: 'Pictures/illuminatural.jpg',
        hook: '6 activos botánicos (Alfa-Arbutina, Niacinamida) que frenan la melanina sin hidroquinona ni químicos agresivos.',
        reviewUrl: 'illuminatural-6i-review.html',
        linkKey: 'illuminatural',
        btnText: 'Obtener Descuento Oficial'
      },
      dermefface: {
        title: 'Coincidencia: Terapia de Cicatrices Dermefface FX7®',
        shortName: 'Dermefface FX7®',
        badge: 'SELECCIÓN: REMODELACIÓN DE CICATRICES',
        img: 'Pictures/dermefface.jpg',
        hook: 'Symglucan y Pro-Coll-One+ que aumentan el colágeno Tipo I en un 1.190% para aplanar marcas quirúrgicas y de acné.',
        reviewUrl: 'dermefface-fx7-review.html',
        linkKey: 'dermefface',
        btnText: 'Obtener Descuento Oficial'
      },
    }
  },
  de: {
    readReview: 'Klinischen Testbericht Lesen',
    age60: 'Für ausgeprägte Falten ab 60 Jahren bieten klinisch dosierte Wirkstoffe die effektivste Tiefenregeneration.',
    age40: 'Im Alter von 40–59 Jahren sorgen aktive Signalpeptide für schnelle, sichtbare Hautglättung.',
    age20: 'In den 20er und 30er Jahren bewahrt eine frühzeitige klinische Pflege die jugendliche Spannkraft.',
    routineSerum: 'Ihre Vorliebe für ein hochkonzentriertes Serum ermöglicht schnelle Aufnahme und gezielte Wirkung.',
    routineSpecialized: 'Ihre Vorliebe für einen Präzisionsapplikator liefert maximale Wirkstoffkonzentration direkt an der Problemstelle.',
    routineCream: 'Ihre Vorliebe für eine tägliche Schutzcreme spendet kontinuierlich 24 Stunden Feuchtigkeit.',
    catalog: {
      kollagen: {
        title: 'Ergebnis: Kollagen Intensiv™ Kollagen-Erneuerungscreme',
        shortName: 'Kollagen Intensiv™',
        badge: 'TOP-EMPFEHLUNG: KOLLAGEN-ERNEUERUNG',
        img: 'Pictures/KollagenIntensiv.jpg',
        hook: 'Klinisch geprüfte Schweizer Syn-Coll® Formel steigert die Kollagenproduktion um 354% und mildert tiefe Falten.',
        reviewUrl: 'kollagen-intensiv-review.html',
        linkKey: 'kollagen',
        btnText: 'Offiziellen Rabatt Sichern'
      },
      synevra: {
        title: 'Ergebnis: Synevra UltraLift™ Mimikfalten-Serum',
        shortName: 'Synevra UltraLift™',
        badge: 'TOP-EMPFEHLUNG: MIMIKFALTEN-GLÄTTUNG',
        img: 'Pictures/synevra.jpg',
        hook: 'Gezieltes SYN-AKE® Dipeptid entspannt Mikromuskelspannungen um 82% für glattere Stirn- und Lachfalten ohne Nadeln.',
        reviewUrl: 'synevra-ultralift-review.html',
        linkKey: 'synevra',
        btnText: 'Offizielles Angebot Prüfen'
      },
      eyelasticity: {
        title: 'Ergebnis: Eyelasticity™ Klinische Augentherapie',
        shortName: 'Eyelasticity™',
        badge: 'TOP-EMPFEHLUNG: PERIORBITALE PFLEGE',
        img: 'Pictures/eyelasticity.png',
        hook: 'Ärztlich entwickeltes Peptidserum (Eyeseryl® + Regu®-Age) zur Drainage von Stauflüssigkeit, Stärkung der Kapillaren und Glättung von Krähenfüßen ohne Milien-Risiko.',
        reviewUrl: 'eyelasticity-review.html',
        linkKey: 'eyelasticity',
        btnText: 'Offizielles Angebot Prüfen'
      },
      illuminatural: {
        title: 'Ergebnis: Illuminatural 6i™ Pigmentflecken-Aufheller',
        shortName: 'Illuminatural 6i™',
        badge: 'TOP-EMPFEHLUNG: PFLANZLICHE AUFHELLUNG',
        img: 'Pictures/illuminatural.jpg',
        hook: '6 pflanzliche Aufheller (Alpha-Arbutin, Niacinamid) hemmen Melaninbildung ohne schädliche Bleichmittel.',
        reviewUrl: 'illuminatural-6i-review.html',
        linkKey: 'illuminatural',
        btnText: 'Offiziellen Rabatt Sichern'
      },
      dermefface: {
        title: 'Ergebnis: Dermefface FX7® Narbentherapie',
        shortName: 'Dermefface FX7®',
        badge: 'TOP-EMPFEHLUNG: NARBENREGENERATION',
        img: 'Pictures/dermefface.jpg',
        hook: 'Symglucan und Pro-Coll-One+ steigern Typ-I-Kollagen um 1.190% zur Glättung von OP-Narben und Aknenarben.',
        reviewUrl: 'dermefface-fx7-review.html',
        linkKey: 'dermefface',
        btnText: 'Offiziellen Rabatt Sichern'
      },
    }
  },
  fr: {
    readReview: 'Lire l\'Avis Clinique Complet',
    age60: 'Pour les rides profondes après 60 ans, les formules cliniques puissantes restaurent la fermeté structurelle.',
    age40: 'Entre 40 et 59 ans, le renouvellement actif et les peptides ciblés procurent un lissage visible rapide.',
    age20: 'Dès 20–30 ans, une routine clinique précoce bloque les dégradations cutanées et préserve l\'élasticité.',
    routineSerum: 'Votre choix d\'un sérum ciblé garantit une absorption ultra-rapide et une haute concentration.',
    routineSpecialized: 'Votre choix d\'un applicateur de précision cible exactement la zone à traiter.',
    routineCream: 'Votre choix d\'une crème de jour protectrice offre 24h d\'hydratation continue.',
    catalog: {
      kollagen: {
        title: 'Résultat: Crème Régénérante au Collagène Kollagen Intensiv™',
        shortName: 'Kollagen Intensiv™',
        badge: 'MEILLEUR CHOIX : RENOUVELLEMENT DU COLLAGÈNE',
        img: 'Pictures/KollagenIntensiv.jpg',
        hook: 'Formule suisse Syn-Coll® cliniquement prouvée: stimule la synthèse naturelle de collagène de +354%.',
        reviewUrl: 'kollagen-intensiv-review.html',
        linkKey: 'kollagen',
        btnText: 'Obtenir la Réduction Officielle'
      },
      synevra: {
        title: 'Résultat: Protocole Lissant Synevra UltraLift™',
        shortName: 'Synevra UltraLift™',
        badge: 'MEILLEUR CHOIX : LISSAGE RIDES D\'EXPRESSION',
        img: 'Pictures/synevra.jpg',
        hook: 'Dipeptide SYN-AKE® réduisant les micro-tensions faciales de 82% pour lisser le front et le sourire sans injections.',
        reviewUrl: 'synevra-ultralift-review.html',
        linkKey: 'synevra',
        btnText: 'Voir l\'Offre Officielle'
      },
      eyelasticity: {
        title: 'Résultat: Eyelasticity™ Thérapie Oculaire Anti-Âge',
        shortName: 'Eyelasticity™',
        badge: 'MEILLEUR CHOIX : THÉRAPIE DU REGARD',
        img: 'Pictures/eyelasticity.png',
        hook: 'Formule peptidique médicale (Eyeseryl® + Regu®-Age) pour drainer l\'eau accumulée, protéger les micro-capillaires et lisser les pattes d\'oie sans risque de grains de milium.',
        reviewUrl: 'eyelasticity-review.html',
        linkKey: 'eyelasticity',
        btnText: 'Voir l\'Offre Officielle'
      },
      illuminatural: {
        title: 'Résultat: Soin Éclaircissant Anti-Taches Illuminatural 6i™',
        shortName: 'Illuminatural 6i™',
        badge: 'MEILLEUR CHOIX : ÉCLAT BOTANIQUE',
        img: 'Pictures/illuminatural.jpg',
        hook: '6 actifs végétaux (Alpha-Arbutine, Niacinamide) freinant la mélanine sans hydroquinone ni décapants agressifs.',
        reviewUrl: 'illuminatural-6i-review.html',
        linkKey: 'illuminatural',
        btnText: 'Obtenir la Réduction Officielle'
      },
      dermefface: {
        title: 'Résultat: Thérapie Cicatrisante Dermefface FX7®',
        shortName: 'Dermefface FX7®',
        badge: 'MEILLEUR CHOIX : REMODELAGE CICATRICIEL',
        img: 'Pictures/dermefface.jpg',
        hook: 'Symglucan et Pro-Coll-One+ stimulant le collagène de type I de +1 190% pour aplanir marques et cicatrices.',
        reviewUrl: 'dermefface-fx7-review.html',
        linkKey: 'dermefface',
        btnText: 'Obtenir la Réduction Officielle'
      },
    }
  }
};

function showQuizResults() {
  const quizResult = document.getElementById('quizResult');
  const resultTitle = document.getElementById('resultTitle');
  const resultDesc = document.getElementById('resultDesc');
  const resultProductWrap = document.getElementById('resultProductWrap');

  if (!quizResult || !resultTitle || !resultDesc || !resultProductWrap) return;

  const links = getAffiliateLinks();
  let productKey = 'kollagen';

  // 1. Determine Product Match (5 Clinically Retained Formulations)
  if (quizAnswers.concern === 'eyebags') {
    productKey = 'eyelasticity';
  } else if (quizAnswers.concern === 'darkspots') {
    productKey = 'illuminatural';
  } else if (quizAnswers.concern === 'scars' || quizAnswers.concern === 'skintags' || quizAnswers.concern === 'nails') {
    productKey = 'dermefface';
  } else if (quizAnswers.concern === 'expression') {
    productKey = 'synevra';
  } else if (quizAnswers.concern === 'wrinkles') {
    if (quizAnswers.skinType === 'serum') {
      productKey = 'synevra';
    } else {
      productKey = 'kollagen';
    }
  } else {
    productKey = 'kollagen';
  }

  const lang = (document.documentElement.lang || 'en').toLowerCase().substring(0, 2);
  const i18n = I18N_QUIZ[lang] || I18N_QUIZ.en;
  const product = i18n.catalog[productKey] || i18n.catalog.kollagen;

  // 2. Build Contextual Explanation
  let ageContext = '';
  if (quizAnswers.age === '60+') {
    ageContext = i18n.age60;
  } else if (quizAnswers.age === '40-59') {
    ageContext = i18n.age40;
  } else {
    ageContext = i18n.age20;
  }

  let routineContext = '';
  if (quizAnswers.skinType === 'serum') {
    routineContext = i18n.routineSerum;
  } else if (quizAnswers.skinType === 'specialized') {
    routineContext = i18n.routineSpecialized;
  } else {
    routineContext = i18n.routineCream;
  }

  resultTitle.textContent = product.title;
  resultDesc.textContent = routineContext + ' ' + ageContext;

  // 3. Render Match Card Content Safely
  resultProductWrap.textContent = '';

  const cardWrap = document.createElement('div');
  cardWrap.style.display = 'flex';
  cardWrap.style.alignItems = 'center';
  cardWrap.style.gap = '2rem';
  cardWrap.style.justifyContent = 'center';
  cardWrap.style.flexWrap = 'wrap';
  cardWrap.style.textAlign = 'left';

  // Product Image
  const imgWrap = document.createElement('div');
  imgWrap.style.flexShrink = '0';
  imgWrap.style.textAlign = 'center';

  const img = document.createElement('img');

  // Dynamically resolve relative path for root (Pictures/) vs subdirectories like /es/, /de/, /fr/ (../Pictures/)
  // Supports http/https hosting, GitHub Pages, and local file:/// browsing
  const isSubdir = window.location.pathname.includes('/es/') || 
                   window.location.pathname.includes('/de/') || 
                   window.location.pathname.includes('/fr/') ||
                   window.location.pathname.includes('\\es\\') ||
                   window.location.pathname.includes('\\de\\') ||
                   window.location.pathname.includes('\\fr\\');
  const basePrefix = isSubdir ? '../' : '';
  const cleanImgPath = product.img.replace(/^(\.\.\/|\/)+/, '');

  img.src = basePrefix + cleanImgPath;
  img.alt = product.shortName;
  img.style.width = '130px';
  img.style.height = '130px';
  img.style.maxWidth = '100%';
  img.style.objectFit = 'contain';
  img.style.borderRadius = '8px';
  img.style.background = '#FFFFFF';
  img.style.padding = '0.5rem';
  img.style.border = '1px solid var(--color-border)';
  img.style.display = 'block';
  img.style.margin = '0 auto';

  // Fallback handler if path resolution encounters unexpected nesting
  img.onerror = function() {
    if (!this.dataset.fallbackTried) {
      this.dataset.fallbackTried = 'true';
      this.src = (isSubdir ? '' : '../') + cleanImgPath;
    }
  };

  imgWrap.appendChild(img);

  // Info Details
  const infoBlock = document.createElement('div');
  infoBlock.style.flex = '1';
  infoBlock.style.minWidth = '260px';
  infoBlock.style.maxWidth = '460px';

  const badgeEl = document.createElement('span');
  badgeEl.className = 'badge badge-gold';
  badgeEl.style.fontSize = '0.75rem';
  badgeEl.style.marginBottom = '0.5rem';
  badgeEl.style.display = 'inline-block';
  badgeEl.textContent = product.badge;

  const titleEl = document.createElement('h4');
  titleEl.style.margin = '0 0 0.5rem 0';
  titleEl.style.fontSize = '1.25rem';
  titleEl.style.color = 'var(--color-dark)';
  titleEl.textContent = product.shortName;

  const hookEl = document.createElement('p');
  hookEl.style.fontSize = '0.9rem';
  hookEl.style.color = 'var(--color-muted)';
  hookEl.style.lineHeight = '1.5';
  hookEl.style.margin = '0 0 1.25rem 0';
  hookEl.textContent = product.hook;

  // Action Button Group
  const btnGroup = document.createElement('div');
  btnGroup.style.display = 'flex';
  btnGroup.style.gap = '0.75rem';
  btnGroup.style.flexWrap = 'wrap';

  const orderBtn = document.createElement('a');
  orderBtn.className = 'btn btn-gold btn-sm affiliate-link';
  orderBtn.href = links[product.linkKey] || DEFAULT_LINKS[product.linkKey];
  orderBtn.setAttribute('data-product', product.linkKey);
  orderBtn.target = '_blank';
  orderBtn.rel = 'noopener nofollow sponsored';
  
  const cartIcon = document.createElement('i');
  cartIcon.className = 'fa-solid fa-cart-shopping';
  orderBtn.appendChild(cartIcon);
  orderBtn.appendChild(document.createTextNode(' ' + product.btnText));

  const reviewBtn = document.createElement('a');
  reviewBtn.className = 'btn btn-outline btn-sm';
  reviewBtn.href = product.reviewUrl;
  
  const bookIcon = document.createElement('i');
  bookIcon.className = 'fa-solid fa-book-open';
  reviewBtn.appendChild(bookIcon);
  reviewBtn.appendChild(document.createTextNode(' ' + i18n.readReview));

  btnGroup.appendChild(orderBtn);
  btnGroup.appendChild(reviewBtn);

  infoBlock.appendChild(badgeEl);
  infoBlock.appendChild(titleEl);
  infoBlock.appendChild(hookEl);
  infoBlock.appendChild(btnGroup);

  cardWrap.appendChild(imgWrap);
  cardWrap.appendChild(infoBlock);
  resultProductWrap.appendChild(cardWrap);

  quizResult.style.display = 'block';
  quizResult.setAttribute('tabindex', '-1');
  quizResult.focus({ preventScroll: true });
  quizResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

window.resetQuiz = function() {
  quizAnswers = { concern: '', skinType: '', age: '' };
  const steps = document.querySelectorAll('.quiz-step');
  steps.forEach(s => s.classList.remove('active'));

  const step1 = document.querySelector('.quiz-step[data-step="1"]');
  if (step1) step1.classList.add('active');

  const quizResult = document.getElementById('quizResult');
  if (quizResult) quizResult.style.display = 'none';
};

/* ==========================================================================
   3. FAQ ACCORDION
   ========================================================================== */
function initFAQ() {
  const faqContainers = document.querySelectorAll('.faq-accordion, .faq-container');
  if (!faqContainers.length) return;

  faqContainers.forEach(container => {
    container.addEventListener('click', (e) => {
      const question = e.target.closest('.faq-question');
      if (!question) return;

      const item = question.parentElement;
      const answer = item.querySelector('.faq-answer');
      const isActive = item.classList.contains('active');

      // Close all other active items in this container
      container.querySelectorAll('.faq-item').forEach(el => {
        el.classList.remove('active');
        const q = el.querySelector('.faq-question');
        if (q) q.setAttribute('aria-expanded', 'false');
        const ans = el.querySelector('.faq-answer');
        if (ans) ans.style.maxHeight = null;
      });

      if (!isActive && answer) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/* ==========================================================================
   4. IMAGE SWITCHER FOR PRODUCT GALLERY (GLOBAL SCOPE)
   ========================================================================== */
window.switchImage = function(mainImgId, newSrc, thumbEl, newAlt) {
  const mainImg = document.getElementById(mainImgId);
  if (mainImg) {
    mainImg.src = newSrc;
    if (newAlt) {
      mainImg.alt = newAlt;
    }
  }

  if (thumbEl && thumbEl.parentElement) {
    const thumbs = thumbEl.parentElement.querySelectorAll('.thumb');
    thumbs.forEach(t => t.classList.remove('active'));
    thumbEl.classList.add('active');
  }
};

/* ==========================================================================
   5. NAVIGATION CONTROLS
   ========================================================================== */
function initNavigation() {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    const updateIconState = (isOpen) => {
      const icon = menuToggle.querySelector('i');
      if (icon) {
        if (isOpen) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    };

    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = navMenu.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', isActive.toString());
      updateIconState(isActive);
    });

    // Close mobile menu on click outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        updateIconState(false);
      }
    });

    // Close mobile menu on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        updateIconState(false);
        menuToggle.focus();
      }
    });
  }

  // Touch and click dropdown navigation
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const parentDropdown = toggle.closest('.nav-item-dropdown');
      if (!parentDropdown) return;
      const isOpen = parentDropdown.classList.contains('dropdown-open');

      // Close other open dropdowns
      document.querySelectorAll('.nav-item-dropdown').forEach(d => {
        if (d !== parentDropdown) {
          d.classList.remove('dropdown-open');
          const t = d.querySelector('.dropdown-toggle');
          if (t) t.setAttribute('aria-expanded', 'false');
        }
      });

      if (isOpen) {
        parentDropdown.classList.remove('dropdown-open');
        toggle.setAttribute('aria-expanded', 'false');
      } else {
        parentDropdown.classList.add('dropdown-open');
        toggle.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Close dropdowns on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item-dropdown')) {
      document.querySelectorAll('.nav-item-dropdown').forEach(d => {
        d.classList.remove('dropdown-open');
        const t = d.querySelector('.dropdown-toggle');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // Close dropdowns on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.nav-item-dropdown').forEach(d => {
        d.classList.remove('dropdown-open');
        const t = d.querySelector('.dropdown-toggle');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
    }
  });
}

/* ==========================================================================
   6. SCROLL-TRIGGERED REVEAL ANIMATIONS
   ========================================================================== */
function initScrollReveal() {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length === 0) return;

  document.documentElement.classList.add('js-reveal-ready');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.05
  });

  revealElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   7. HERO CATEGORY DIAGNOSTIC SELECTOR
   ========================================================================== */
function initHeroSelector() {
  const tabs = document.querySelectorAll('.hero-tab-btn');
  const panels = document.querySelectorAll('.hero-tab-panel');

  if (!tabs.length || !panels.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('aria-controls');
      if (!targetId) return;

      // Update tab selection state
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      // Update visible panel
      panels.forEach(p => {
        if (p.id === targetId) {
          p.classList.add('active');
          p.removeAttribute('hidden');
        } else {
          p.classList.remove('active');
          p.setAttribute('hidden', '');
        }
      });
    });

    // Keyboard navigation with Arrow keys
    tab.addEventListener('keydown', (e) => {
      const tabArray = Array.from(tabs);
      const currentIndex = tabArray.indexOf(tab);

      let targetTab = null;
      if (e.key === 'ArrowRight') {
        targetTab = tabArray[(currentIndex + 1) % tabArray.length];
      } else if (e.key === 'ArrowLeft') {
        targetTab = tabArray[(currentIndex - 1 + tabArray.length) % tabArray.length];
      }

      if (targetTab) {
        e.preventDefault();
        targetTab.focus();
        targetTab.click();
      }
    });
  });
}


