/* ==========================================================================
   DERM AUDIT JOURNAL - SKIN QUIZ & HERO SELECTOR (home pages only)
   Loads after app.js. Shared helpers (affiliate links, sanitizer) stay in app.js.
   ========================================================================== */

let quizAnswers = {
  concern: '',
  skinType: '',
  age: ''
};

const I18N_QUIZ = {
  en: {
    readReview: 'Read Full Review',
    backBtn: 'Back',
    age60: 'For mature skin concerns in the 60+ range, intensive barrier nourishment and peptide signaling support structural resilience.',
    age40: 'At ages 40–59, targeted peptide complexes and active turnover support visible smoothing and tone balance.',
    age20: 'In your 20s–30s, early targeted care helps address initial fine lines, post-blemish marks, and barrier defense.',
    routineSerum: 'Your preference for a concentrated liquid serum prioritizes fast-absorbing delivery to target zones.',
    routineSpecialized: 'Your preference for a precision treatment format focuses active ingredients on delicate or localized areas.',
    routineCream: 'Your preference for a daily barrier cream provides continuous 24-hour moisture and lipid support.',
    disclosure: 'Affiliate link: We may earn a commission at no extra cost to you. 60–90 day money-back guarantee.',
    catalog: {
      kollagen: {
        title: 'Match: Kollagen Intensiv™ Collagen Renewal Cream',
        shortName: 'Kollagen Intensiv™',
        badge: 'TOP PICK: DAILY COLLAGEN RENEWAL',
        img: 'Pictures/kollagen_boxbottle_lg.jpg',
        hook: 'The manufacturer reports that its Swiss Syn-Coll® peptide formula boosts natural collagen synthesis by up to 354% in vitro and reduces wrinkle appearance by 84%.',
        reviewUrl: 'kollagen-intensiv-review.html',
        linkKey: 'kollagen',
        btnText: 'View Offer'
      },
      synevra: {
        title: 'Match: Synevra UltraLift™ Expression Line Protocol',
        shortName: 'Synevra UltraLift™',
        badge: 'TOP PICK: DYNAMIC LINE RELAXATION',
        img: 'Pictures/synevra.jpg',
        hook: 'The manufacturer reports that its targeted SYN-AKE® dipeptide complex reduces dynamic muscle micro-contractions by up to 82% to smooth forehead furrows and smile creases without needles.',
        reviewUrl: 'synevra-ultralift-review.html',
        linkKey: 'synevra',
        btnText: 'View Offer'
      },
      eyelasticity: {
        title: 'Match: Eyelasticity™ Age-Defying Eye Therapy',
        shortName: 'Eyelasticity™',
        badge: 'TOP PICK: PERIORBITAL EYE THERAPY',
        img: 'Pictures/eyelasticity800.jpg',
        hook: 'Multi-peptide eye formula (Eyeseryl® + Regu®-Age); the manufacturer reports reduced under-eye fluid puffiness, dark circle appearance, and crow\'s feet within 15 to 28 days.',
        reviewUrl: 'eyelasticity-review.html',
        linkKey: 'eyelasticity',
        btnText: 'View Offer'
      },
      illuminatural: {
        title: 'Match: Illuminatural 6i™ Advanced Skin Brightener',
        shortName: 'Illuminatural 6i™',
        badge: 'TOP PICK: BOTANICAL BRIGHTENING',
        img: 'Pictures/illuminatural6i_icon001_600x600.jpg',
        hook: 'The manufacturer reports that its 6 plant-based brighteners (Alpha-Arbutin, Whitonyl®, Niacinamide) block melanin synthesis without hydroquinone. Note: Restock in progress; link opens the official Skinception catalog.',
        reviewUrl: 'illuminatural-6i-review.html',
        linkKey: 'illuminatural',
        btnText: 'View Offer'
      },
      dermefface: {
        title: 'Match: Dermefface FX7® Scar Remodeling Therapy',
        shortName: 'Dermefface FX7®',
        badge: 'TOP PICK: SCAR REMODELING GEL',
        img: 'Pictures/dermafacereal.jpg',
        hook: 'Formulated with Symglucan (10%) and Pro-Coll-One+; the manufacturer reports up to a 1,190% increase in Type I collagen synthesis to help flatten surgical marks and acne scars.',
        reviewUrl: 'dermefface-fx7-review.html',
        linkKey: 'dermefface',
        btnText: 'View Offer'
      }
    }
  },
  es: {
    readReview: 'Leer Análisis Completo',
    backBtn: 'Volver',
    age60: 'Para pieles de 60+ años, las fórmulas nutritivas de barrera y péptidos señalizadores refuerzan el soporte estructural.',
    age40: 'Entre los 40 y 59 años, la renovación activa y los péptidos específicos favorecen el alisado y el tono uniforme.',
    age20: 'Entre los 20 y 39 años, el cuidado preventivo temprano ayuda a controlar las primeras líneas y proteger la barrera.',
    routineSerum: 'Tu preferencia por un sérum líquido concentrado ofrece absorción rápida en zonas clave.',
    routineSpecialized: 'Tu preferencia por un aplicador de precisión dirige los activos hacia áreas localizadas.',
    routineCream: 'Tu preferencia por una crema de barrera diaria brinda hidratación continua durante 24 horas.',
    disclosure: 'Enlace de afiliado: Podemos recibir una comisión sin costo adicional para ti. Garantía de devolución de 60 a 90 días.',
    catalog: {
      kollagen: {
        title: 'Coincidencia: Crema Antiarrugas Kollagen Intensiv™',
        shortName: 'Kollagen Intensiv™',
        badge: 'SELECCIÓN: RENOVACIÓN DE COLÁGENO',
        img: 'Pictures/kollagen_boxbottle_lg.jpg',
        hook: 'El fabricante informa que su fórmula suiza con Syn-Coll® estimula la síntesis natural de colágeno hasta en un 354% in vitro para alisar arrugas profundas.',
        reviewUrl: 'kollagen-intensiv-review.html',
        linkKey: 'kollagen',
        btnText: 'Ver Oferta'
      },
      synevra: {
        title: 'Coincidencia: Protocolo Synevra UltraLift™',
        shortName: 'Synevra UltraLift™',
        badge: 'SELECCIÓN: LÍNEAS DE EXPRESIÓN',
        img: 'Pictures/synevra.jpg',
        hook: 'El fabricante informa que el dipéptido SYN-AKE® relaja las microcontracciones faciales hasta en un 82% para suavizar líneas de expresión sin agujas.',
        reviewUrl: 'synevra-ultralift-review.html',
        linkKey: 'synevra',
        btnText: 'Ver Oferta'
      },
      eyelasticity: {
        title: 'Coincidencia: Eyelasticity™ Terapia Ocular Antiedad',
        shortName: 'Eyelasticity™',
        badge: 'SELECCIÓN: CUIDADO PERIORBITAL',
        img: 'Pictures/eyelasticity800.jpg',
        hook: 'Fórmula multi-péptido (Eyeseryl® + Regu®-Age); el fabricante informa una reducción visible de bolsas, ojeras y patas de gallo en 15 a 28 días.',
        reviewUrl: 'eyelasticity-review.html',
        linkKey: 'eyelasticity',
        btnText: 'Ver Oferta'
      },
      illuminatural: {
        title: 'Coincidencia: Aclarador Facial Illuminatural 6i™',
        shortName: 'Illuminatural 6i™',
        badge: 'SELECCIÓN: LUMINOSIDAD BOTÁNICA',
        img: 'Pictures/illuminatural6i_icon001_600x600.jpg',
        hook: 'El fabricante informa que sus 6 activos botánicos (Alfa-Arbutina, Niacinamida) inhiben la tirosinasa sin hidroquinona. Nota: Reposición en curso; el enlace abre el catálogo oficial de Skinception.',
        reviewUrl: 'illuminatural-6i-review.html',
        linkKey: 'illuminatural',
        btnText: 'Ver Oferta'
      },
      dermefface: {
        title: 'Coincidencia: Gel de Cicatrices Dermefface FX7®',
        shortName: 'Dermefface FX7®',
        badge: 'SELECCIÓN: REMODELACIÓN DE CICATRICES',
        img: 'Pictures/dermafacereal.jpg',
        hook: 'Con Symglucan (10%) y Pro-Coll-One+; el fabricante informa un aumento de hasta el 1.190% en la síntesis de colágeno Tipo I para ayudar a aplanar marcas quirúrgicas y de acné.',
        reviewUrl: 'dermefface-fx7-review.html',
        linkKey: 'dermefface',
        btnText: 'Ver Oferta'
      }
    }
  },
  de: {
    readReview: 'Vollständigen Testbericht lesen',
    backBtn: 'Zurück',
    age60: 'Für anspruchsvolle Haut ab 60 Jahren unterstützen reichhaltige Barrierepflege und Signalpeptide die Strukturfestigkeit.',
    age40: 'Im Alter von 40–59 Jahren fördern gezielte Peptidkomplexe eine sichtbare Glättung und einen ebenmäßigen Teint.',
    age20: 'In den 20er und 30er Jahren hilft eine frühzeitige Pflege, erste Linien zu mildern und die Hautbarriere zu schützen.',
    routineSerum: 'Ihre Vorliebe für ein konzentriertes Flüssigserum ermöglicht schnelle Aufnahme und gezielte Wirkung.',
    routineSpecialized: 'Ihre Vorliebe für einen Spezialapplikator bringt die Wirkstoffe punktgenau auf empfindliche Partien.',
    routineCream: 'Ihre Vorliebe für eine tägliche Schutzcreme spendet kontinuierlich 24 Stunden Feuchtigkeit.',
    disclosure: 'Affiliate-Link: Wir erhalten ggf. eine Provision ohne Mehrkosten für Sie. 60–90 Tage Geld-zurück-Garantie.',
    catalog: {
      kollagen: {
        title: 'Ergebnis: Kollagen Intensiv™ Kollagen-Erneuerungscreme',
        shortName: 'Kollagen Intensiv™',
        badge: 'TOP-EMPFEHLUNG: KOLLAGEN-ERNEUERUNG',
        img: 'Pictures/kollagen_boxbottle_lg.jpg',
        hook: 'Laut Hersteller steigert die Schweizer Syn-Coll® Formel die Kollagenproduktion in Tests um bis zu 354% und mildert tiefe Falten.',
        reviewUrl: 'kollagen-intensiv-review.html',
        linkKey: 'kollagen',
        btnText: 'Angebot ansehen'
      },
      synevra: {
        title: 'Ergebnis: Synevra UltraLift™ Mimikfalten-Serum',
        shortName: 'Synevra UltraLift™',
        badge: 'TOP-EMPFEHLUNG: MIMIKFALTEN-GLÄTTUNG',
        img: 'Pictures/synevra.jpg',
        hook: 'Laut Hersteller entspannt das gezielte SYN-AKE® Dipeptid Mikromuskelspannungen um bis zu 82% für glattere Stirn- und Lachfalten ohne Nadeln.',
        reviewUrl: 'synevra-ultralift-review.html',
        linkKey: 'synevra',
        btnText: 'Angebot ansehen'
      },
      eyelasticity: {
        title: 'Ergebnis: Eyelasticity™ Augenpflege-Therapie',
        shortName: 'Eyelasticity™',
        badge: 'TOP-EMPFEHLUNG: PERIORBITALE PFLEGE',
        img: 'Pictures/eyelasticity800.jpg',
        hook: 'Multi-Peptid-Augenserum (Eyeseryl® + Regu®-Age); laut Hersteller werden Tränensäcke, Augenringe und Krähenfüße innerhalb von 15 bis 28 Tagen gemildert.',
        reviewUrl: 'eyelasticity-review.html',
        linkKey: 'eyelasticity',
        btnText: 'Angebot ansehen'
      },
      illuminatural: {
        title: 'Ergebnis: Illuminatural 6i™ Pigmentflecken-Aufheller',
        shortName: 'Illuminatural 6i™',
        badge: 'TOP-EMPFEHLUNG: PFLANZLICHE AUFHELLUNG',
        img: 'Pictures/illuminatural6i_icon001_600x600.jpg',
        hook: 'Laut Hersteller hemmen 6 pflanzliche Aufheller (Alpha-Arbutin, Niacinamid) die Melaninbildung ohne Hydrochinon. Hinweis: Nachproduktion läuft; Link öffnet den Skinception-Katalog.',
        reviewUrl: 'illuminatural-6i-review.html',
        linkKey: 'illuminatural',
        btnText: 'Angebot ansehen'
      },
      dermefface: {
        title: 'Ergebnis: Dermefface FX7® Narbenpflege-Gel',
        shortName: 'Dermefface FX7®',
        badge: 'TOP-EMPFEHLUNG: NARBENREGENERATION',
        img: 'Pictures/dermafacereal.jpg',
        hook: 'Mit Symglucan (10%) und Pro-Coll-One+; laut Hersteller wird die Typ-I-Kollagensynthese um bis zu 1.190% gesteigert, um OP- und Aknenarben zu glätten.',
        reviewUrl: 'dermefface-fx7-review.html',
        linkKey: 'dermefface',
        btnText: 'Angebot ansehen'
      }
    }
  },
  fr: {
    readReview: 'Lire l\'Analyse Complète',
    backBtn: 'Retour',
    age60: 'Pour les peaux matures de 60 ans et plus, les formules nourrissantes et les peptides soutiennent la fermeté structurelle.',
    age40: 'Entre 40 et 59 ans, le renouvellement actif et les peptides ciblés favorisent un lissage visible et un teint unifié.',
    age20: 'Dès 20–39 ans, un soin ciblé précoce aide à prévenir les premières ridules et protège la barrière cutanée.',
    routineSerum: 'Votre préférence pour un sérum concentré privilégie une absorption rapide sur les zones ciblées.',
    routineSpecialized: 'Votre préférence pour un applicateur de précision concentre les actifs sur les zones localisées.',
    routineCream: 'Votre préférence pour une crème barrière quotidienne assure 24h d\'hydratation continue.',
    disclosure: 'Lien affilié : Nous pouvons percevoir une commission sans frais supplémentaires pour vous. Garantie de remboursement de 60 à 90 jours.',
    catalog: {
      kollagen: {
        title: 'Résultat : Crème Régénérante au Collagène Kollagen Intensiv™',
        shortName: 'Kollagen Intensiv™',
        badge: 'MEILLEUR CHOIX : RENOUVELLEMENT DU COLLAGÈNE',
        img: 'Pictures/kollagen_boxbottle_lg.jpg',
        hook: 'Le fabricant indique que sa formule suisse Syn-Coll® stimule la synthèse naturelle de collagène jusqu\'à +354% in vitro pour lisser les rides profondes.',
        reviewUrl: 'kollagen-intensiv-review.html',
        linkKey: 'kollagen',
        btnText: 'Voir l\'Offre'
      },
      synevra: {
        title: 'Résultat : Protocole Lissant Synevra UltraLift™',
        shortName: 'Synevra UltraLift™',
        badge: 'MEILLEUR CHOIX : LISSAGE RIDES D\'EXPRESSION',
        img: 'Pictures/synevra.jpg',
        hook: 'Le fabricant indique que le dipeptide SYN-AKE® réduit les micro-contractions faciales jusqu\'à 82% pour lisser le front et le sourire sans aiguilles.',
        reviewUrl: 'synevra-ultralift-review.html',
        linkKey: 'synevra',
        btnText: 'Voir l\'Offre'
      },
      eyelasticity: {
        title: 'Résultat : Eyelasticity™ Soin Contour des Yeux Anti-Âge',
        shortName: 'Eyelasticity™',
        badge: 'MEILLEUR CHOIX : SOIN DU REGARD',
        img: 'Pictures/eyelasticity800.jpg',
        hook: 'Formule multi-peptides (Eyeseryl® + Regu®-Age) ; le fabricant indique une réduction visible des poches, des cernes et des pattes d\'oie en 15 à 28 jours.',
        reviewUrl: 'eyelasticity-review.html',
        linkKey: 'eyelasticity',
        btnText: 'Voir l\'Offre'
      },
      illuminatural: {
        title: 'Résultat : Soin Éclaircissant Anti-Taches Illuminatural 6i™',
        shortName: 'Illuminatural 6i™',
        badge: 'MEILLEUR CHOIX : ÉCLAT BOTANIQUE',
        img: 'Pictures/illuminatural6i_icon001_600x600.jpg',
        hook: 'Le fabricant indique que ses 6 actifs végétaux (Alpha-Arbutine, Niacinamide) freinent la mélanine sans hydroquinone. Remarque : Réassort en cours ; le lien ouvre le catalogue Skinception.',
        reviewUrl: 'illuminatural-6i-review.html',
        linkKey: 'illuminatural',
        btnText: 'Voir l\'Offre'
      },
      dermefface: {
        title: 'Résultat : Gel Cicatrisant Dermefface FX7®',
        shortName: 'Dermefface FX7®',
        badge: 'MEILLEUR CHOIX : REMODELAGE CICATRICIEL',
        img: 'Pictures/dermafacereal.jpg',
        hook: 'Avec Symglucan (10%) et Pro-Coll-One+ ; le fabricant indique une hausse jusqu\'à +1 190% de la synthèse de collagène de type I pour aplanir marques et cicatrices.',
        reviewUrl: 'dermefface-fx7-review.html',
        linkKey: 'dermefface',
        btnText: 'Voir l\'Offre'
      }
    }
  }
};

function determineQuizProduct(answers) {
  const { concern, skinType, age } = answers;

  if (concern === 'wrinkles') {
    if (skinType === 'serum') {
      return age === '60+' ? 'kollagen' : 'synevra';
    }
    if (skinType === 'specialized') {
      return age === '20-39' ? 'synevra' : 'eyelasticity';
    }
    return age === '20-39' ? 'synevra' : 'kollagen';
  }

  if (concern === 'expression') {
    if (skinType === 'cream') {
      return age === '60+' ? 'kollagen' : 'synevra';
    }
    if (skinType === 'specialized') {
      return age === '20-39' ? 'synevra' : 'eyelasticity';
    }
    return 'synevra';
  }

  if (concern === 'eyebags') {
    if (skinType === 'cream' && age === '60+') {
      return 'kollagen';
    }
    if (skinType === 'serum' && age === '20-39') {
      return 'illuminatural';
    }
    return 'eyelasticity';
  }

  if (concern === 'darkspots') {
    if (skinType === 'cream' && age === '60+') {
      return 'kollagen';
    }
    if (skinType === 'specialized' && age === '40-59') {
      return 'eyelasticity';
    }
    return 'illuminatural';
  }

  if (concern === 'scars') {
    if (skinType === 'serum' && age === '20-39') {
      return 'illuminatural';
    }
    if (skinType === 'cream' && age === '60+') {
      return 'kollagen';
    }
    return 'dermefface';
  }

  return 'kollagen';
}

window.selectQuizOption = function(step, value) {
  const stepNum = Number(step);
  if (stepNum === 1) quizAnswers.concern = value;
  if (stepNum === 2) quizAnswers.skinType = value;
  if (stepNum === 3) quizAnswers.age = value;

  const currentStepEl = document.querySelector(`.quiz-step[data-step="${stepNum}"]`);
  const nextStepEl = document.querySelector(`.quiz-step[data-step="${stepNum + 1}"]`);

  if (currentStepEl) {
    currentStepEl.querySelectorAll('.quiz-opt').forEach(btn => {
      const btnVal = btn.getAttribute('data-quiz-value');
      const isSelected = btnVal === value;
      btn.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
      btn.classList.toggle('selected', isSelected);
    });
    currentStepEl.classList.remove('active');
  }

  if (nextStepEl) {
    nextStepEl.classList.add('active');
    const firstOpt = nextStepEl.querySelector('.quiz-opt');
    if (firstOpt) firstOpt.focus({ preventScroll: true });
  } else {
    showQuizResults();
  }
};

window.goBackQuizStep = function(targetStep) {
  const stepNum = Number(targetStep);
  const quizResult = document.getElementById('quizResult');
  if (quizResult) {
    quizResult.style.display = 'none';
    quizResult.classList.remove('active');
  }

  document.querySelectorAll('.quiz-step').forEach(s => s.classList.remove('active'));
  const prevStepEl = document.querySelector(`.quiz-step[data-step="${stepNum}"]`);
  if (prevStepEl) {
    prevStepEl.classList.add('active');
    const selectedBtn = prevStepEl.querySelector('.quiz-opt[aria-pressed="true"]') || prevStepEl.querySelector('.quiz-opt');
    if (selectedBtn) selectedBtn.focus({ preventScroll: true });
  }
};

function showQuizResults() {
  const quizResult = document.getElementById('quizResult');
  const resultTitle = document.getElementById('resultTitle');
  const resultDesc = document.getElementById('resultDesc');
  const resultProductWrap = document.getElementById('resultProductWrap');

  if (!quizResult || !resultTitle || !resultDesc || !resultProductWrap) return;

  const links = getAffiliateLinks();
  const productKey = determineQuizProduct(quizAnswers);

  const lang = (document.documentElement.lang || 'en').toLowerCase().substring(0, 2);
  const externalI18n = window.DERM_QUIZ_I18N && window.DERM_QUIZ_I18N[lang];
  const i18n = externalI18n || I18N_QUIZ[lang] || I18N_QUIZ.en;
  const product = i18n.catalog[productKey] || i18n.catalog.kollagen;

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

  resultProductWrap.textContent = '';

  const cardWrap = document.createElement('div');
  cardWrap.className = 'quiz-match-card';

  const imgWrap = document.createElement('div');
  imgWrap.className = 'quiz-match-img-wrap';

  const img = document.createElement('img');
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
  img.width = 130;
  img.height = 130;
  img.className = 'quiz-match-img';

  img.onerror = function() {
    if (!this.dataset.fallbackTried) {
      this.dataset.fallbackTried = 'true';
      this.src = (isSubdir ? '' : '../') + cleanImgPath;
    }
  };

  imgWrap.appendChild(img);

  const infoBlock = document.createElement('div');
  infoBlock.className = 'quiz-match-info';

  const badgeEl = document.createElement('span');
  badgeEl.className = 'badge badge-gold quiz-match-badge';
  badgeEl.textContent = product.badge;

  const titleEl = document.createElement('h4');
  titleEl.className = 'quiz-match-title';
  titleEl.textContent = product.shortName;

  const hookEl = document.createElement('p');
  hookEl.className = 'quiz-match-hook';
  hookEl.textContent = product.hook;

  const btnGroup = document.createElement('div');
  btnGroup.className = 'quiz-match-actions';

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

  const discEl = document.createElement('p');
  discEl.className = 'affiliate-disclosure-inline quiz-match-disclosure';
  discEl.textContent = i18n.disclosure || I18N_QUIZ.en.disclosure;

  infoBlock.appendChild(badgeEl);
  infoBlock.appendChild(titleEl);
  infoBlock.appendChild(hookEl);
  infoBlock.appendChild(btnGroup);
  infoBlock.appendChild(discEl);

  cardWrap.appendChild(imgWrap);
  cardWrap.appendChild(infoBlock);
  resultProductWrap.appendChild(cardWrap);

  quizResult.style.display = 'block';
  quizResult.classList.add('active');
  quizResult.setAttribute('tabindex', '-1');
  quizResult.focus({ preventScroll: true });
  quizResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

window.resetQuiz = function() {
  quizAnswers = { concern: '', skinType: '', age: '' };
  const steps = document.querySelectorAll('.quiz-step');
  steps.forEach(s => {
    s.classList.remove('active');
    s.querySelectorAll('.quiz-opt').forEach(btn => {
      btn.setAttribute('aria-pressed', 'false');
      btn.classList.remove('selected');
    });
  });

  const step1 = document.querySelector('.quiz-step[data-step="1"]');
  if (step1) step1.classList.add('active');

  const quizResult = document.getElementById('quizResult');
  if (quizResult) {
    quizResult.style.display = 'none';
    quizResult.classList.remove('active');
  }
};

function initQuiz() {
  const quizBody = document.getElementById('quizBody');
  if (!quizBody || quizBody.dataset.quizBound === 'true') return;
  quizBody.dataset.quizBound = 'true';

  const lang = (document.documentElement.lang || 'en').toLowerCase().substring(0, 2);
  const i18n = I18N_QUIZ[lang] || I18N_QUIZ.en;

  // Ensure radio group semantics and aria-pressed on all quiz steps/buttons
  quizBody.querySelectorAll('.quiz-step').forEach(stepEl => {
    const stepNum = Number(stepEl.getAttribute('data-step'));
    const heading = stepEl.querySelector('h3');
    const optionsWrap = stepEl.querySelector('.quiz-options');
    if (heading && !heading.id) {
      heading.id = `quiz-q${stepNum}-heading`;
    }
    if (optionsWrap) {
      if (!optionsWrap.getAttribute('role')) {
        optionsWrap.setAttribute('role', 'group');
      }
      optionsWrap.setAttribute('data-quiz-group', 'radiogroup');
      if (heading && heading.id) {
        optionsWrap.setAttribute('aria-labelledby', heading.id);
      }
    }
    stepEl.querySelectorAll('.quiz-opt').forEach(btn => {
      if (!btn.hasAttribute('aria-pressed')) {
        btn.setAttribute('aria-pressed', 'false');
      }
    });

    // Ensure Back button exists on steps 2 and 3
    if ((stepNum === 2 || stepNum === 3) && !stepEl.querySelector('[data-quiz-back]')) {
      const navWrap = document.createElement('div');
      navWrap.className = 'quiz-nav-actions';
      const backBtn = document.createElement('button');
      backBtn.type = 'button';
      backBtn.className = 'btn btn-outline btn-sm mt-3 quiz-back-btn';
      backBtn.setAttribute('data-quiz-back', String(stepNum - 1));
      const icon = document.createElement('i');
      icon.className = 'fa-solid fa-arrow-left';
      backBtn.appendChild(icon);
      backBtn.appendChild(document.createTextNode(' ' + i18n.backBtn));
      navWrap.appendChild(backBtn);
      stepEl.appendChild(navWrap);
    }
  });

  // Event delegation for quiz options, Back buttons, and Reset button
  quizBody.addEventListener('click', (e) => {
    const optBtn = e.target.closest('.quiz-opt');
    if (optBtn) {
      e.preventDefault();
      const step = optBtn.getAttribute('data-quiz-step');
      const val = optBtn.getAttribute('data-quiz-value');
      if (step && val) {
        window.selectQuizOption(Number(step), val);
      }
      return;
    }

    const backBtn = e.target.closest('[data-quiz-back]');
    if (backBtn) {
      e.preventDefault();
      const targetStep = backBtn.getAttribute('data-quiz-back');
      if (targetStep) {
        window.goBackQuizStep(Number(targetStep));
      }
      return;
    }

    const resetBtn = e.target.closest('[data-quiz-reset]');
    if (resetBtn) {
      e.preventDefault();
      window.resetQuiz();
    }
  });
}

function initHeroSelector() {
  const tabs = document.querySelectorAll('.hero-tab-btn');
  const panels = document.querySelectorAll('.hero-tab-panel');

  if (!tabs.length || !panels.length) return;

  tabs.forEach(t => t.setAttribute('tabindex', t.classList.contains('active') ? '0' : '-1'));

  tabs.forEach(tab => {
    if (tab.dataset.heroBound === 'true') return;
    tab.dataset.heroBound = 'true';
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('aria-controls');
      if (!targetId) return;

      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      tabs.forEach(t => t.setAttribute('tabindex', '-1'));
      tab.setAttribute('tabindex', '0');

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

    tab.addEventListener('keydown', (e) => {
      const tabArray = Array.from(tabs);
      const currentIndex = tabArray.indexOf(tab);

      let targetTab = null;
      if (e.key === 'ArrowRight') {
        targetTab = tabArray[(currentIndex + 1) % tabArray.length];
      } else if (e.key === 'ArrowLeft') {
        targetTab = tabArray[(currentIndex - 1 + tabArray.length) % tabArray.length];
      } else if (e.key === 'Home') {
        targetTab = tabArray[0];
      } else if (e.key === 'End') {
        targetTab = tabArray[tabArray.length - 1];
      }

      if (targetTab) {
        e.preventDefault();
        targetTab.focus();
        targetTab.click();
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initQuiz();
  initHeroSelector();
});
