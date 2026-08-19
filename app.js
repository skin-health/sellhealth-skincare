/* ==========================================================================
   DERM AUDIT JOURNAL - INTERACTIVE LOGIC & AFFILIATE MANAGEMENT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initAffiliateLinks();
  initFAQ();
  initNavigation();
  initScrollReveal();
});

/* ==========================================================================
   1. AFFILIATE LINK MANAGEMENT & STORAGE
   ========================================================================== */

// Default Affiliate Links (SellHealth & ClickBank)
const DEFAULT_LINKS = {
  kollagen: 'https://www.kollagenintensiv.com/ct/282956',
  illuminatural: 'https://www.illuminatural6i.com/ct/282956',
  dermefface: 'https://www.dermeffacefx7.com/ct/282956',
  synevra: 'https://fa90bat349vj5m8h47ps5z4k7l.hop.clickbank.net',
  axavive: 'https://09cf56o9v9wfep64fslwmu3r7f.hop.clickbank.net',
  revitag: 'https://291dc5n548rg7xaisfmdj85lfo.hop.clickbank.net',
  kerassentials: 'https://49c3bew72gob1x96qjfk42vn2p.hop.clickbank.net'
};

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
    }
  }
  
  // If it is a full URL, validate it
  try {
    const parsed = new URL(cleanVal);
    // Enforce HTTPS protocol
    if (parsed.protocol !== 'https:') {
      return DEFAULT_LINKS[productKey];
    }

    // ClickBank link validation
    if (productKey === 'synevra' || productKey === 'axavive' || productKey === 'revitag' || productKey === 'kerassentials') {
      if (parsed.hostname.endsWith('hop.clickbank.net') || parsed.hostname.endsWith('clickbank.net')) {
        return cleanVal;
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
    // Enforce pathname structure: /ct/numericId
    const pathParts = parsed.pathname.split('/');
    if (pathParts.length === 3 && pathParts[1] === 'ct' && /^\d+$/.test(pathParts[2])) {
      return `https://www.${expectedHostAlt}/ct/${pathParts[2]}`;
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
  let savedAxavive = null;
  let savedReviTag = null;
  let savedKerassentials = null;
  
  try {
    savedKollagen = localStorage.getItem('sellhealth_kollagen_link');
    savedIlluminatural = localStorage.getItem('sellhealth_illuminatural_link');
    savedDermefface = localStorage.getItem('sellhealth_dermefface_link');
    savedSynevra = localStorage.getItem('affiliate_synevra_link');
    savedAxavive = localStorage.getItem('affiliate_axavive_link');
    savedReviTag = localStorage.getItem('affiliate_revitag_link');
    savedKerassentials = localStorage.getItem('affiliate_kerassentials_link');
  } catch (e) {
    /* Silent fallback — default affiliate links are used automatically. */
  }

  return {
    kollagen: sanitizeAndValidateAffiliateLink(savedKollagen, 'kollagen'),
    illuminatural: sanitizeAndValidateAffiliateLink(savedIlluminatural, 'illuminatural'),
    dermefface: sanitizeAndValidateAffiliateLink(savedDermefface, 'dermefface'),
    synevra: sanitizeAndValidateAffiliateLink(savedSynevra, 'synevra'),
    axavive: sanitizeAndValidateAffiliateLink(savedAxavive, 'axavive'),
    revitag: sanitizeAndValidateAffiliateLink(savedReviTag, 'revitag'),
    kerassentials: sanitizeAndValidateAffiliateLink(savedKerassentials, 'kerassentials')
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

const QUIZ_CATALOG = {
  kollagen: {
    title: 'Match: Kollagen Intensiv™ Collagen Renewal Cream',
    shortName: 'Kollagen Intensiv™',
    badge: 'WINNER: #1 DAILY ANTI-AGING CREAM',
    img: 'Pictures/KollagenIntensiv.jpg',
    hook: 'Clinically proven Swiss Syn-Coll® formula boosts natural collagen synthesis by 354% to restore youthful dermal bounce and smooth deep wrinkles.',
    reviewUrl: 'kollagen-intensiv-review.html',
    linkKey: 'kollagen',
    btnText: 'Claim Official Discount'
  },
  synevra: {
    title: 'Match: Synevra UltraLift™ Expression Line Protocol',
    shortName: 'Synevra UltraLift™',
    badge: 'WINNER: #1 EXPRESSION LINE SERUM',
    img: 'Pictures/synevra.jpg',
    hook: 'Targeted SYN-AKE® dipeptide relaxes dynamic muscle twitching by 82% to smooth forehead furrows and smile creases without needles.',
    reviewUrl: 'synevra-ultralift-review.html',
    linkKey: 'synevra',
    btnText: 'Claim Official Offer'
  },
  axavive: {
    title: 'Match: Axavive™ Neuro-Dermal Nutricosmetic',
    shortName: 'Axavive™',
    badge: 'WINNER: #1 ORAL NUTRICOSMETIC',
    img: 'Pictures/axavive.jpg',
    hook: 'Astragaloside IV and Pine Bark OPCs restore cellular axon communication and protect DNA telomeres for full-body skin firmness.',
    reviewUrl: 'axavive-review.html',
    linkKey: 'axavive',
    btnText: 'Claim Official Offer'
  },
  illuminatural: {
    title: 'Match: Illuminatural 6i™ Advanced Skin Brightener',
    shortName: 'Illuminatural 6i™',
    badge: 'WINNER: #1 DARK SPOT CORRECTOR',
    img: 'Pictures/illuminatural.jpg',
    hook: '6 synergistic plant-based brighteners (Alpha-Arbutin, Whitonyl®, Niacinamide) interrupt melanin overproduction without dangerous bleaches.',
    reviewUrl: 'illuminatural-6i-review.html',
    linkKey: 'illuminatural',
    btnText: 'Claim Official Discount'
  },
  dermefface: {
    title: 'Match: Dermefface FX7® Scar Remodeling Therapy',
    shortName: 'Dermefface FX7®',
    badge: 'WINNER: #1 SCAR REMODELING THERAPY',
    img: 'Pictures/dermefface.jpg',
    hook: 'Symglucan (10%) and Pro-Coll-One+ stimulate smooth Type I collagen synthesis by 1,190% to flatten surgical marks, cuts, and acne scars.',
    reviewUrl: 'dermefface-fx7-review.html',
    linkKey: 'dermefface',
    btnText: 'Claim Official Discount'
  },
  revitag: {
    title: 'Match: ReviTag™ Botanical Skin Tag Remover',
    shortName: 'ReviTag™',
    badge: 'WINNER: #1 NATURAL SKIN TAG REMOVER',
    img: 'Pictures/revitag.jpg',
    hook: '99.8% active botanical formula (Colloidal Oatmeal, Sea Buckthorn Omega-7, Epicatechin) painlessly dries and detaches skin tags with zero scarring.',
    reviewUrl: 'revitag-review.html',
    linkKey: 'revitag',
    btnText: 'Claim Official Discount'
  },
  kerassentials: {
    title: 'Match: Kerassentials™ Doctor-Formulated Nail Oil',
    shortName: 'Kerassentials™',
    badge: 'WINNER: #1 NAIL & KERATIN RECOVERY',
    img: 'Pictures/kerassentials.jpg',
    hook: 'Undecylenic Acid (USP 5%) + 4-oil blend penetrates the nail bed to clear fungal buildup and restore strong, clear, healthy nails.',
    reviewUrl: 'kerassentials-review.html',
    linkKey: 'kerassentials',
    btnText: 'Claim Official Offer'
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

  // 1. Determine Product Match
  if (quizAnswers.concern === 'skintags') {
    productKey = 'revitag';
  } else if (quizAnswers.concern === 'nails') {
    productKey = 'kerassentials';
  } else if (quizAnswers.concern === 'scars') {
    productKey = 'dermefface';
  } else if (quizAnswers.concern === 'darkspots') {
    productKey = 'illuminatural';
  } else if (quizAnswers.concern === 'expression') {
    productKey = 'synevra';
  } else if (quizAnswers.concern === 'fullbody') {
    productKey = 'axavive';
  } else if (quizAnswers.concern === 'wrinkles') {
    if (quizAnswers.skinType === 'capsule') {
      productKey = 'axavive';
    } else if (quizAnswers.skinType === 'serum') {
      productKey = 'synevra';
    } else {
      productKey = 'kollagen';
    }
  } else {
    productKey = 'kollagen';
  }

  const product = QUIZ_CATALOG[productKey] || QUIZ_CATALOG.kollagen;

  // 2. Build Contextual Explanation
  let ageContext = '';
  if (quizAnswers.age === '60+') {
    ageContext = 'For deep-set concerns in the 60+ age range, clinical-strength formulas deliver the most noticeable structural repair.';
  } else if (quizAnswers.age === '40-59') {
    ageContext = 'At ages 40–59, active remodeling and targeted signaling produce fast, visible improvements.';
  } else {
    ageContext = 'Starting in your 20s–30s, early clinical intervention stops damage in its tracks and preserves youthful resilience.';
  }

  let routineContext = '';
  if (quizAnswers.skinType === 'capsule') {
    routineContext = 'Your preference for an oral nutricosmetic makes systemic inside-out cellular repair your ideal match.';
  } else if (quizAnswers.skinType === 'serum') {
    routineContext = 'Your preference for a concentrated targeted serum provides fast-absorbing active zone delivery.';
  } else if (quizAnswers.skinType === 'specialized') {
    routineContext = 'Your preference for a precision applicator ensures high-potency delivery exactly where you need it.';
  } else {
    routineContext = 'Your preference for a daily barrier cream provides continuous 24-hour hydration and nourishing protection.';
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
  img.src = product.img;
  img.alt = product.shortName;
  img.style.maxHeight = '140px';
  img.style.maxWidth = '140px';
  img.style.objectFit = 'contain';
  img.style.borderRadius = '8px';
  img.style.background = '#f8fafc';
  img.style.padding = '0.5rem';
  img.style.border = '1px solid #e2e8f0';
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
  hookEl.style.color = '#64748B';
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
  orderBtn.rel = 'noopener noreferrer nofollow sponsored';
  
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
  reviewBtn.appendChild(document.createTextNode(' Read In-Depth Review'));

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
        const ans = el.querySelector('.faq-answer');
        if (ans) ans.style.maxHeight = null;
      });

      if (!isActive && answer) {
        item.classList.add('active');
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


